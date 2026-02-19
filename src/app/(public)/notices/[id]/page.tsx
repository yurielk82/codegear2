import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Eye, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { prisma } from "@/lib/prisma";

const categoryStyle: Record<string, { className: string }> = {
  채용: { className: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" },
  공지: { className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" },
  뉴스: { className: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300" },
};

export default async function NoticeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let notice;
  try {
    notice = await prisma.notice.findUnique({
      where: { id },
    });
  } catch {
    notFound();
  }

  if (!notice || !notice.isPublished) {
    notFound();
  }

  // 조회수 증가 (fire-and-forget)
  prisma.notice.update({ where: { id }, data: { views: { increment: 1 } } }).catch(() => {});

  const dateStr = notice.date.toISOString().split("T")[0];
  const style = categoryStyle[notice.category] ?? categoryStyle["공지"];

  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <Button variant="ghost" size="sm" asChild className="mb-8 -ml-2 text-muted-foreground hover:text-foreground">
          <Link href="/notices">
            <ArrowLeft className="mr-1 h-4 w-4" />
            목록으로
          </Link>
        </Button>

        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <Badge
              variant="outline"
              className={`border-transparent text-xs font-medium ${style.className}`}
            >
              {notice.category}
            </Badge>
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              {dateStr}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Eye className="h-3.5 w-3.5" />
              {notice.views.toLocaleString()}
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {notice.title}
          </h1>
        </div>

        <Separator className="mb-8" />

        {/* Content */}
        <div className="whitespace-pre-line text-base leading-relaxed text-foreground/90">
          {notice.content}
        </div>

        <Separator className="my-10" />

        {/* Bottom navigation */}
        <Button variant="outline" asChild>
          <Link href="/notices">
            <ArrowLeft className="mr-1 h-4 w-4" />
            목록으로 돌아가기
          </Link>
        </Button>
      </div>
    </section>
  );
}
