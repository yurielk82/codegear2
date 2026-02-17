"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NoticeForm } from "@/components/admin/NoticeForm";
import type { NoticeFormData } from "@/components/admin/NoticeForm";

/* ── Hardcoded data (same source as notice list) ── */
const noticesMap: Record<string, NoticeFormData & { id: string }> = {
  "1": { id: "1", category: "채용", title: "[정규직] NPU 설계 엔지니어 채용 공고", content: "NPU 설계 경력자를 모집합니다.", date: "2026-01-28", is_published: true },
  "2": { id: "2", category: "채용", title: "[정규직] 임베디드 소프트웨어 개발자 채용", content: "임베디드 SW 개발 경력자를 모집합니다.", date: "2026-01-25", is_published: true },
  "3": { id: "3", category: "공지", title: "2026년 상반기 인턴십 프로그램 안내", content: "인턴십 프로그램에 대한 안내입니다.", date: "2026-01-20", is_published: true },
  "4": { id: "4", category: "뉴스", title: "Code Gear, 법인 설립 완료", content: "주식회사 코드기어 법인 설립을 완료했습니다.", date: "2026-01-15", is_published: true },
  "5": { id: "5", category: "공지", title: "설 연휴 휴무 안내", content: "설 연휴 기간 휴무 안내입니다.", date: "2026-01-10", is_published: true },
  "6": { id: "6", category: "채용", title: "[계약직] FPGA 검증 엔지니어 채용", content: "FPGA 검증 엔지니어를 모집합니다.", date: "2026-01-08", is_published: false },
};

export default function AdminNoticeEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const notice = noticesMap[id];

  if (!notice) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold tracking-tight">
          공고를 찾을 수 없습니다
        </h1>
        <Button variant="outline" asChild>
          <Link href="/admin/notices">목록으로 돌아가기</Link>
        </Button>
      </div>
    );
  }

  const handleSubmit = (data: NoticeFormData) => {
    // TODO: Supabase update
    console.log("Update notice:", id, data);
    window.alert("공고가 수정되었습니다.");
    router.push("/admin/notices");
  };

  return (
    <div className="space-y-6">
      <div>
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="-ml-2 mb-2 text-muted-foreground hover:text-foreground"
        >
          <Link href="/admin/notices">
            <ArrowLeft className="mr-1 h-4 w-4" />
            공고 목록
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">공고 수정</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          공고 정보를 수정합니다.
        </p>
      </div>

      <NoticeForm
        defaultValues={{
          category: notice.category,
          title: notice.title,
          content: notice.content,
          date: notice.date,
          is_published: notice.is_published,
        }}
        onSubmit={handleSubmit}
        submitLabel="수정"
      />
    </div>
  );
}
