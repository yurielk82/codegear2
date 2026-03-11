"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Cpu, Bot, Microchip, type LucideIcon } from "lucide-react";

/* ── 타입 ── */
export interface TechnologyItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  gradient: string;
}

/* ── 아이콘 매핑 ── */
const iconMap: Record<string, LucideIcon> = {
  Cpu, Bot, Microchip,
  cpu: Cpu, bot: Bot, microchip: Microchip,
};

/* ── Fallback 데이터 (3개) ── */
const fallbackTechnologies: TechnologyItem[] = [
  {
    id: "npu",
    title: "NPU 설계",
    subtitle: "Neural Processing Unit",
    description:
      "고효율 신경망 처리 유닛을 자체 설계합니다. 저전력 고성능 AI 추론에 최적화된 아키텍처로, 엣지 디바이스부터 데이터센터까지 폭넓게 적용 가능합니다.",
    icon: "Cpu",
    gradient: "from-primary to-accent",
  },
  {
    id: "robot-control",
    title: "로봇 제어 시스템",
    subtitle: "Robot Control System",
    description:
      "정밀 모션 제어와 실시간 피드백을 지원하는 로봇 제어 플랫폼을 개발합니다. 산업용 로봇부터 서비스 로봇까지, 안정적이고 확장 가능한 제어 솔루션을 제공합니다.",
    icon: "Bot",
    gradient: "from-primary to-accent",
  },
  {
    id: "semiconductor-ip",
    title: "시스템 반도체 IP",
    subtitle: "System Semiconductor IP",
    description:
      "맞춤형 반도체 IP 코어를 설계하고 라이센싱합니다. SoC 통합에 최적화된 검증 완료 IP로, 고객의 반도체 개발 기간을 단축하고 경쟁력을 강화합니다.",
    icon: "Microchip",
    gradient: "from-primary to-accent",
  },
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

/* ── 기술 카드 ── */
function TechCard({
  title,
  subtitle,
  description,
  icon,
  variant,
}: {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  variant: Variants;
}) {
  const Icon = iconMap[icon] ?? Cpu;

  return (
    <motion.article
      variants={variant}
      className="glow-card group relative flex flex-col gap-5 rounded-xl border border-border bg-card p-8 transition-[border-color,box-shadow,transform] duration-300"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 rounded-t-xl bg-gradient-to-r from-primary to-accent transition-transform duration-300 group-hover:scale-x-100"
      />
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent shadow-sm">
        <Icon className="h-6 w-6 text-white" strokeWidth={1.8} aria-hidden="true" />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold leading-snug text-foreground">{title}</h3>
        <p className="text-sm font-medium text-muted-foreground/70">{subtitle}</p>
        <p className="mt-1 text-base leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </motion.article>
  );
}

/* ── 메인 섹션 ── */
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
          <motion.p variants={variant} className="text-sm font-semibold uppercase tracking-widest text-primary">
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
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((tech) => (
            <TechCard
              key={tech.id}
              title={tech.title}
              subtitle={tech.subtitle}
              description={tech.description}
              icon={tech.icon}
              variant={cardVariant}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
