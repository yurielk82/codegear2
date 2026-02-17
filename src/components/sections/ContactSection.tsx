"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { MapPin, Phone, Mail, Map } from "lucide-react";

/* ── Contact info ── */
const contactItems = [
  {
    icon: MapPin,
    label: "주소",
    value: "충청남도 천안시 서북구 불당동",
  },
  {
    icon: Phone,
    label: "전화",
    value: "041-XXX-XXXX",
  },
  {
    icon: Mail,
    label: "이메일",
    value: "contact@codegear.co.kr",
  },
];

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
export function ContactSection() {
  const prefersReduced = useReducedMotion();
  const variant = prefersReduced ? fadeOnly : fadeSlideUp;

  return (
    <section id="contact" className="py-20 md:py-28 bg-muted/30">
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
            Contact Us
          </motion.p>
          <motion.h2
            variants={variant}
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl"
          >
            연락처
          </motion.h2>
          <motion.p
            variants={variant}
            className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg"
          >
            Code Gear에 대해 궁금한 점이 있으시면 언제든지 연락 주세요
          </motion.p>
        </motion.div>

        {/* 2-column layout */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={sectionVariants}
          className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8"
        >
          {/* Left: Contact details card */}
          <motion.div
            variants={variant}
            className="flex flex-col gap-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-white/10 dark:bg-[#111827]"
          >
            <h3 className="text-lg font-bold text-foreground">연락처 정보</h3>

            <div className="flex flex-col gap-5">
              {contactItems.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-electric/10 text-electric">
                    <item.icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium text-muted-foreground">
                      {item.label}
                    </span>
                    <span className="text-base font-medium text-foreground">
                      {item.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Map placeholder */}
          <motion.div
            variants={variant}
            className="flex min-h-[280px] items-center justify-center rounded-xl border border-slate-200 bg-slate-100 shadow-sm dark:border-white/10 dark:bg-[#111827]"
          >
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <Map className="h-10 w-10" strokeWidth={1.4} />
              <span className="text-sm font-medium">지도</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
