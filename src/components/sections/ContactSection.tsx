"use client";

import { useActionState, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { MapPin, Phone, Mail, Send, CheckCircle, AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitContactForm, type ContactFormState } from "@/app/(public)/actions/contact";

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
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const fadeSlideUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

const initialState: ContactFormState = { success: false };

/* ── 연락처 정보 카드 ── */
function ContactInfo({ items }: { items: { icon: typeof MapPin; label: string; value: string }[] }) {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-lg font-bold text-foreground">연락처 정보</h3>
      <div className="flex flex-col gap-5">
        {items.map((item) => (
          <div key={item.label} className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <item.icon className="h-5 w-5" strokeWidth={1.8} />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium text-muted-foreground">{item.label}</span>
              <span className="text-base font-medium text-foreground">{item.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 문의 폼 ── */
function ContactForm({
  state,
  formAction,
  isPending,
  onReset,
}: {
  state: ContactFormState;
  formAction: (payload: FormData) => void;
  isPending: boolean;
  onReset: () => void;
}) {
  if (state.success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-4 py-12 text-center"
      >
        <CheckCircle className="h-12 w-12 text-primary" />
        <p className="text-lg font-semibold text-foreground">문의가 접수되었습니다</p>
        <p className="text-muted-foreground">빠른 시일 내에 답변 드리겠습니다.</p>
        <Button variant="outline" onClick={onReset} className="mt-2 cursor-pointer">
          <RotateCcw className="mr-2 h-4 w-4" />
          다시 문의하기
        </Button>
      </motion.div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-name" className="text-sm font-medium text-foreground">이름</label>
        <Input id="contact-name" name="name" placeholder="홍길동" required />
        {state.errors?.name && (
          <p role="alert" className="flex items-center gap-1 text-sm text-destructive">
            <AlertCircle className="h-3.5 w-3.5" />
            {state.errors.name[0]}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-email" className="text-sm font-medium text-foreground">이메일</label>
        <Input id="contact-email" name="email" type="email" placeholder="email@example.com" required />
        {state.errors?.email && (
          <p role="alert" className="flex items-center gap-1 text-sm text-destructive">
            <AlertCircle className="h-3.5 w-3.5" />
            {state.errors.email[0]}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-message" className="text-sm font-medium text-foreground">메시지</label>
        <Textarea id="contact-message" name="message" placeholder="문의 내용을 입력해주세요" rows={5} required />
        {state.errors?.message && (
          <p role="alert" className="flex items-center gap-1 text-sm text-destructive">
            <AlertCircle className="h-3.5 w-3.5" />
            {state.errors.message[0]}
          </p>
        )}
      </div>

      {state.error && (
        <p role="alert" className="flex items-center gap-1 text-sm text-destructive">
          <AlertCircle className="h-3.5 w-3.5" />
          {state.error}
        </p>
      )}

      <Button
        type="submit"
        disabled={isPending}
        className="mt-2 bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 cursor-pointer"
      >
        {isPending ? "전송 중..." : <><Send className="mr-2 h-4 w-4" />문의 보내기</>}
      </Button>
    </form>
  );
}

/* ── 메인 섹션 ── */
export function ContactSection({ company = {} }: { company?: CompanySettings }) {
  const prefersReduced = useReducedMotion();
  const variant = prefersReduced ? fadeOnly : fadeSlideUp;
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);
  const [formKey, setFormKey] = useState(0);

  const contactItems = [
    company.address
      ? {
          icon: MapPin,
          label: "주소",
          value: company.addressDetail ? `${company.address} ${company.addressDetail}` : company.address,
        }
      : null,
    company.phone ? { icon: Phone, label: "전화", value: company.phone } : null,
    company.email ? { icon: Mail, label: "이메일", value: company.email } : null,
  ].filter(Boolean) as { icon: typeof MapPin; label: string; value: string }[];

  return (
    <section id="contact" className="py-20 md:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="mb-14 text-center md:mb-20"
        >
          <motion.p variants={variant} className="text-sm font-semibold uppercase tracking-widest text-primary">
            Contact Us
          </motion.p>
          <motion.h2 variants={variant} className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            연락처
          </motion.h2>
          <motion.p variants={variant} className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Code Gear에 대해 궁금한 점이 있으시면 언제든지 연락 주세요
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={sectionVariants}
          className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8"
        >
          <motion.div variants={variant} className="rounded-xl border border-border bg-card p-6 sm:p-8">
            <ContactInfo items={contactItems} />
          </motion.div>

          <motion.div variants={variant} className="rounded-xl border border-border bg-card p-6 sm:p-8">
            <h3 className="mb-6 text-lg font-bold text-foreground">문의하기</h3>
            <ContactForm
              key={formKey}
              state={state}
              formAction={formAction}
              isPending={isPending}
              onReset={() => setFormKey((k) => k + 1)}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
