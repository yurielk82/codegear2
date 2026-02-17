"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NoticeForm } from "@/components/admin/NoticeForm";
import type { NoticeFormData } from "@/components/admin/NoticeForm";

export default function AdminNoticeNewPage() {
  const router = useRouter();

  const handleSubmit = (data: NoticeFormData) => {
    // TODO: Supabase insert
    console.log("Create notice:", data);
    window.alert("공고가 등록되었습니다.");
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
        <h1 className="text-2xl font-bold tracking-tight">새 공고 작성</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          새로운 공고를 작성합니다.
        </p>
      </div>

      <NoticeForm onSubmit={handleSubmit} submitLabel="등록" />
    </div>
  );
}
