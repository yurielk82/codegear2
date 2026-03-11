"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const ROADMAP_ITEMS = [
  { year: "2018", title: "사업 시작", description: "핵심 기술 연구 착수 및 원천 기술 확보를 위한 R&D 시작" },
  { year: "2024", title: "핵심 IP 확보", description: "NPU, 로봇 제어 시스템 등 핵심 지적재산권 확보 완료" },
  { year: "2026", title: "법인 설립", description: "주식회사 코드기어 설립, 본격적인 사업화 및 시장 진출" },
  { year: "2027~", title: "성장 및 확장", description: "전략적 파트너십 확대, 양산 체제 구축 및 글로벌 시장 진출" },
] as const;

const fadeSlideUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

export function RoadmapSection() {
  const prefersReduced = useReducedMotion();
  const cardVariants = prefersReduced ? fadeOnly : fadeSlideUp;

  return (
    <section id="roadmap" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          className="mb-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={cardVariants}
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Roadmap
          </span>
          <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
            로드맵
          </h2>
        </motion.div>

        <motion.div
          className="relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
        >
          {/* 센터 라인 (데스크톱: 중앙, 모바일: 좌측) */}
          <div className="absolute left-3.5 top-0 h-full border-l-2 border-border lg:left-1/2 lg:-translate-x-px" />

          {ROADMAP_ITEMS.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={item.year}
                className={`relative mb-12 flex items-start last:mb-0 lg:mb-16 ${
                  isLeft ? "lg:flex-row-reverse" : ""
                }`}
                variants={cardVariants}
              >
                {/* 타임라인 노드 */}
                <div className="absolute left-2 top-6 h-4 w-4 rounded-full bg-primary lg:left-1/2 lg:-translate-x-1/2" />

                {/* 카드 */}
                <div
                  className={`ml-12 lg:ml-0 lg:w-5/12 ${
                    isLeft ? "lg:mr-auto lg:pr-12" : "lg:ml-auto lg:pl-12"
                  }`}
                >
                  <div className="glow-card rounded-xl border border-border bg-card p-6">
                    <span className="text-sm font-bold text-primary">{item.year}</span>
                    <h3 className="mt-1 text-lg font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
