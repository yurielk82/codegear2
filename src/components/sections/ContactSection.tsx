"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";

export interface CompanySettings {
  name?: string;
  nameEn?: string;
  address?: string;
  addressDetail?: string;
  phone?: string;
  email?: string;
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
export function ContactSection({ company = {} }: { company?: CompanySettings }) {
  const prefersReduced = useReducedMotion();
  const variant = prefersReduced ? fadeOnly : fadeSlideUp;

  const address = company.address ?? "충청남도 천안시 서북구 불당동";
  const addressDetail = company.addressDetail;
  const fullAddress = addressDetail ? `${address} ${addressDetail}` : address;
  const mapQuery = encodeURIComponent(fullAddress);

  const contactItems = [
    {
      icon: MapPin,
      label: "주소",
      value: addressDetail ? (
        <>
          {address}
          <br />
          <span className="text-sm text-muted-foreground">{addressDetail}</span>
        </>
      ) : (
        address
      ),
    },
    { icon: Phone, label: "전화", value: company.phone ?? "041-XXX-XXXX" },
    { icon: Mail, label: "이메일", value: company.email ?? "contact@codegear.co.kr" },
  ];

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

          {/* Right: Google Maps embed */}
          <motion.div
            variants={variant}
            className="overflow-hidden rounded-xl border border-slate-200 shadow-sm dark:border-white/10"
          >
            <iframe
              title="회사 위치"
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              className="h-full min-h-[280px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
