import { HeroSection } from "@/components/sections/HeroSection";
import { TechnologySection } from "@/components/sections/TechnologySection";
import { NoticeSection } from "@/components/sections/NoticeSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TechnologySection />
      <NoticeSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
