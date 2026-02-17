"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

/* ── Hero copy (hardcoded, to be replaced by DB later) ── */
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
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

const fadeIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 },
  },
};

/* ── Floating accent dot ── */
function GlowDot({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      aria-hidden
      className={`absolute rounded-full bg-electric/30 blur-sm ${className}`}
      animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.3, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

/* ── Circuit board SVG pattern ── */
function CircuitPattern() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="circuit-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="60" y2="0" stroke="rgba(59,130,246,0.06)" strokeWidth="0.5" />
          <line x1="0" y1="0" x2="0" y2="60" stroke="rgba(59,130,246,0.06)" strokeWidth="0.5" />
          <circle cx="0" cy="0" r="1.2" fill="rgba(59,130,246,0.1)" />
          <circle cx="60" cy="0" r="1.2" fill="rgba(59,130,246,0.1)" />
          <circle cx="0" cy="60" r="1.2" fill="rgba(59,130,246,0.1)" />
          <circle cx="60" cy="60" r="1.2" fill="rgba(59,130,246,0.1)" />
          <line x1="0" y1="30" x2="18" y2="30" stroke="rgba(59,130,246,0.08)" strokeWidth="0.5" />
          <line x1="30" y1="0" x2="30" y2="18" stroke="rgba(59,130,246,0.08)" strokeWidth="0.5" />
          <circle cx="30" cy="30" r="0.8" fill="rgba(59,130,246,0.12)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#circuit-grid)" />
    </svg>
  );
}

/* ── 3D Chip / NPU Illustration (SVG) ── */
function ChipIllustration() {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      {/* Outer glow */}
      <defs>
        <radialGradient id="chipGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(59,130,246,0.15)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <linearGradient id="chipTop" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e3a5f" />
          <stop offset="100%" stopColor="#0f2340" />
        </linearGradient>
        <linearGradient id="chipSide" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0c1a2e" />
          <stop offset="100%" stopColor="#060d17" />
        </linearGradient>
        <linearGradient id="pinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <linearGradient id="coreGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>

      {/* Background glow */}
      <circle cx="200" cy="200" r="180" fill="url(#chipGlow)" />

      {/* ── Pins: Top ── */}
      {[120, 150, 180, 210, 240, 270].map((x, i) => (
        <g key={`pin-t-${i}`}>
          <rect x={x - 4} y={68} width={8} height={28} rx={1} fill="url(#pinGrad)" />
          <rect x={x - 3} y={68} width={2} height={28} fill="rgba(148,163,184,0.3)" />
        </g>
      ))}
      {/* ── Pins: Bottom ── */}
      {[120, 150, 180, 210, 240, 270].map((x, i) => (
        <g key={`pin-b-${i}`}>
          <rect x={x - 4} y={304} width={8} height={28} rx={1} fill="url(#pinGrad)" />
          <rect x={x - 3} y={304} width={2} height={28} fill="rgba(148,163,184,0.3)" />
        </g>
      ))}
      {/* ── Pins: Left ── */}
      {[120, 150, 180, 210, 240, 270].map((y, i) => (
        <g key={`pin-l-${i}`}>
          <rect x={68} y={y - 4} width={28} height={8} rx={1} fill="url(#pinGrad)" />
          <rect x={68} y={y - 3} width={28} height={2} fill="rgba(148,163,184,0.3)" />
        </g>
      ))}
      {/* ── Pins: Right ── */}
      {[120, 150, 180, 210, 240, 270].map((y, i) => (
        <g key={`pin-r-${i}`}>
          <rect x={304} y={y - 4} width={28} height={8} rx={1} fill="url(#pinGrad)" />
          <rect x={304} y={y - 3} width={28} height={2} fill="rgba(148,163,184,0.3)" />
        </g>
      ))}

      {/* ── Chip body (3D isometric) ── */}
      {/* Side (depth) */}
      <path d="M96 100 L96 308 L104 316 L304 316 L312 308 L312 100 L304 96 L104 96 Z" fill="url(#chipSide)" />
      {/* Top face */}
      <rect x={96} y={92} width={208} height={212} rx={6} fill="url(#chipTop)" stroke="rgba(59,130,246,0.2)" strokeWidth={1} />

      {/* Inner border */}
      <rect x={112} y={108} width={176} height={180} rx={4} fill="none" stroke="rgba(59,130,246,0.15)" strokeWidth={0.5} />

      {/* ── Core die (glowing center) ── */}
      <rect x={148} y={144} width={104} height={108} rx={4} fill="url(#coreGlow)" opacity={0.9} />
      <rect x={148} y={144} width={104} height={108} rx={4} fill="none" stroke="rgba(96,165,250,0.5)" strokeWidth={1} />

      {/* Core inner pattern - circuit lines */}
      <g opacity={0.4} stroke="rgba(255,255,255,0.5)" strokeWidth={0.5}>
        {/* Horizontal lines */}
        <line x1={158} y1={168} x2={242} y2={168} />
        <line x1={158} y1={188} x2={242} y2={188} />
        <line x1={158} y1={208} x2={242} y2={208} />
        <line x1={158} y1={228} x2={242} y2={228} />
        {/* Vertical lines */}
        <line x1={178} y1={154} x2={178} y2={242} />
        <line x1={200} y1={154} x2={200} y2={242} />
        <line x1={222} y1={154} x2={222} y2={242} />
      </g>

      {/* Core nodes */}
      <g opacity={0.7}>
        {[178, 200, 222].map((x) =>
          [168, 188, 208, 228].map((y) => (
            <circle key={`node-${x}-${y}`} cx={x} cy={y} r={2} fill="rgba(255,255,255,0.6)" />
          ))
        )}
      </g>

      {/* NPU label */}
      <text x={200} y={202} textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize={16} fontWeight={700} fontFamily="Inter, sans-serif">
        NPU
      </text>

      {/* ── Traces from die to pins ── */}
      <g stroke="rgba(59,130,246,0.25)" strokeWidth={0.8}>
        {/* Top traces */}
        <line x1={160} y1={144} x2={120} y2={108} />
        <line x1={200} y1={144} x2={200} y2={108} />
        <line x1={240} y1={144} x2={270} y2={108} />
        {/* Bottom traces */}
        <line x1={160} y1={252} x2={120} y2={288} />
        <line x1={200} y1={252} x2={200} y2={288} />
        <line x1={240} y1={252} x2={270} y2={288} />
        {/* Left traces */}
        <line x1={148} y1={170} x2={112} y2={140} />
        <line x1={148} y1={200} x2={112} y2={200} />
        <line x1={148} y1={230} x2={112} y2={260} />
        {/* Right traces */}
        <line x1={252} y1={170} x2={288} y2={140} />
        <line x1={252} y1={200} x2={288} y2={200} />
        <line x1={252} y1={230} x2={288} y2={260} />
      </g>

      {/* Subtle corner markers */}
      <circle cx={112} cy={112} r={3} fill="rgba(59,130,246,0.3)" />
      <circle cx={288} cy={112} r={3} fill="rgba(59,130,246,0.3)" />
      <circle cx={112} cy={284} r={3} fill="rgba(59,130,246,0.3)" />
      <circle cx={288} cy={284} r={3} fill="rgba(59,130,246,0.3)" />
    </svg>
  );
}

