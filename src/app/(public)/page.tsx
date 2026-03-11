export const dynamic = "force-dynamic";

import { HeroSection } from "@/components/sections/HeroSection";
import { TechnologySection, type TechnologyItem } from "@/components/sections/TechnologySection";
import { VisionSection } from "@/components/sections/VisionSection";
import { RoadmapSection } from "@/components/sections/RoadmapSection";
import { CareersSection } from "@/components/sections/CareersSection";
import { ContactSection, type CompanySettings } from "@/components/sections/ContactSection";
import { prisma } from "@/lib/prisma";

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

async function getCompanySettings(): Promise<CompanySettings> {
  try {
    const setting = await prisma.siteSetting.findUnique({ where: { key: "company" } });
    return (setting?.value as CompanySettings) ?? {};
  } catch {
    return {};
  }
}

export default async function HomePage() {
  const [technologies, company] = await Promise.all([
    getTechnologies(),
    getCompanySettings(),
  ]);

  return (
    <>
      <HeroSection />
      <TechnologySection technologies={technologies} />
      <VisionSection />
      <RoadmapSection />
      <CareersSection />
      <ContactSection company={company} />
    </>
  );
}
