"use client";

import { useEffect, useRef } from "react";

/* ── 상수 ── */
const MOBILE_BREAKPOINT = 768;
const DESKTOP_NODES = 120;
const MOBILE_NODES = 50;
const NODE_MIN_SIZE = 1.5;
const NODE_MAX_SIZE = 4;
const SPEED_MIN = 0.1;
const SPEED_MAX = 0.35;
const MAX_DISTANCE = 100;
const MOUSE_RADIUS = 160;

const CORE_RATIO = 0.12;
const TRACE_COUNT_DESKTOP = 26;
const TRACE_COUNT_MOBILE = 14;
const PAD_SIZE = 5;
const CORE_GRID = 6;
const ROTATION_PERIOD_S = 60;
const ASSEMBLE_DURATION_MS = 1500;
const PULSE_INTERVAL_MS = 3000;
const PULSE_TRAVEL_SPEED = 2.5;

const PURPLE = { r: 124, g: 58, b: 237 };
const BLUE = { r: 59, g: 130, b: 246 };

/* ── 타입 ── */
interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  colorRatio: number;
}

interface TraceSegment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface Trace {
  segments: TraceSegment[];
  totalLen: number;
  padX: number;
  padY: number;
  colorRatio: number;
}

interface TracePulse {
  traceIdx: number;
  progress: number;
  opacity: number;
}

/* ── 유틸 ── */
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function rgba(ratio: number, alpha: number) {
  const r = Math.round(lerp(PURPLE.r, BLUE.r, ratio));
  const g = Math.round(lerp(PURPLE.g, BLUE.g, ratio));
  const b = Math.round(lerp(PURPLE.b, BLUE.b, ratio));
  return `rgba(${r},${g},${b},${alpha})`;
}

function segmentLength(s: TraceSegment) {
  return Math.abs(s.x2 - s.x1) + Math.abs(s.y2 - s.y1);
}

/* ── 노드 생성 (칩 주변 밀집) ── */
function createNodes(count: number, w: number, h: number, cx: number, cy: number): Node[] {
  return Array.from({ length: count }, () => {
    const nearChip = Math.random() < 0.4;
    let x: number, y: number;
    if (nearChip) {
      const spread = Math.min(w, h) * 0.3;
      x = cx + (Math.random() - 0.5) * spread;
      y = cy + (Math.random() - 0.5) * spread;
    } else {
      x = Math.random() * w;
      y = Math.random() * h;
    }
    const speed = SPEED_MIN + Math.random() * (SPEED_MAX - SPEED_MIN);
    const angle = Math.random() * Math.PI * 2;
    return {
      x: clamp(x, 0, w),
      y: clamp(y, 0, h),
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: NODE_MIN_SIZE + Math.random() * (NODE_MAX_SIZE - NODE_MIN_SIZE),
      colorRatio: Math.random(),
    };
  });
}

/* ── 트레이스 생성 (직각 꺾임, 코어에서 사방으로) ── */
function createTraces(count: number, coreSize: number): Trace[] {
  const half = coreSize / 2;
  const traces: Trace[] = [];
  const perSide = Math.ceil(count / 4);

  for (let side = 0; side < 4; side++) {
    for (let i = 0; i < perSide; i++) {
      if (traces.length >= count) break;
      const t = (i + 1) / (perSide + 1);
      const offset = lerp(-half * 0.85, half * 0.85, t);
      const extLen = half * (0.8 + Math.random() * 1.2);
      const bendAt = half + extLen * (0.3 + Math.random() * 0.4);
      const bendLen = (Math.random() - 0.5) * extLen * 0.6;

      const segments: TraceSegment[] = [];
      let sx: number, sy: number, mx: number, my: number, ex: number, ey: number;

      if (side === 0) {
        sx = offset; sy = -half;
        mx = offset; my = -(bendAt);
        ex = offset + bendLen; ey = my;
      } else if (side === 1) {
        sx = half; sy = offset;
        mx = bendAt; my = offset;
        ex = mx; ey = offset + bendLen;
      } else if (side === 2) {
        sx = offset; sy = half;
        mx = offset; my = bendAt;
        ex = offset + bendLen; ey = my;
      } else {
        sx = -half; sy = offset;
        mx = -bendAt; my = offset;
        ex = mx; ey = offset + bendLen;
      }

      segments.push({ x1: sx, y1: sy, x2: mx, y2: my });
      segments.push({ x1: mx, y1: my, x2: ex, y2: ey });

      const totalLen = segments.reduce((s, seg) => s + segmentLength(seg), 0);
      traces.push({
        segments,
        totalLen,
        padX: ex,
        padY: ey,
        colorRatio: Math.random(),
      });
    }
  }
  return traces;
}

/* ── 트레이스 위의 특정 progress 지점 좌표 계산 ── */
function getPointOnTrace(trace: Trace, progress: number): { x: number; y: number } {
  const targetDist = progress * trace.totalLen;
  let accumulated = 0;
  for (const seg of trace.segments) {
    const len = segmentLength(seg);
    if (accumulated + len >= targetDist) {
      const local = (targetDist - accumulated) / len;
      return {
        x: lerp(seg.x1, seg.x2, local),
        y: lerp(seg.y1, seg.y2, local),
      };
    }
    accumulated += len;
  }
  const last = trace.segments[trace.segments.length - 1];
  return { x: last.x2, y: last.y2 };
}

