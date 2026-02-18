"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

/* ── Types ── */
export interface NoticeItem {
  id: string;
  category: string;
  title: string;
  date: string;
  views: number;
}

/* ── Hardcoded fallback ── */
const fallbackNotices: NoticeItem[] = [
  { id: "1", category: "채용", title: "[정규직] NPU 설계 엔지니어 채용 공고", date: "2026-01-28", views: 234 },
  { id: "2", category: "채용", title: "[정규직] 임베디드 소프트웨어 개발자 채용", date: "2026-01-25", views: 189 },
  { id: "3", category: "공지", title: "2026년 상반기 인턴십 프로그램 안내", date: "2026-01-20", views: 456 },
  { id: "4", category: "뉴스", title: "Code Gear, 법인 설립 완료", date: "2026-01-15", views: 789 },
];

/* ── Badge style map ── */
const categoryStyle: Record<string, { className: string }> = {
  채용: { className: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" },
  공지: { className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" },
  뉴스: { className: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300" },
};

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

/* ── Main Section ── */
export function NoticeSection({ notices }: { notices?: NoticeItem[] }) {
  const prefersReduced = useReducedMotion();
  const variant = prefersReduced ? fadeOnly : fadeSlideUp;
  const items = notices && notices.length > 0 ? notices : fallbackNotices;

  return (
    <section id="notices" className="py-20 md:py-28 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="mb-14 text-center md:mb-20"
        >
          <motion.p variants={variant} className="text-sm font-semibold uppercase tracking-widest text-electric">
            Notices &amp; Announcements
          </motion.p>
          <motion.h2 variants={variant} className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            공고
          </motion.h2>
          <motion.p variants={variant} className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            채용, 공지, 뉴스 등 Code Gear의 최신 소식을 확인하세요
          </motion.p>
        </motion.div>

        {/* Notice table */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={sectionVariants}
        >
          <motion.div
            variants={variant}
            className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#111827]"
          >
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[80px] pl-4 sm:pl-6">분류</TableHead>
                  <TableHead>제목</TableHead>
                  <TableHead className="w-[120px] pr-4 text-right sm:pr-6">등록일</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((notice) => {
                  const style = categoryStyle[notice.category] ?? categoryStyle["공지"];
                  return (
                    <TableRow key={notice.id} className="cursor-pointer transition-colors">
                      <TableCell className="pl-4 sm:pl-6">
                        <Badge variant="outline" className={`border-transparent text-xs font-medium ${style.className}`}>
                          {notice.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium text-foreground">
                        <Link href={`/notices/${notice.id}`} className="hover:underline">
                          {notice.title}
                        </Link>
                      </TableCell>
                      <TableCell className="pr-4 text-right text-muted-foreground sm:pr-6">
                        {notice.date}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </motion.div>

          <motion.div variants={variant} className="mt-8 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/notices">
                전체보기
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
