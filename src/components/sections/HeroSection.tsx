"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { PolygonBackground } from "@/components/sections/PolygonBackground";
import { GlassButton } from "@/components/ui/GlassButton";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050a14]">
      {/* Canvas polygon animation */}
      <PolygonBackground />

      {/* Radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(59,130,246,0.08) 0%, transparent 70%)",
          zIndex: 1,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
            <span
              className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"
              aria-hidden="true"
            />
            하이테크 스타트업
          </span>
        </motion.div>

        {/* Main title */}
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

        {/* Sub copy */}
        <motion.p
          className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          지능형 하드웨어의 미래를 설계합니다
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <GlassButton variant="primary" size="lg" onClick={() => {
            document.getElementById("technology")?.scrollIntoView({ behavior: "smooth" });
          }}>
            기술 알아보기
          </GlassButton>
          <Link href="#about">
            <GlassButton variant="secondary" size="lg">
              회사소개
            </GlassButton>
          </Link>
        </motion.div>

        {/* Tech badges */}
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
                className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-muted-foreground text-sm"
              >
                {tech}
              </span>
            )
          )}
        </motion.div>
      </div>

      {/* Scroll indicator */}
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
