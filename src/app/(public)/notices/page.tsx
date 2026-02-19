import { prisma } from "@/lib/prisma";
import { NoticeListClient } from "./NoticeListClient";

async function getPublishedNotices() {
  try {
    const rows = await prisma.notice.findMany({
      where: { isPublished: true },
      orderBy: { date: "desc" },
      select: { id: true, category: true, title: true, date: true, views: true },
    });
    return rows.map((n) => ({ ...n, date: n.date.toISOString().split("T")[0] }));
  } catch {
    return [];
  }
}

export default async function NoticesPage() {
  const notices = await getPublishedNotices();
  return <NoticeListClient notices={notices} />;
}
