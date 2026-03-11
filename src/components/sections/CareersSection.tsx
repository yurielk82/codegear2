"use client";

import { Cpu, Code, Brain, Mail } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const RECRUIT_EMAIL = "recruit@codeg.co.kr";

const POSITIONS = [
  { title: "반도체 설계 엔지니어", department: "반도체", description: "NPU, 시스템 반도체 IP 등 차세대 프로세서 설계에 참여합니다. RTL 설계, 검증, 합성 경험자 우대.", icon: Cpu },
  { title: "임베디드 SW 개발자", department: "소프트웨어", description: "로봇 제어 시스템, 펌웨어, 디바이스 드라이버 등 하드웨어와 밀접한 소프트웨어를 개발합니다.", icon: Code },
  { title: "AI 연구원", department: "AI/ML", description: "하드웨어 가속 기반 AI 추론 최적화 및 알고리즘 연구를 수행합니다. NPU 활용 경험자 우대.", icon: Brain },
] as const;

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeSlideUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function CareersSection() {
  const prefersReducedMotion = useReducedMotion();
  const motionProps = prefersReducedMotion
    ? {}
    : { variants: container, initial: "hidden", whileInView: "visible", viewport: { once: true, amount: 0.2 } };

  return (
    <section id="careers" className="bg-muted/30 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <span className="text-sm font-semibold tracking-widest text-primary">Join Us</span>
          <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
            함께 성장할 동료를 찾습니다
          </h2>
        </div>

        <motion.div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" {...motionProps}>
          {POSITIONS.map((pos) => {
            const Icon = pos.icon;
            return (
              <motion.div
                key={pos.title}
                variants={prefersReducedMotion ? undefined : fadeSlideUp}
                className="glow-card rounded-xl border border-border bg-card p-8"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary/80 to-primary">
                  <Icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-bold text-foreground">{pos.title}</h3>
                <span className="mt-1 inline-block rounded-full bg-muted px-3 py-0.5 text-xs font-medium text-muted-foreground">
                  {pos.department}
                </span>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pos.description}</p>
                <a
                  href={`mailto:${RECRUIT_EMAIL}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                >
                  <Mail className="h-4 w-4" />
                  지원하기
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
