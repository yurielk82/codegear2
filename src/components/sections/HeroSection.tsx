"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { HeroCanvas } from "@/components/sections/HeroCanvas";
import { Button } from "@/components/ui/button";

const TECH_BADGES = ["NPU", "Robot Control", "System Semiconductor", "AI Accelerator", "FPGA"];

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

/* ── 마우스 SVG 스크롤 인디케이터 ── */
function ScrollMouse() {
  return (
    <svg width="24" height="38" viewBox="0 0 24 38" fill="none" className="text-muted-foreground">
      <rect x="1" y="1" width="22" height="36" rx="11" stroke="currentColor" strokeWidth="1.5" />
      <motion.rect
        x="10.5" y="8" width="3" height="8" rx="1.5"
        fill="currentColor"
        animate={{ y: [8, 16, 8] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex items-center overflow-hidden bg-background"
    >
      {/* 풀스크린 칩 다이 + 뉴럴넷 Canvas */}
      <HeroCanvas />

      {/* 반투명 그리드 오버레이 */}
      <div
        aria-hidden="true"
        className="hero-grid-overlay pointer-events-none absolute inset-0 z-[1]"
      />

      {/* 보라 blur blob — 좌상단 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full z-[1] opacity-15"
        style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)", filter: "blur(100px)" }}
      />

      {/* 파랑 blur blob — 우하단 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full z-[1] opacity-15"
        style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)", filter: "blur(100px)" }}
      />

      {/* 중앙 radial glow — 칩 위치 쪽으로 편향 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 58% 48%, rgba(124,58,237,0.1) 0%, transparent 70%)",
        }}
      />

      {/* 하단 그라디언트 페이드 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 z-[2]"
        style={{ background: "linear-gradient(to top, var(--background) 0%, transparent 100%)" }}
      />

      {/* ── 텍스트 오버레이 (좌측 정렬) ── */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20"
        style={{ y: contentY, opacity: contentOpacity }}
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        {/* 모바일: 중앙, 데스크톱: 좌측 40% */}
        <div className="md:max-w-[45%] text-center md:text-left">
          {/* 배지 */}
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" aria-hidden="true" />
              하이테크 스타트업
            </span>
          </motion.div>

          {/* 메인 타이틀 */}
          <motion.h1
            className="hero-title mt-6 mb-4 tracking-tight leading-none"
            variants={fadeUp}
          >
            <span className="text-foreground">Connecting</span>
            <br />
            <span className="gradient-text-animated">Intelligence</span>
            <br />
            <span className="text-foreground">to Hardware</span>
          </motion.h1>

          {/* 서브 카피 */}
          <motion.p
            className="text-base text-muted-foreground/70 mb-8 max-w-lg md:mx-0 mx-auto"
            variants={fadeUp}
          >
            지능형 하드웨어의 미래를 설계합니다
          </motion.p>

          {/* CTA 버튼 */}
          <motion.div
            className="flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-3"
            variants={fadeUp}
          >
            <Button
              className="hero-shimmer bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 px-6 py-5 text-sm cursor-pointer"
              onClick={() => {
                document.getElementById("technology")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              기술 알아보기
            </Button>
            <Button
              variant="outline"
              className="glow-border px-6 py-5 text-sm cursor-pointer"
              onClick={() => {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              문의하기
            </Button>
          </motion.div>

          {/* 기술 배지 */}
          <motion.div
            className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 mt-12"
            variants={fadeUp}
          >
            {TECH_BADGES.map((tech, i) => (
              <motion.span
                key={tech}
                className="hero-badge px-3.5 py-1 rounded-full text-xs font-medium text-muted-foreground backdrop-blur-md bg-foreground/5 border border-foreground/10 cursor-default"
                animate={{ y: [0, -4, 0] }}
                transition={{
                  duration: 3 + i * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* 스크롤 인디케이터 */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <button
          aria-label="아래로 스크롤"
          className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          onClick={() => {
            document.getElementById("technology")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <ScrollMouse />
        </button>
      </motion.div>
    </section>
  );
}
