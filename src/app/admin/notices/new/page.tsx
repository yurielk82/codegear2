"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NoticeForm } from "@/components/admin/NoticeForm";
import type { NoticeFormData } from "@/components/admin/NoticeForm";

export default function AdminNoticeNewPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (data: NoticeFormData) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/notices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: data.category,
          title: data.title,
          content: data.content,
          date: data.date,
          isPublished: data.is_published,
        }),
      });
      if (!res.ok) {
        window.alert("등록에 실패했습니다.");
        return;
      }
      router.push("/admin/notices");
    } catch {
      window.alert("네트워크 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
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
        <h1 className="text-2xl font-bold tracking-tight">새 공고 작성</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          새로운 공고를 작성합니다.
        </p>
      </div>

      <fieldset disabled={submitting}>
        <NoticeForm onSubmit={handleSubmit} submitLabel={submitting ? "등록 중..." : "등록"} />
      </fieldset>
    </div>
  );
}
