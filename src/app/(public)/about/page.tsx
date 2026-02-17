"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Cpu,
  Brain,
  Bot,
  Server,
  Lightbulb,
  Briefcase,
} from "lucide-react";

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
  반도체: {
    icon: Cpu,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
  },
  "AI/SW": {
    icon: Brain,
    color: "text-violet-600 dark:text-violet-400",
    bgColor: "bg-violet-100 dark:bg-violet-900/30",
  },
  로봇: {
    icon: Bot,
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
  },
  시스템: {
    icon: Server,
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-100 dark:bg-orange-900/30",
  },
  컨설팅: {
    icon: Lightbulb,
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-100 dark:bg-amber-900/30",
  },
  사업: {
    icon: Briefcase,
    color: "text-rose-600 dark:text-rose-400",
    bgColor: "bg-rose-100 dark:bg-rose-900/30",
  },
};

/* ── Group by category ── */
const categories = Object.keys(categoryMeta);
const grouped = categories.map((cat) => ({
  category: cat,
  items: businessPurposes.filter((bp) => bp.category === cat),
  ...categoryMeta[cat],
}));

/* ── Framer Motion variants ── */
const sectionVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
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

export default function AboutPage() {
  const prefersReduced = useReducedMotion();
  const variant = prefersReduced ? fadeOnly : fadeSlideUp;

  return (
    <>
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-[#0f172a] py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
          >
            <motion.div
              variants={variant}
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500"
            >
              <span className="text-2xl font-bold text-white">CG</span>
            </motion.div>
            <motion.h1
              variants={variant}
              className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
            >
              Code Gear
            </motion.h1>
            <motion.p
              variants={variant}
              className="mx-auto mt-4 max-w-2xl text-lg text-slate-300 sm:text-xl"
            >
              차세대 지능형 반도체와 로봇 제어 시스템을 선도하는 기술 기업
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
            className="mb-16 text-center"
          >
            <motion.p
              variants={variant}
              className="text-sm font-semibold uppercase tracking-widest text-electric"
            >
              About Us
            </motion.p>
            <motion.h2
              variants={variant}
              className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              회사 소개
            </motion.h2>
            <motion.p
              variants={variant}
              className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              주식회사 코드기어는 NPU 설계, 로봇 제어 시스템, 시스템 반도체 IP, 임베디드
              소프트웨어 등 차세대 핵심 기술을 기반으로 지능형 하드웨어의 미래를 만들어갑니다.
              2018년 사업을 시작하여 축적한 기술력을 바탕으로, 2026년 법인 설립과 함께
              본격적인 성장을 시작합니다.
            </motion.p>
            <motion.p
              variants={variant}
              className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              반도체, AI/SW, 로봇, 시스템 통합, 컨설팅 등 6개 핵심 분야에 걸쳐 27개
              사업 목적을 수행하며, 기술 혁신을 통해 산업의 미래를 개척합니다.
            </motion.p>
          </motion.div>

          {/* Business Purposes Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={sectionVariants}
          >
            <motion.h3
              variants={variant}
              className="mb-8 text-center text-2xl font-bold text-foreground"
            >
              사업 목적
              <span className="ml-2 text-base font-normal text-muted-foreground">
                총 27개
              </span>
            </motion.h3>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {grouped.map((group) => {
                const Icon = group.icon;
                return (
                  <motion.div
                    key={group.category}
                    variants={variant}
                    className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-white/10 dark:bg-[#111827]"
                  >
                    {/* Category header */}
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

                    {/* Items */}
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
          </motion.div>

          {/* Company Info Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={sectionVariants}
            className="mt-16"
          >
            <motion.div
              variants={variant}
              className="mx-auto max-w-2xl rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-white/10 dark:bg-[#111827]"
            >
              <h3 className="mb-4 text-xl font-bold text-foreground">
                회사 정보
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  <span className="font-medium text-foreground">회사명:</span>{" "}
                  주식회사 코드기어 (Code Gear Inc.)
                </p>
                <p>
                  <span className="font-medium text-foreground">설립일:</span>{" "}
                  2026년 1월
                </p>
                <p>
                  <span className="font-medium text-foreground">소재지:</span>{" "}
                  충청남도 천안시 서북구 불당동
                </p>
                <p>
                  <span className="font-medium text-foreground">이메일:</span>{" "}
                  contact@codegear.co.kr
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
