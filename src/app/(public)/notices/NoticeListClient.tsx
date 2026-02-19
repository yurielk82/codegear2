"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface NoticeRow {
  id: string;
  category: string;
  title: string;
  date: string;
  views: number;
}

const categories = ["전체", "채용", "공지", "뉴스"] as const;

const categoryStyle: Record<string, { className: string }> = {
  채용: { className: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" },
  공지: { className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" },
  뉴스: { className: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300" },
};

export function NoticeListClient({ notices }: { notices: NoticeRow[] }) {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("전체");

  const filtered =
    activeCategory === "전체"
      ? notices
      : notices.filter((n) => n.category === activeCategory);

  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Button variant="ghost" size="sm" asChild className="mb-8 -ml-2 text-muted-foreground hover:text-foreground">
          <Link href="/">
            <ArrowLeft className="mr-1 h-4 w-4" />
            홈으로
          </Link>
        </Button>

        {/* Page heading */}
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-electric">
            Notices &amp; Announcements
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            공고
          </h1>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">
            채용, 공지, 뉴스 등 Code Gear의 최신 소식을 확인하세요
          </p>
        </div>

        {/* Category filter tabs */}
        <Tabs
          value={activeCategory}
          onValueChange={setActiveCategory}
          className="mb-6"
        >
          <TabsList>
            {categories.map((cat) => (
              <TabsTrigger key={cat} value={cat}>
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Notice table */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#111827]">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[80px] pl-4 sm:pl-6">분류</TableHead>
                <TableHead>제목</TableHead>
                <TableHead className="hidden w-[80px] text-right sm:table-cell">
                  <Eye className="ml-auto h-4 w-4 text-muted-foreground" />
                </TableHead>
                <TableHead className="w-[120px] pr-4 text-right sm:pr-6">
                  등록일
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((notice) => {
                const style = categoryStyle[notice.category] ?? categoryStyle["공지"];
                return (
                  <TableRow
                    key={notice.id}
                    className="cursor-pointer transition-colors"
                    onClick={() => router.push(`/notices/${notice.id}`)}
                  >
                    <TableCell className="pl-4 sm:pl-6">
                      <Badge
                        variant="outline"
                        className={`border-transparent text-xs font-medium ${style.className}`}
                      >
                        {notice.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium text-foreground">
                      {notice.title}
                    </TableCell>
                    <TableCell className="hidden text-right text-sm text-muted-foreground sm:table-cell">
                      {notice.views.toLocaleString()}
                    </TableCell>
                    <TableCell className="pr-4 text-right text-muted-foreground sm:pr-6">
                      {notice.date}
                    </TableCell>
                  </TableRow>
                );
              })}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="py-12 text-center text-muted-foreground">
                    해당 카테고리에 공고가 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Count */}
        <p className="mt-4 text-sm text-muted-foreground">
          총 {filtered.length}건
        </p>
      </div>
    </section>
  );
}
