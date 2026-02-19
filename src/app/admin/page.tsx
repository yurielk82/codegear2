"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FileText,
  CheckCircle,
  Eye,
  CalendarDays,
  Plus,
  Settings,
  Loader2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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

interface Notice {
  id: string;
  category: string;
  title: string;
  date: string;
  views: number;
  isPublished: boolean;
}

const categoryStyle: Record<string, string> = {
  채용: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  공지: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  뉴스: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
};

export default function AdminDashboardPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/notices?all=true")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setNotices(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  const stats = [
    {
      label: "총 공고",
      value: notices.length,
      icon: FileText,
      color: "text-muted-foreground",
      bg: "bg-muted",
    },
    {
      label: "발행된 공고",
      value: notices.filter((n) => n.isPublished).length,
      icon: CheckCircle,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "총 조회수",
      value: notices.reduce((sum, n) => sum + n.views, 0).toLocaleString(),
      icon: Eye,
      color: "text-muted-foreground",
      bg: "bg-muted",
    },
    {
      label: "이번 달 공고",
      value: notices.filter((n) => n.date.startsWith(currentMonth)).length,
      icon: CalendarDays,
      color: "text-muted-foreground",
      bg: "bg-muted",
    },
  ];

  const recentNotices = notices.slice(0, 5);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">대시보드</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Code Gear 관리자 대시보드입니다.
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="py-4">
            <CardContent className="flex items-center gap-4">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${stat.bg}`}
              >
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold leading-none">{stat.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent notices + Quick actions */}
      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        {/* Recent notices table */}
        <Card className="py-0">
          <div className="flex items-center justify-between border-b px-6 py-4">
            <h2 className="font-semibold">최근 공고</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/notices">전체 보기</Link>
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-6">분류</TableHead>
                <TableHead>제목</TableHead>
                <TableHead>등록일</TableHead>
                <TableHead className="pr-6 text-right">상태</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentNotices.map((notice) => (
                <TableRow key={notice.id}>
                  <TableCell className="pl-6">
                    <Badge
                      variant="outline"
                      className={`border-transparent text-xs font-medium ${categoryStyle[notice.category] ?? ""}`}
                    >
                      {notice.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-[260px] truncate font-medium">
                    {notice.title}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {notice.date}
                  </TableCell>
                  <TableCell className="pr-6 text-right">
                    <Badge
                      variant={notice.isPublished ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {notice.isPublished ? "발행" : "미발행"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
              {recentNotices.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="py-8 text-center text-muted-foreground">
                    등록된 공고가 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>

        {/* Quick actions */}
        <div className="space-y-4">
          <Card className="py-5">
            <CardContent className="space-y-3">
              <h3 className="text-sm font-semibold">빠른 작업</h3>
              <Button asChild className="w-full justify-start gap-2">
                <Link href="/admin/notices/new">
                  <Plus className="h-4 w-4" />
                  새 공고 작성
                </Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="w-full justify-start gap-2"
              >
                <Link href="/admin/notices">
                  <FileText className="h-4 w-4" />
                  공고 관리
                </Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="w-full justify-start gap-2"
              >
                <Link href="/admin/settings">
                  <Settings className="h-4 w-4" />
                  설정
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
