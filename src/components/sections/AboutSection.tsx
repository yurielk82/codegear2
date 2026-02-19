"use client";

import { motion, AnimatePresence, useReducedMotion, useInView, type Variants } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ArrowRight, ChevronUp, Cpu, Brain, Bot, Server, Lightbulb, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

/* ── Stats data ── */
const stats = [
  { value: 2018, label: "사업 시작", suffix: "" },
  { value: 2026, label: "법인 설립", suffix: "" },
  { value: 8, label: "핵심 기술 분야", suffix: "" },
  { value: 27, label: "사업 목적", suffix: "" },
];

/* ── Business purposes data ── */
const businessPurposes = [
  { id: 1, category: "반도체", item: "시스템 반도체 설계 및 개발업" },
  { id: 2, category: "반도체", item: "반도체 IP 라이센싱 및 판매업" },
  { id: 3, category: "반도체", item: "ASIC/FPGA 설계 서비스업" },
  { id: 4, category: "반도체", item: "반도체 설계 자동화(EDA) 솔루션 개발업" },
  { id: 5, category: "반도체", item: "NPU(신경망처리장치) 설계 및 개발업" },
  { id: 6, category: "AI/SW", item: "인공지능 하드웨어 가속기 개발업" },
  { id: 7, category: "AI/SW", item: "임베디드 소프트웨어 개발업" },
  { id: 8, category: "AI/SW", item: "펌웨어 개발 및 유지보수업" },
  { id: 9, category: "AI/SW", item: "AI/ML 알고리즘 개발 및 최적화업" },
  { id: 10, category: "AI/SW", item: "디바이스 드라이버 개발업" },
  { id: 11, category: "로봇", item: "로봇 제어 시스템 개발업" },
  { id: 12, category: "로봇", item: "산업용 로봇 솔루션 제공업" },
  { id: 13, category: "로봇", item: "모션 컨트롤러 설계 및 제조업" },
  { id: 14, category: "로봇", item: "자동화 장비 제어 시스템업" },
  { id: 15, category: "시스템", item: "SoC(System on Chip) 설계업" },
  { id: 16, category: "시스템", item: "시스템 통합(SI) 서비스업" },
  { id: 17, category: "시스템", item: "하드웨어 설계 검증 서비스업" },
  { id: 18, category: "시스템", item: "테스트 자동화 솔루션 개발업" },
  { id: 19, category: "컨설팅", item: "기술 컨설팅 및 자문업" },
  { id: 20, category: "컨설팅", item: "R&D 기획 및 관리 서비스업" },
  { id: 21, category: "컨설팅", item: "기술 교육 및 훈련 서비스업" },
  { id: 22, category: "사업", item: "전자부품 도소매업" },
  { id: 23, category: "사업", item: "기술 라이센싱 및 로열티 사업" },
  { id: 24, category: "사업", item: "정부 R&D 과제 수행업" },
  { id: 25, category: "사업", item: "수출입업" },
  { id: 26, category: "사업", item: "위 각호에 부대되는 일체의 사업" },
  { id: 27, category: "사업", item: "투자 및 자회사 관리업" },
];

/* ── Category metadata ── */
const categoryMeta: Record<string, { icon: typeof Cpu; color: string; bgColor: string }> = {
  반도체: { icon: Cpu, color: "text-blue-600 dark:text-blue-400", bgColor: "bg-blue-100 dark:bg-blue-900/30" },
  "AI/SW": { icon: Brain, color: "text-violet-600 dark:text-violet-400", bgColor: "bg-violet-100 dark:bg-violet-900/30" },
  로봇: { icon: Bot, color: "text-emerald-600 dark:text-emerald-400", bgColor: "bg-emerald-100 dark:bg-emerald-900/30" },
  시스템: { icon: Server, color: "text-orange-600 dark:text-orange-400", bgColor: "bg-orange-100 dark:bg-orange-900/30" },
  컨설팅: { icon: Lightbulb, color: "text-amber-600 dark:text-amber-400", bgColor: "bg-amber-100 dark:bg-amber-900/30" },
  사업: { icon: Briefcase, color: "text-rose-600 dark:text-rose-400", bgColor: "bg-rose-100 dark:bg-rose-900/30" },
};

const categories = Object.keys(categoryMeta);
const grouped = categories.map((cat) => ({
  category: cat,
  items: businessPurposes.filter((bp) => bp.category === cat),
  ...categoryMeta[cat],
}));

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

  return <>{current}</>;
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
  const [expanded, setExpanded] = useState(false);

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
            <Button
              size="lg"
              onClick={() => setExpanded((prev) => !prev)}
              className="gap-1"
            >
              {expanded ? "접기" : "자세히 보기"}
              {expanded ? (
                <ChevronUp className="ml-1 h-4 w-4" />
              ) : (
                <ArrowRight className="ml-1 h-4 w-4" />
              )}
            </Button>
          </motion.div>
        </motion.div>

        {/* Expandable: Business Purposes */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden"
            >
              <div className="mt-16">
                <p className="mx-auto max-w-3xl text-center text-base leading-relaxed text-muted-foreground sm:text-lg">
                  반도체, AI/SW, 로봇, 시스템 통합, 컨설팅 등 6개 핵심 분야에 걸쳐 27개
                  사업 목적을 수행하며, 기술 혁신을 통해 산업의 미래를 개척합니다.
                </p>

                <h3 className="mb-8 mt-12 text-center text-2xl font-bold text-foreground">
                  사업 목적
                  <span className="ml-2 text-base font-normal text-muted-foreground">
                    총 27개
                  </span>
                </h3>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {grouped.map((group) => {
                    const Icon = group.icon;
                    return (
                      <motion.div
                        key={group.category}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-white/10 dark:bg-[#111827]"
                      >
                        <div className="mb-4 flex items-center gap-3">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-lg ${group.bgColor}`}
                          >
                            <Icon className={`h-5 w-5 ${group.color}`} />
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-foreground">
                              {group.category}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {group.items.length}개 항목
                            </p>
                          </div>
                        </div>
                        <ul className="space-y-2">
                          {group.items.map((item) => (
                            <li
                              key={item.id}
                              className="flex items-start gap-2 text-sm text-foreground/80"
                            >
                              <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${group.bgColor}`} />
                              {item.item}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
