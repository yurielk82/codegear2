"use client";

import { useState, useEffect } from "react";
import { Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/* ── Default data (fallback if DB empty) ── */
const defaultHero = {
  mainCopy: "Connecting Intelligence to Hardware",
  subCopy: "지능형 하드웨어의 미래를 설계합니다",
  ctaText: "기술 알아보기",
  ctaLink: "#technology",
};

const defaultTechnologies = [
  { id: "npu", title: "NPU 설계", subtitle: "Neural Processing Unit", description: "고효율 신경망 처리 유닛 설계 및 최적화", icon: "Cpu", gradient: "from-blue-500 to-cyan-500" },
  { id: "robot-control", title: "로봇 제어 시스템", subtitle: "Robot Control System", description: "정밀 모션 제어 및 실시간 로봇 시스템", icon: "Bot", gradient: "from-purple-500 to-pink-500" },
  { id: "semiconductor-ip", title: "시스템 반도체 IP", subtitle: "System Semiconductor IP", description: "맞춤형 반도체 IP 코어 설계 및 라이센싱", icon: "Microchip", gradient: "from-orange-500 to-red-500" },
  { id: "embedded-sw", title: "임베디드 소프트웨어", subtitle: "Embedded Software", description: "저전력 고성능 임베디드 시스템 개발", icon: "Code", gradient: "from-green-500 to-emerald-500" },
  { id: "ai-accelerator", title: "AI 가속기", subtitle: "AI Accelerator", description: "머신러닝 추론 가속을 위한 전용 하드웨어", icon: "Zap", gradient: "from-yellow-500 to-orange-500" },
  { id: "fpga-design", title: "FPGA 설계", subtitle: "FPGA Design", description: "프로토타이핑 및 커스텀 로직 구현", icon: "Grid3X3", gradient: "from-indigo-500 to-purple-500" },
  { id: "soc-integration", title: "SoC 통합", subtitle: "System on Chip", description: "시스템 온 칩 아키텍처 설계 및 통합", icon: "Layers", gradient: "from-teal-500 to-cyan-500" },
  { id: "verification", title: "설계 검증", subtitle: "Design Verification", description: "하드웨어 설계 검증 및 테스트 자동화", icon: "CheckCircle", gradient: "from-rose-500 to-pink-500" },
];

type Hero = typeof defaultHero;
type Technology = (typeof defaultTechnologies)[number];

export default function AdminContentPage() {
  const [hero, setHero] = useState<Hero>(defaultHero);
  const [technologies, setTechnologies] = useState<Technology[]>(defaultTechnologies);
  const [heroSaving, setHeroSaving] = useState(false);
  const [techSaving, setTechSaving] = useState(false);
  const [heroMsg, setHeroMsg] = useState("");
  const [techMsg, setTechMsg] = useState("");

  /* ── Load from DB on mount ── */
  useEffect(() => {
    // Load hero settings
    fetch("/api/settings/hero")
      .then((r) => r.ok ? r.json() : null)
      .then((data) => { if (data) setHero(data); })
      .catch(() => {});

    // Load technologies
    fetch("/api/technologies")
      .then((r) => r.ok ? r.json() : null)
      .then((data) => { if (Array.isArray(data) && data.length > 0) setTechnologies(data); })
      .catch(() => {});
  }, []);

  const updateTechnology = (id: string, field: string, value: string) => {
    setTechnologies((prev) =>
      prev.map((tech) => (tech.id === id ? { ...tech, [field]: value } : tech))
    );
  };

  const handleHeroSave = async () => {
    setHeroSaving(true);
    setHeroMsg("");
    try {
      const res = await fetch("/api/settings/hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hero),
      });
      setHeroMsg(res.ok ? "저장되었습니다" : "저장 실패");
    } catch {
      setHeroMsg("저장 실패");
    } finally {
      setHeroSaving(false);
    }
  };

  const handleTechSave = async () => {
    setTechSaving(true);
    setTechMsg("");
    try {
      const res = await fetch("/api/technologies", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(technologies.map((t, i) => ({ ...t, sortOrder: i }))),
      });
      setTechMsg(res.ok ? "저장되었습니다" : "저장 실패");
    } catch {
      setTechMsg("저장 실패");
    } finally {
      setTechSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">콘텐츠 관리</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Hero 섹션과 기술 카드를 편집합니다.
        </p>
      </div>

      <Tabs defaultValue="hero">
        <TabsList>
          <TabsTrigger value="hero">Hero 편집</TabsTrigger>
          <TabsTrigger value="tech">기술 카드 편집</TabsTrigger>
        </TabsList>

        {/* Tab 1: Hero */}
        <TabsContent value="hero">
          <Card className="mt-4">
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-2">
                <Label htmlFor="mainCopy">메인 카피</Label>
                <Input id="mainCopy" value={hero.mainCopy} onChange={(e) => setHero((p) => ({ ...p, mainCopy: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subCopy">서브 카피</Label>
                <Input id="subCopy" value={hero.subCopy} onChange={(e) => setHero((p) => ({ ...p, subCopy: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ctaText">CTA 텍스트</Label>
                <Input id="ctaText" value={hero.ctaText} onChange={(e) => setHero((p) => ({ ...p, ctaText: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ctaLink">CTA 링크</Label>
                <Input id="ctaLink" value={hero.ctaLink} onChange={(e) => setHero((p) => ({ ...p, ctaLink: e.target.value }))} />
              </div>
              <div className="flex items-center gap-4">
                <Button onClick={handleHeroSave} disabled={heroSaving} className="gap-2">
                  {heroSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  저장
                </Button>
                {heroMsg && <span className="text-sm text-muted-foreground">{heroMsg}</span>}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2: Technologies */}
        <TabsContent value="tech">
          <div className="mt-4 space-y-4">
            {technologies.map((tech) => (
              <Card key={tech.id}>
                <CardContent className="space-y-4 pt-6">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    {tech.id}
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor={`${tech.id}-title`}>제목</Label>
                      <Input id={`${tech.id}-title`} value={tech.title} onChange={(e) => updateTechnology(tech.id, "title", e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`${tech.id}-subtitle`}>서브타이틀</Label>
                      <Input id={`${tech.id}-subtitle`} value={tech.subtitle} onChange={(e) => updateTechnology(tech.id, "subtitle", e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`${tech.id}-description`}>설명</Label>
                    <Textarea id={`${tech.id}-description`} value={tech.description} rows={2} onChange={(e) => updateTechnology(tech.id, "description", e.target.value)} />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor={`${tech.id}-icon`}>아이콘 (Lucide 이름)</Label>
                      <Input id={`${tech.id}-icon`} value={tech.icon} onChange={(e) => updateTechnology(tech.id, "icon", e.target.value)} placeholder="예: Cpu, Bot, Zap" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`${tech.id}-gradient`}>그라디언트</Label>
                      <Input id={`${tech.id}-gradient`} value={tech.gradient} onChange={(e) => updateTechnology(tech.id, "gradient", e.target.value)} placeholder="예: from-blue-500 to-cyan-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <div className="flex items-center gap-4">
              <Button onClick={handleTechSave} disabled={techSaving} className="gap-2">
                {techSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                저장
              </Button>
              {techMsg && <span className="text-sm text-muted-foreground">{techMsg}</span>}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
