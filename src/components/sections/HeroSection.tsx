"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { PolygonBackground } from "@/components/sections/PolygonBackground";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      <PolygonBackground />

      {/* 보라-파랑 방사형 글로우 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(124,58,237,0.08) 0%, transparent 70%)",
        }}
      />

      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-6 text-center"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* 배지 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
            <span
              className="w-2 h-2 rounded-full bg-primary animate-pulse"
              aria-hidden="true"
            />
            하이테크 스타트업
          </span>
        </motion.div>

        {/* 메인 타이틀 */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold mt-8 mb-6 tracking-tight leading-none"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-foreground">Connecting</span>
          <br />
          <span className="gradient-text">Intelligence</span>
          <br />
          <span className="text-foreground">to Hardware</span>
        </motion.h1>

        {/* 서브 카피 */}
        <motion.p
          className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          지능형 하드웨어의 미래를 설계합니다
        </motion.p>

        {/* CTA 버튼 */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 px-8 py-6 text-base cursor-pointer"
            onClick={() => {
              document.getElementById("technology")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            기술 알아보기
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="px-8 py-6 text-base cursor-pointer"
            onClick={() => {
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            문의하기
          </Button>
        </motion.div>

        {/* 기술 배지 */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          {["NPU", "Robot Control", "System Semiconductor", "AI Accelerator", "FPGA"].map(
            (tech) => (
              <span
                key={tech}
                className="px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-muted-foreground text-sm"
              >
                {tech}
              </span>
            ),
          )}
        </motion.div>
      </motion.div>

      {/* 스크롤 인디케이터 */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <motion.button
          aria-label="아래로 스크롤"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          onClick={() => {
            document.getElementById("technology")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <ChevronDown size={20} aria-hidden="true" />
        </motion.button>
      </motion.div>
    </section>
  );
}
