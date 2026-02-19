"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Cpu,
  Bot,
  Microchip,
  Code,
  Zap,
  Grid3X3,
  Layers,
  CheckCircle,
  type LucideIcon,
} from "lucide-react";

/* ── Types ── */
export interface TechnologyItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  gradient: string;
}

/* ── Icon map ── */
const iconMap: Record<string, LucideIcon> = {
  Cpu, Bot, Microchip, Code, Zap, Grid3X3, Layers, CheckCircle,
  cpu: Cpu, bot: Bot, microchip: Microchip, code: Code,
  zap: Zap, "grid-3x3": Grid3X3, layers: Layers, "check-circle": CheckCircle,
};

/* ── Hardcoded fallback ── */
const fallbackTechnologies: TechnologyItem[] = [
  { id: "npu", title: "NPU 설계", subtitle: "Neural Processing Unit", description: "고효율 신경망 처리 유닛 설계 및 최적화", icon: "Cpu", gradient: "from-blue-500 to-cyan-500" },
  { id: "robot-control", title: "로봇 제어 시스템", subtitle: "Robot Control System", description: "정밀 모션 제어 및 실시간 로봇 시스템", icon: "Bot", gradient: "from-purple-500 to-pink-500" },
  { id: "semiconductor-ip", title: "시스템 반도체 IP", subtitle: "System Semiconductor IP", description: "맞춤형 반도체 IP 코어 설계 및 라이센싱", icon: "Microchip", gradient: "from-orange-500 to-red-500" },
  { id: "embedded-sw", title: "임베디드 소프트웨어", subtitle: "Embedded Software", description: "저전력 고성능 임베디드 시스템 개발", icon: "Code", gradient: "from-green-500 to-emerald-500" },
  { id: "ai-accelerator", title: "AI 가속기", subtitle: "AI Accelerator", description: "머신러닝 추론 가속을 위한 전용 하드웨어", icon: "Zap", gradient: "from-yellow-500 to-orange-500" },
  { id: "fpga-design", title: "FPGA 설계", subtitle: "FPGA Design", description: "프로토타이핑 및 커스텀 로직 구현", icon: "Grid3X3", gradient: "from-indigo-500 to-purple-500" },
  { id: "soc-integration", title: "SoC 통합", subtitle: "System on Chip", description: "시스템 온 칩 아키텍처 설계 및 통합", icon: "Layers", gradient: "from-teal-500 to-cyan-500" },
  { id: "verification", title: "설계 검증", subtitle: "Design Verification", description: "하드웨어 설계 검증 및 테스트 자동화", icon: "CheckCircle", gradient: "from-rose-500 to-pink-500" },
];

/* ── Framer Motion variants ── */
const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const fadeSlideUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 16 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

/* ── Technology Card ── */
function TechCard({
  title,
  subtitle,
  description,
  icon,
  gradient,
  variant,
}: {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  gradient: string;
  variant: Variants;
}) {
  const Icon = iconMap[icon] ?? Cpu;

  return (
    <motion.article
      variants={variant}
      className="group relative flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-electric/40 hover:shadow-md hover:shadow-electric/5 dark:border-white/10 dark:bg-[#111827] dark:hover:border-electric/50 dark:hover:shadow-electric/10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 rounded-t-xl bg-gradient-to-r from-electric to-electric-light transition-transform duration-300 group-hover:scale-x-100"
      />
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${gradient} shadow-sm`}>
        <Icon className="h-5 w-5 text-white" strokeWidth={1.8} aria-hidden="true" />
      </div>
      <div className="flex flex-col gap-1.5">
        <h3 className="text-lg font-bold leading-snug text-foreground">{title}</h3>
        <p className="text-sm font-medium text-muted-foreground/70">{subtitle}</p>
        <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </motion.article>
  );
}

/* ── Main Section ── */
export function TechnologySection({ technologies }: { technologies?: TechnologyItem[] }) {
  const prefersReduced = useReducedMotion();
  const variant = prefersReduced ? fadeOnly : fadeSlideUp;
  const cardVariant = prefersReduced ? fadeOnly : scaleUp;
  const items = technologies && technologies.length > 0 ? technologies : fallbackTechnologies;

  return (
    <section id="technology" className="py-20 md:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="mb-14 text-center md:mb-20"
        >
          <motion.p variants={variant} className="text-sm font-semibold uppercase tracking-widest text-electric">
            Core Technologies
          </motion.p>
          <motion.h2 variants={variant} className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            핵심 기술
          </motion.h2>
          <motion.p variants={variant} className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            차세대 지능형 하드웨어를 위한 핵심 기술 역량
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={sectionVariants}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6"
        >
          {items.map((tech) => (
            <TechCard
              key={tech.id}
              title={tech.title}
              subtitle={tech.subtitle}
              description={tech.description}
              icon={tech.icon}
              gradient={tech.gradient}
              variant={cardVariant}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