/* ── Orbiting data particles ── */
function OrbitParticles() {
  return (
    <div className="absolute inset-0" aria-hidden>
      {/* Orbit ring 1 */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full border border-electric/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-electric/60 shadow-lg shadow-electric/30" />
      </motion.div>
      {/* Orbit ring 2 */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full border border-electric/5"
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-1/2 -right-1 w-1.5 h-1.5 rounded-full bg-cyan-400/50" />
        <div className="absolute -bottom-1 left-1/3 w-1.5 h-1.5 rounded-full bg-electric/40" />
      </motion.div>
    </div>
  );
}

/* ── Main Hero Section ── */
export function HeroSection() {
  const prefersReduced = useReducedMotion();
  const slideVariant = prefersReduced ? fadeSlideUpReduced : fadeSlideUp;

  return (
    <section
      className="relative flex min-h-[90vh] items-center overflow-hidden"
      style={{
        background: "linear-gradient(165deg, #0f172a 0%, #1e293b 40%, #0f172a 100%)",
      }}
    >
      {/* Circuit board overlay */}
      <CircuitPattern />

      {/* Radial glow behind content */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full opacity-30"
        style={{
          background: "radial-gradient(ellipse, rgba(59,130,246,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Floating accent dots */}
      {!prefersReduced && (
        <>
          <GlowDot className="left-[8%] top-[15%] h-2 w-2" delay={0} />
          <GlowDot className="right-[12%] top-[25%] h-1.5 w-1.5" delay={1.2} />
          <GlowDot className="left-[15%] bottom-[20%] h-1.5 w-1.5" delay={2.4} />
          <GlowDot className="right-[8%] bottom-[30%] h-2 w-2" delay={0.8} />
        </>
      )}

      {/* ── Two-column layout ── */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Text content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={slideVariant}>
              <span className="inline-block rounded-full border border-electric/30 bg-electric/10 px-4 py-1.5 text-sm font-medium text-electric">
                Semiconductor &middot; AI &middot; Robotics
              </span>
            </motion.div>

            <motion.h1
              variants={slideVariant}
              className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              {hero.mainCopy}
            </motion.h1>

            <motion.p
              variants={slideVariant}
              className="mt-5 max-w-lg text-lg text-slate-300 sm:text-xl"
            >
              {hero.subCopy}
            </motion.p>

            <motion.div variants={slideVariant} className="mt-8 flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="cursor-pointer rounded-lg bg-electric px-8 py-3 text-base font-semibold text-white shadow-lg shadow-electric/20 transition-all duration-200 hover:bg-electric-dark hover:shadow-xl hover:shadow-electric/30"
              >
                <Link href={hero.ctaLink}>
                  {hero.ctaText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="cursor-pointer rounded-lg border-slate-600 text-slate-300 hover:bg-white/5 hover:text-white"
              >
                <Link href="/about">회사소개</Link>
              </Button>
            </motion.div>

            {/* Stats mini row */}
            <motion.div
              variants={slideVariant}
              className="mt-12 flex gap-8 border-t border-slate-700/50 pt-8"
            >
              {[
                { value: "8+", label: "핵심 기술" },
                { value: "27", label: "사업 분야" },
                { value: "2026", label: "법인 설립" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-electric">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Chip illustration */}
          <motion.div
            className="relative flex items-center justify-center"
            variants={prefersReduced ? fadeSlideUpReduced : fadeIn}
            initial="hidden"
            animate="visible"
          >
            <div className="relative w-full max-w-[400px] lg:max-w-[460px]">
              {/* Orbiting particles */}
              {!prefersReduced && <OrbitParticles />}
              {/* Chip SVG */}
              <ChipIllustration />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"
      />
    </section>
  );
}
