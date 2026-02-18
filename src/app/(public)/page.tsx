import { HeroSection } from "@/components/sections/HeroSection";
import { TechnologySection, type TechnologyItem } from "@/components/sections/TechnologySection";
import { NoticeSection, type NoticeItem } from "@/components/sections/NoticeSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { prisma } from "@/lib/prisma";

async function getNotices(): Promise<NoticeItem[]> {
  try {
    const rows = await prisma.notice.findMany({
      where: { isPublished: true },
      orderBy: { date: "desc" },
      take: 5,
      select: { id: true, category: true, title: true, date: true, views: true },
    });
    return rows.map((n) => ({ ...n, date: n.date.toISOString().split("T")[0] }));
  } catch {
    return [];
  }
}

async function getTechnologies(): Promise<TechnologyItem[]> {
  try {
    const rows = await prisma.technology.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return rows;
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const [notices, technologies] = await Promise.all([
    getNotices(),
    getTechnologies(),
  ]);

  return (
    <>
      <HeroSection />
      <TechnologySection technologies={technologies} />
      <NoticeSection notices={notices} />
      <AboutSection />
      <ContactSection />
    </>
  );
}
