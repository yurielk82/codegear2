import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { prisma } from "@/lib/prisma";

async function getSettings() {
  try {
    const [companySetting, socialSetting] = await Promise.all([
      prisma.siteSetting.findUnique({ where: { key: "company" } }),
      prisma.siteSetting.findUnique({ where: { key: "social" } }),
    ]);
    return {
      company: (companySetting?.value as Record<string, string>) ?? {},
      social: (socialSetting?.value as Record<string, string>) ?? {},
    };
  } catch {
    return { company: {}, social: {} };
  }
}

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { company, social } = await getSettings();

  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer company={company} social={social} />
    </>
  );
}
