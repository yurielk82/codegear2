"use client";

import { useEffect, useRef } from "react";

/* ── 상수 ── */
const DESKTOP_NODES = 180;
const MOBILE_NODES = 80;
const MOBILE_BREAKPOINT = 768;
const MAX_DISTANCE = 120;
const MOUSE_RADIUS = 150;
const CURSOR_LINES = 3;
const PULSE_INTERVAL_MS = 5000;
const PULSE_SPEED = 3;
const PULSE_MAX_RADIUS = 250;
const NODE_MIN_SIZE = 2;
const NODE_MAX_SIZE = 6;
const SPEED_MIN = 0.15;
const SPEED_MAX = 0.45;

const PURPLE = { r: 124, g: 58, b: 237 };
const BLUE = { r: 59, g: 130, b: 246 };

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  colorRatio: number;
}

interface Pulse {
  x: number;
  y: number;
  radius: number;
  opacity: number;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function nodeColor(ratio: number, alpha: number) {
  const r = Math.round(lerp(PURPLE.r, BLUE.r, ratio));
  const g = Math.round(lerp(PURPLE.g, BLUE.g, ratio));
  const b = Math.round(lerp(PURPLE.b, BLUE.b, ratio));
  return `rgba(${r},${g},${b},${alpha})`;
}

function createNodes(count: number, w: number, h: number): Node[] {
  return Array.from({ length: count }, () => {
    const speed = SPEED_MIN + Math.random() * (SPEED_MAX - SPEED_MIN);
    const angle = Math.random() * Math.PI * 2;
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: NODE_MIN_SIZE + Math.random() * (NODE_MAX_SIZE - NODE_MIN_SIZE),
      colorRatio: Math.random(),
    };
  });
}

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const isDarkRef = useRef(true);

  useEffect(() => {
    const check = () => {
      isDarkRef.current = document.documentElement.classList.contains("dark");
    };
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    const pulses: Pulse[] = [];
    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      if (nodes.length === 0) {
        nodes = createNodes(isMobile ? MOBILE_NODES : DESKTOP_NODES, w, h);
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    if (!isMobile) {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
    }

    const pulseTimer = setInterval(() => {
      const src = nodes[Math.floor(Math.random() * nodes.length)];
      pulses.push({ x: src.x, y: src.y, radius: 0, opacity: 0.4 });
    }, PULSE_INTERVAL_MS);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const dark = isDarkRef.current;
      const baseAlpha = dark ? 1 : 0.6;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      /* 노드 이동 */
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }

      /* 펄스 업데이트 */
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.radius += PULSE_SPEED;
        p.opacity *= 0.985;
        if (p.radius > PULSE_MAX_RADIUS) {
          pulses.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(124,58,237,${p.opacity * 0.3})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      /* 마우스 거리 계산 + 가까운 3개 */
      const mouseDists: { idx: number; dist: number }[] = [];
      for (let i = 0; i < nodes.length; i++) {
        const dx = nodes[i].x - mx;
        const dy = nodes[i].y - my;
        mouseDists.push({ idx: i, dist: Math.sqrt(dx * dx + dy * dy) });
      }
      if (!isMobile) {
        mouseDists.sort((a, b) => a.dist - b.dist);
      }

      /* 연결선 */
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist >= MAX_DISTANCE) continue;

          let alpha = (1 - dist / MAX_DISTANCE) * 0.25 * baseAlpha;

          /* 펄스 영역 내 밝기 증가 */
          for (const p of pulses) {
            const di = Math.sqrt((nodes[i].x - p.x) ** 2 + (nodes[i].y - p.y) ** 2);
            if (Math.abs(di - p.radius) < 40) {
              alpha = Math.min(alpha + p.opacity * 0.3, 0.6);
            }
          }

          /* 마우스 근접 밝기 */
          if (!isMobile) {
            const midx = (nodes[i].x + nodes[j].x) / 2;
            const midy = (nodes[i].y + nodes[j].y) / 2;
            const md = Math.sqrt((midx - mx) ** 2 + (midy - my) ** 2);
            if (md < MOUSE_RADIUS) {
              alpha = Math.min(alpha + (1 - md / MOUSE_RADIUS) * 0.25, 0.6);
            }
          }

          const ratio = (nodes[i].colorRatio + nodes[j].colorRatio) / 2;
          ctx.beginPath();
          ctx.strokeStyle = nodeColor(ratio, alpha);
          ctx.lineWidth = 0.6;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }

      /* 커서 → 가장 가까운 3개 노드 연결선 */
      if (!isMobile && mx > 0) {
        for (let k = 0; k < Math.min(CURSOR_LINES, mouseDists.length); k++) {
          const n = nodes[mouseDists[k].idx];
          const d = mouseDists[k].dist;
          if (d > MOUSE_RADIUS * 2) continue;
          const a = Math.max(0.1, 0.5 - d / (MOUSE_RADIUS * 4));
          ctx.beginPath();
          ctx.strokeStyle = nodeColor(n.colorRatio, a * baseAlpha);
          ctx.lineWidth = 1.2;
          ctx.moveTo(mx, my);
          ctx.lineTo(n.x, n.y);
          ctx.stroke();
        }
      }

      /* 노드 그리기 */
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        let r = n.radius;
        let alpha = (dark ? 0.5 : 0.35) * baseAlpha;

        /* 마우스 근접 시 확대 + 밝기 */
        if (!isMobile) {
          const md = mouseDists[i] ? mouseDists.find((m) => m.idx === i)?.dist ?? 9999 : 9999;
          if (md < MOUSE_RADIUS) {
            const factor = 1 - md / MOUSE_RADIUS;
            r += factor * 3;
            alpha = Math.min(alpha + factor * 0.4, 0.9);
          }
        }

        /* 펄스 근접 시 밝기 */
        for (const p of pulses) {
          const pd = Math.sqrt((n.x - p.x) ** 2 + (n.y - p.y) ** 2);
          if (Math.abs(pd - p.radius) < 30) {
            alpha = Math.min(alpha + p.opacity * 0.5, 0.9);
            r += 1;
          }
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor(n.colorRatio, alpha);
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(pulseTimer);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0, willChange: "transform" }}
    />
  );
}