/* ── 코어 내부 그리드 그리기 ── */
function drawCoreGrid(
  ctx: CanvasRenderingContext2D,
  coreSize: number,
  dark: boolean,
  mouseOver: boolean,
) {
  const half = coreSize / 2;
  const step = coreSize / CORE_GRID;
  const alpha = mouseOver ? (dark ? 0.25 : 0.18) : (dark ? 0.12 : 0.08);

  ctx.strokeStyle = rgba(0.3, alpha);
  ctx.lineWidth = 0.5;

  for (let i = 1; i < CORE_GRID; i++) {
    const pos = -half + step * i;
    ctx.beginPath();
    ctx.moveTo(pos, -half);
    ctx.lineTo(pos, half);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-half, pos);
    ctx.lineTo(half, pos);
    ctx.stroke();
  }

  const cellSize = step * 0.4;
  for (let row = 0; row < CORE_GRID; row++) {
    for (let col = 0; col < CORE_GRID; col++) {
      if (Math.random() > 0.6) continue;
      const cx = -half + step * (col + 0.5);
      const cy = -half + step * (row + 0.5);
      ctx.fillStyle = rgba(Math.random(), alpha * 1.5);
      ctx.fillRect(cx - cellSize / 2, cy - cellSize / 2, cellSize, cellSize);
    }
  }
}

