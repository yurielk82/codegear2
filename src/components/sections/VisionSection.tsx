"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";

const STATS = [
  { value: 2018, label: "사업 시작", suffix: "" },
  { value: 2026, label: "법인 설립", suffix: "" },
  { value: 8, label: "기술 분야", suffix: "+" },
  { value: 27, label: "사업 목적", suffix: "" },
] as const;

const LARGE_THRESHOLD = 100;
const COUNT_OFFSET = 8;
const STEP_DURATION_MS = 150;

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReduced = useReducedMotion();
  const animatedRef = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || animatedRef.current || !isInView) return;
    animatedRef.current = true;

    if (prefersReduced) {
      node.textContent = `${value}${suffix}`;
      return;
    }

    const start = value >= LARGE_THRESHOLD ? value - COUNT_OFFSET : 0;
    let current = start;
    node.textContent = `${current}${suffix}`;

    const timer = setInterval(() => {
      current += 1;
      node.textContent = `${current}${suffix}`;
      if (current >= value) clearInterval(timer);
    }, STEP_DURATION_MS);

    return () => clearInterval(timer);
  }, [isInView, value, suffix, prefersReduced]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

const fadeSlideUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" },
  }),
};

export function VisionSection() {
  const prefersReduced = useReducedMotion();
  const initial = prefersReduced ? "visible" : "hidden";

  return (
    <section id="vision" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div initial={initial} whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Our Vision</p>
          <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">우리의 비전</h2>
        </motion.div>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* 좌: 스토리텔링 */}
          <motion.div
            className="space-y-6 text-lg leading-relaxed text-muted-foreground"
            initial={initial}
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.p variants={fadeSlideUp} custom={0}>
              <strong className="gradient-text text-xl font-bold">왜 코드기어인가.</strong> 우리는 2018년부터
              기술이 사업의 본질을 바꿀 수 있다는 믿음 하나로 달려왔습니다.
            </motion.p>
            <motion.p variants={fadeSlideUp} custom={1}>
              수많은 프로젝트를 거치며 쌓아 온 경험은 2026년 법인 설립이라는 새로운 출발점이 되었습니다.
              8개 이상의 기술 분야를 아우르며, 27가지 사업 목적을 정관에 담았습니다.
            </motion.p>
            <motion.p variants={fadeSlideUp} custom={2}>
              코드기어는 단순한 개발사가 아닙니다. 기술로 비즈니스의 톱니바퀴를 정밀하게 맞물리게 하는 것,
              그것이 우리의 비전입니다.
            </motion.p>
          </motion.div>

          {/* 우: 숫자 카운터 */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={initial}
            whileInView="visible"
            viewport={{ once: true }}
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeSlideUp}
                custom={i}
                className="rounded-xl border border-border bg-card p-6 text-center"
              >
                <p className="gradient-text text-4xl font-extrabold">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
