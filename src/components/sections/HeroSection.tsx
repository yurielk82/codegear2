"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

/* ── Hero copy (hardcoded, to be replaced by Supabase later) ── */
const hero = {
  mainCopy: "Connecting Intelligence to Hardware",
  subCopy: "지능형 하드웨어의 미래를 설계합니다",
  ctaText: "기술 알아보기",
  ctaLink: "#technology",
} as const;

/* ── Framer Motion variants ── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const fadeSlideUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const fadeSlideUpReduced = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

/* ── Floating accent dot ── */
function GlowDot({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      aria-hidden
      className={`absolute rounded-full bg-electric/30 blur-sm ${className}`}
      animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.3, 1] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

/* ── Circuit board SVG pattern (inline, subtle) ── */
function CircuitPattern() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="circuit-grid"
          x="0"
          y="0"
          width="60"
          height="60"
          patternUnits="userSpaceOnUse"
        >
          {/* Grid lines */}
          <line
            x1="0"
            y1="0"
            x2="60"
            y2="0"
            stroke="rgba(59,130,246,0.06)"
            strokeWidth="0.5"
          />
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="60"
            stroke="rgba(59,130,246,0.06)"
            strokeWidth="0.5"
          />
          {/* Node dots at intersections */}
          <circle cx="0" cy="0" r="1.2" fill="rgba(59,130,246,0.1)" />
          <circle cx="60" cy="0" r="1.2" fill="rgba(59,130,246,0.1)" />
          <circle cx="0" cy="60" r="1.2" fill="rgba(59,130,246,0.1)" />
          <circle cx="60" cy="60" r="1.2" fill="rgba(59,130,246,0.1)" />
          {/* Short circuit trace segments */}
          <line
            x1="0"
            y1="30"
            x2="18"
            y2="30"
            stroke="rgba(59,130,246,0.08)"
            strokeWidth="0.5"
          />
          <line
            x1="30"
            y1="0"
            x2="30"
            y2="18"
            stroke="rgba(59,130,246,0.08)"
            strokeWidth="0.5"
          />
          {/* Small accent node */}
          <circle cx="30" cy="30" r="0.8" fill="rgba(59,130,246,0.12)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#circuit-grid)" />
    </svg>
  );
}

/* ── Main Hero Section ── */
export function HeroSection() {
  const prefersReduced = useReducedMotion();
  const slideVariant = prefersReduced ? fadeSlideUpReduced : fadeSlideUp;

  return (
    <section
      className="relative flex min-h-[85vh] items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(165deg, #0f172a 0%, #1e293b 40%, #0f172a 100%)",
      }}
    >
      {/* Circuit board overlay */}
      <CircuitPattern />

      {/* Radial glow behind content */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(ellipse, rgba(59,130,246,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Floating accent dots */}
      {!prefersReduced && (
        <>
          <GlowDot className="left-[12%] top-[20%] h-2 w-2" delay={0} />
          <GlowDot className="right-[18%] top-[30%] h-1.5 w-1.5" delay={1.2} />
          <GlowDot className="left-[25%] bottom-[22%] h-1.5 w-1.5" delay={2.4} />
          <GlowDot className="right-[10%] bottom-[35%] h-2 w-2" delay={0.8} />
          <GlowDot className="left-[50%] top-[12%] h-1 w-1" delay={1.8} />
        </>
      )}

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main copy */}
        <motion.h1
          variants={slideVariant}
          className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {hero.mainCopy}
        </motion.h1>

        {/* Sub copy */}
        <motion.p
          variants={slideVariant}
          className="mx-auto mt-5 max-w-2xl text-lg text-slate-300 sm:mt-6 sm:text-xl md:text-2xl"
        >
          {hero.subCopy}
        </motion.p>

        {/* CTA Button */}
        <motion.div variants={slideVariant} className="mt-10 sm:mt-12">
          <Button
            asChild
            size="lg"
            className="cursor-pointer rounded-lg bg-electric px-8 py-3 text-base font-semibold text-white shadow-lg shadow-electric/20 transition-all duration-200 hover:bg-electric-dark hover:shadow-xl hover:shadow-electric/30 focus-visible:ring-electric/50"
          >
            <Link href={hero.ctaLink}>
              {hero.ctaText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        {/* Subtle decorative line under CTA */}
        <motion.div
          variants={slideVariant}
          aria-hidden
          className="mx-auto mt-16 h-px w-24 bg-gradient-to-r from-transparent via-electric/30 to-transparent"
        />
      </motion.div>

      {/* Bottom gradient fade (smooth transition to next section) */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"
      />
    </section>
  );
}
