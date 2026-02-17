"use client";

import Link from "next/link";
import { motion, useReducedMotion, useInView, type Variants } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/* ── Stats data ── */
const stats = [
  { value: 2018, label: "사업 시작", suffix: "" },
  { value: 2026, label: "법인 설립", suffix: "" },
  { value: 8, label: "핵심 기술 분야", suffix: "" },
  { value: 27, label: "사업 목적", suffix: "" },
];

/* ── Animated counter ── */
function AnimatedNumber({
  target,
  inView,
  reduced,
}: {
  target: number;
  inView: boolean;
  reduced: boolean | null;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView) return;

    if (reduced) {
      setCurrent(target);
      return;
    }

    // For year-like large numbers, start closer to avoid long counting
    const start = target > 100 ? target - 8 : 0;
    const totalSteps = target > 100 ? 8 : target;
    const stepDuration = Math.max(40, 400 / totalSteps);

    let step = 0;
    setCurrent(start);

    const timer = setInterval(() => {
      step++;
      const next = start + Math.round((target - start) * (step / totalSteps));
      setCurrent(next);
      if (step >= totalSteps) clearInterval(timer);
    }, stepDuration);

    return () => clearInterval(timer);
  }, [inView, target, reduced]);

  return <>{current.toLocaleString()}</>;
}

/* ── Framer Motion variants ── */
const sectionVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const fadeSlideUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

/* ── Main Section ── */
export function AboutSection() {
  const prefersReduced = useReducedMotion();
  const variant = prefersReduced ? fadeOnly : fadeSlideUp;
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-20 md:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="mb-14 text-center md:mb-20"
        >
          <motion.p
            variants={variant}
            className="text-sm font-semibold uppercase tracking-widest text-electric"
          >
            About Us
          </motion.p>
          <motion.h2
            variants={variant}
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl"
          >
            회사소개
          </motion.h2>
          <motion.p
            variants={variant}
            className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg"
          >
            차세대 지능형 반도체와 로봇 제어 시스템을 선도하는 기술 기업
          </motion.p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          ref={statsRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={sectionVariants}
          className="mb-14 grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={variant}
              className="flex flex-col items-center gap-2 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#111827]"
            >
              <span className="text-4xl font-bold text-electric sm:text-5xl">
                <AnimatedNumber
                  target={stat.value}
                  inView={statsInView}
                  reduced={prefersReduced}
                />
                {stat.suffix}
              </span>
              <span className="text-base text-muted-foreground">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Description + CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={sectionVariants}
          className="text-center"
        >
          <motion.p
            variants={variant}
            className="mx-auto max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Code Gear는 NPU 설계, 로봇 제어 시스템, 시스템 반도체 IP, 임베디드
            소프트웨어 등 차세대 핵심 기술을 기반으로 지능형 하드웨어의 미래를
            만들어갑니다. 2018년 사업을 시작하여 축적한 기술력을 바탕으로, 2026년
            법인 설립과 함께 본격적인 성장을 시작합니다.
          </motion.p>
          <motion.div variants={variant} className="mt-8">
            <Button size="lg" asChild>
              <Link href="/about">
                자세히 보기
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