/* ── 메인 컴포넌트 ── */
export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
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
    let traces: Trace[] = [];
    const tracePulses: TracePulse[] = [];
    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    const traceCount = isMobile ? TRACE_COUNT_MOBILE : TRACE_COUNT_DESKTOP;
    const startTime = performance.now();

    /* 칩 중심 좌표 (데스크톱: 우측 55%, 모바일: 중앙 상단 40%) */
    const getChipCenter = () => {
      if (isMobile) return { cx: w * 0.5, cy: h * 0.35 };
      return { cx: w * 0.58, cy: h * 0.48 };
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      const coreSize = Math.min(w, h) * CORE_RATIO;
      traces = createTraces(traceCount, coreSize);
      if (nodes.length === 0) {
        const { cx, cy } = getChipCenter();
        nodes = createNodes(isMobile ? MOBILE_NODES : DESKTOP_NODES, w, h, cx, cy);
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

    /* 트레이스 펄스 생성 */
    const pulseTimer = setInterval(() => {
      const idx = Math.floor(Math.random() * traces.length);
      tracePulses.push({ traceIdx: idx, progress: 0, opacity: 0.9 });
    }, PULSE_INTERVAL_MS);

    /* ── 메인 드로잉 루프 ── */
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const dark = isDarkRef.current;
      const baseAlpha = dark ? 1 : 0.55;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const elapsed = performance.now() - startTime;
      const assembleT = clamp(elapsed / ASSEMBLE_DURATION_MS, 0, 1);
      const eased = assembleT < 1 ? 1 - Math.pow(1 - assembleT, 3) : 1;

      const { cx: chipCx, cy: chipCy } = getChipCenter();
      const coreSize = Math.min(w, h) * CORE_RATIO;

      /* 회전각 (모바일 비활성) */
      const rotationAngle = isMobile ? 0 : ((elapsed / 1000) / ROTATION_PERIOD_S) * Math.PI * 2;

      /* 마우스가 코어 위인지 */
      const dxCore = mx - chipCx;
      const dyCore = my - chipCy;
      const mouseOverCore = !isMobile && Math.sqrt(dxCore * dxCore + dyCore * dyCore) < coreSize;

      /* ── 배경 노드 이동 + 그리기 ── */
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }

      /* 노드 간 연결선 */
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist >= MAX_DISTANCE) continue;

          let alpha = (1 - dist / MAX_DISTANCE) * 0.2 * baseAlpha;

          if (!isMobile) {
            const midx = (nodes[i].x + nodes[j].x) / 2;
            const midy = (nodes[i].y + nodes[j].y) / 2;
            const md = Math.sqrt((midx - mx) ** 2 + (midy - my) ** 2);
            if (md < MOUSE_RADIUS) {
              alpha = Math.min(alpha + (1 - md / MOUSE_RADIUS) * 0.2, 0.5);
            }
          }

          const ratio = (nodes[i].colorRatio + nodes[j].colorRatio) / 2;
          ctx.beginPath();
          ctx.strokeStyle = rgba(ratio, alpha);
          ctx.lineWidth = 0.5;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }

      /* 노드 점 */
      for (const n of nodes) {
        let r = n.radius;
        let a = (dark ? 0.4 : 0.25) * baseAlpha;

        if (!isMobile) {
          const md = Math.sqrt((n.x - mx) ** 2 + (n.y - my) ** 2);
          if (md < MOUSE_RADIUS) {
            const factor = 1 - md / MOUSE_RADIUS;
            r += factor * 2;
            a = Math.min(a + factor * 0.3, 0.8);
          }
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = rgba(n.colorRatio, a);
        ctx.fill();
      }

      /* ── 칩 다이 그리기 (회전 좌표계) ── */
      ctx.save();
      ctx.translate(chipCx, chipCy);
      if (!isMobile) ctx.rotate(rotationAngle);

      /* 코어 glow */
      const glowAlpha = mouseOverCore ? 0.25 : 0.1;
      const gradient = ctx.createRadialGradient(0, 0, coreSize * 0.2, 0, 0, coreSize * 1.5);
      gradient.addColorStop(0, rgba(0.3, glowAlpha * baseAlpha));
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.fillRect(-coreSize * 1.5, -coreSize * 1.5, coreSize * 3, coreSize * 3);

      /* 코어 배경 */
      const half = coreSize / 2;
      ctx.fillStyle = dark ? "rgba(15,15,20,0.85)" : "rgba(240,240,248,0.85)";
      ctx.fillRect(-half, -half, coreSize, coreSize);

      /* 코어 보더 */
      ctx.strokeStyle = rgba(0.3, (mouseOverCore ? 0.6 : 0.3) * baseAlpha);
      ctx.lineWidth = 1.5;
      ctx.strokeRect(-half, -half, coreSize, coreSize);

      /* 코어 내부 그리드 */
      drawCoreGrid(ctx, coreSize, dark, mouseOverCore);

      /* ── 트레이스 라인 + I/O 패드 ── */
      for (let ti = 0; ti < traces.length; ti++) {
        const trace = traces[ti];
        const traceAlpha = (dark ? 0.35 : 0.25) * baseAlpha;

        /* 조립 애니메이션: 순차적으로 그려짐 */
        const traceDelay = (ti / traces.length) * 0.7;
        const traceProgress = clamp((eased - traceDelay) / (1 - traceDelay), 0, 1);
        if (traceProgress <= 0) continue;

        /* 마우스 근접 시 밝게 */
        let tAlpha = traceAlpha;
        if (!isMobile) {
          const padWorld = rotatePoint(trace.padX, trace.padY, rotationAngle);
          const pdx = (chipCx + padWorld.x) - mx;
          const pdy = (chipCy + padWorld.y) - my;
          const padDist = Math.sqrt(pdx * pdx + pdy * pdy);
          if (padDist < MOUSE_RADIUS) {
            tAlpha = Math.min(tAlpha + (1 - padDist / MOUSE_RADIUS) * 0.4, 0.8);
          }
        }

        /* 트레이스 세그먼트 그리기 */
        ctx.strokeStyle = rgba(trace.colorRatio, tAlpha);
        ctx.lineWidth = 1;
        ctx.beginPath();

        let drawnLen = 0;
        const maxLen = traceProgress * trace.totalLen;

        for (const seg of trace.segments) {
          const segLen = segmentLength(seg);
          if (drawnLen >= maxLen) break;

          const drawableLen = Math.min(segLen, maxLen - drawnLen);
          const ratio = drawableLen / segLen;

          const endX = lerp(seg.x1, seg.x2, ratio);
          const endY = lerp(seg.y1, seg.y2, ratio);

          if (drawnLen === 0) {
            ctx.moveTo(seg.x1, seg.y1);
          }
          ctx.lineTo(endX, endY);
          drawnLen += drawableLen;
        }
        ctx.stroke();

        /* I/O 패드 (완전히 드로우된 후) */
        if (traceProgress >= 1) {
          ctx.fillStyle = rgba(trace.colorRatio, tAlpha * 1.2);
          ctx.fillRect(
            trace.padX - PAD_SIZE / 2,
            trace.padY - PAD_SIZE / 2,
            PAD_SIZE,
            PAD_SIZE,
          );
        }
      }

      /* ── 트레이스 펄스 애니메이션 ── */
      for (let i = tracePulses.length - 1; i >= 0; i--) {
        const tp = tracePulses[i];
        tp.progress += PULSE_TRAVEL_SPEED / traces[tp.traceIdx].totalLen;
        tp.opacity *= 0.995;

        if (tp.progress > 1 || tp.opacity < 0.05) {
          tracePulses.splice(i, 1);
          continue;
        }

        const pt = getPointOnTrace(traces[tp.traceIdx], tp.progress);
        const pulseR = 3 + tp.opacity * 2;

        const pg = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, pulseR * 3);
        pg.addColorStop(0, rgba(traces[tp.traceIdx].colorRatio, tp.opacity * 0.8 * baseAlpha));
        pg.addColorStop(1, "transparent");
        ctx.fillStyle = pg;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pulseR * 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = rgba(traces[tp.traceIdx].colorRatio, tp.opacity * baseAlpha);
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pulseR, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();

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

/* ── 회전 좌표 변환 (마우스 거리 계산용) ── */
function rotatePoint(x: number, y: number, angle: number) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return { x: x * cos - y * sin, y: x * sin + y * cos };
}
