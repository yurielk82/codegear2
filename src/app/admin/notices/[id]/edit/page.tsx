"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NoticeForm } from "@/components/admin/NoticeForm";
import type { NoticeFormData } from "@/components/admin/NoticeForm";

export default function AdminNoticeEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [notice, setNotice] = useState<(NoticeFormData & { id: string }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`/api/notices/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then((data) => {
        setNotice({
          id: data.id,
          category: data.category,
          title: data.title,
          content: data.content,
          date: data.date,
          is_published: data.isPublished,
        });
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (data: NoticeFormData) => {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/notices/${id}`, {
        method: "PUT",
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
        window.alert("수정에 실패했습니다.");
        return;
      }
      router.push("/admin/notices");
    } catch {
      window.alert("네트워크 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (notFound || !notice) {
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

      <fieldset disabled={submitting}>
        <NoticeForm
          defaultValues={{
            category: notice.category,
            title: notice.title,
            content: notice.content,
            date: notice.date,
            is_published: notice.is_published,
          }}
          onSubmit={handleSubmit}
          submitLabel={submitting ? "수정 중..." : "수정"}
        />
      </fieldset>
    </div>
  );
}
