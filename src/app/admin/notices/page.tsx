"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

/* ── Types ── */
type NoticeCategory = "채용" | "공지" | "뉴스";

interface Notice {
  id: string;
  category: NoticeCategory;
  title: string;
  content: string;
  date: string;
  views: number;
  is_published: boolean;
}

/* ── Hardcoded initial data ── */
const initialNotices: Notice[] = [
  { id: "1", category: "채용", title: "[정규직] NPU 설계 엔지니어 채용 공고", content: "NPU 설계 경력자를 모집합니다.", date: "2026-01-28", views: 234, is_published: true },
  { id: "2", category: "채용", title: "[정규직] 임베디드 소프트웨어 개발자 채용", content: "임베디드 SW 개발 경력자를 모집합니다.", date: "2026-01-25", views: 189, is_published: true },
  { id: "3", category: "공지", title: "2026년 상반기 인턴십 프로그램 안내", content: "인턴십 프로그램에 대한 안내입니다.", date: "2026-01-20", views: 456, is_published: true },
  { id: "4", category: "뉴스", title: "Code Gear, 법인 설립 완료", content: "주식회사 코드기어 법인 설립을 완료했습니다.", date: "2026-01-15", views: 789, is_published: true },
  { id: "5", category: "공지", title: "설 연휴 휴무 안내", content: "설 연휴 기간 휴무 안내입니다.", date: "2026-01-10", views: 123, is_published: true },
  { id: "6", category: "채용", title: "[계약직] FPGA 검증 엔지니어 채용", content: "FPGA 검증 엔지니어를 모집합니다.", date: "2026-01-08", views: 167, is_published: false },
];

const categoryStyle: Record<string, string> = {
  채용: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  공지: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  뉴스: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
};

export default function AdminNoticesPage() {
  const [notices, setNotices] = useState<Notice[]>(initialNotices);

  const togglePublished = (id: string) => {
    setNotices((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, is_published: !n.is_published } : n
      )
    );
  };

  const deleteNotice = (id: string) => {
    setNotices((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">공고 관리</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            공고를 관리하고 발행 상태를 변경할 수 있습니다.
          </p>
        </div>
        <Button asChild className="gap-2">
          <Link href="/admin/notices/new">
            <Plus className="h-4 w-4" />
            새 공고
          </Link>
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[80px] pl-6">분류</TableHead>
              <TableHead>제목</TableHead>
              <TableHead className="w-[110px]">등록일</TableHead>
              <TableHead className="w-[80px] text-right">조회수</TableHead>
              <TableHead className="w-[80px] text-center">상태</TableHead>
              <TableHead className="w-[100px] pr-6 text-center">
                액션
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notices.map((notice) => (
              <TableRow key={notice.id}>
                <TableCell className="pl-6">
                  <Badge
                    variant="outline"
                    className={`border-transparent text-xs font-medium ${categoryStyle[notice.category] ?? ""}`}
                  >
                    {notice.category}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-[300px] truncate font-medium">
                  {notice.title}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {notice.date}
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {notice.views.toLocaleString()}
                </TableCell>
                <TableCell className="text-center">
                  <Switch
                    checked={notice.is_published}
                    onCheckedChange={() => togglePublished(notice.id)}
                    aria-label={`발행 토글: ${notice.title}`}
                  />
                </TableCell>
                <TableCell className="pr-6">
                  <div className="flex items-center justify-center gap-1">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/admin/notices/${notice.id}/edit`}>
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">수정</span>
                      </Link>
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">삭제</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            공고를 삭제하시겠습니까?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            &ldquo;{notice.title}&rdquo;을(를) 삭제합니다. 이
                            작업은 되돌릴 수 없습니다.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>취소</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteNotice(notice.id)}
                            className="bg-destructive text-white hover:bg-destructive/90"
                          >
                            삭제
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {notices.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-12 text-center text-muted-foreground"
                >
                  등록된 공고가 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Count */}
      <p className="text-sm text-muted-foreground">총 {notices.length}건</p>
    </div>
  );
}
