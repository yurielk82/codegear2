"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/* ── Initial data ── */

const initialHero = {
  mainCopy: "Connecting Intelligence to Hardware",
  subCopy: "지능형 하드웨어의 미래를 설계합니다",
  ctaText: "기술 알아보기",
  ctaLink: "#technology",
};

const initialTechnologies = [
  { id: "npu", title: "NPU 설계", subtitle: "Neural Processing Unit", description: "고효율 신경망 처리 유닛 설계 및 최적화", icon: "cpu" },
  { id: "robot-control", title: "로봇 제어 시스템", subtitle: "Robot Control System", description: "정밀 모션 제어 및 실시간 로봇 시스템", icon: "bot" },
  { id: "semiconductor-ip", title: "시스템 반도체 IP", subtitle: "System Semiconductor IP", description: "맞춤형 반도체 IP 코어 설계 및 라이센싱", icon: "chip" },
  { id: "embedded-sw", title: "임베디드 소프트웨어", subtitle: "Embedded Software", description: "저전력 고성능 임베디드 시스템 개발", icon: "code" },
  { id: "ai-accelerator", title: "AI 가속기", subtitle: "AI Accelerator", description: "머신러닝 추론 가속을 위한 전용 하드웨어", icon: "zap" },
  { id: "fpga-design", title: "FPGA 설계", subtitle: "FPGA Design", description: "프로토타이핑 및 커스텀 로직 구현", icon: "grid-3x3" },
  { id: "soc-integration", title: "SoC 통합", subtitle: "System on Chip", description: "시스템 온 칩 아키텍처 설계 및 통합", icon: "layers" },
  { id: "verification", title: "설계 검증", subtitle: "Design Verification", description: "하드웨어 설계 검증 및 테스트 자동화", icon: "check-circle" },
];

export default function AdminContentPage() {
  const [hero, setHero] = useState(initialHero);
  const [technologies, setTechnologies] = useState(initialTechnologies);

  const handleHeroSave = () => {
    window.alert("저장되었습니다");
  };

  const updateTechnology = (id: string, field: string, value: string) => {
    setTechnologies((prev) =>
      prev.map((tech) => (tech.id === id ? { ...tech, [field]: value } : tech))
    );
  };

  const handleTechSave = () => {
    window.alert("저장되었습니다");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">콘텐츠 관리</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Hero 섹션과 기술 카드를 편집합니다.
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="hero">
        <TabsList>
          <TabsTrigger value="hero">Hero 편집</TabsTrigger>
          <TabsTrigger value="tech">기술 카드 편집</TabsTrigger>
        </TabsList>

        {/* Tab 1: Hero 편집 */}
        <TabsContent value="hero">
          <Card className="mt-4">
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-2">
                <Label htmlFor="mainCopy">메인 카피</Label>
                <Input
                  id="mainCopy"
                  value={hero.mainCopy}
                  onChange={(e) =>
                    setHero((prev) => ({ ...prev, mainCopy: e.target.value }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subCopy">서브 카피</Label>
                <Input
                  id="subCopy"
                  value={hero.subCopy}
                  onChange={(e) =>
                    setHero((prev) => ({ ...prev, subCopy: e.target.value }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ctaText">CTA 텍스트</Label>
                <Input
                  id="ctaText"
                  value={hero.ctaText}
                  onChange={(e) =>
                    setHero((prev) => ({ ...prev, ctaText: e.target.value }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ctaLink">CTA 링크</Label>
                <Input
                  id="ctaLink"
                  value={hero.ctaLink}
                  onChange={(e) =>
                    setHero((prev) => ({ ...prev, ctaLink: e.target.value }))
                  }
                />
              </div>

              <Button onClick={handleHeroSave} className="gap-2">
                <Save className="h-4 w-4" />
                저장
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2: 기술 카드 편집 */}
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
                      <Input
                        id={`${tech.id}-title`}
                        value={tech.title}
                        onChange={(e) =>
                          updateTechnology(tech.id, "title", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`${tech.id}-subtitle`}>서브타이틀</Label>
                      <Input
                        id={`${tech.id}-subtitle`}
                        value={tech.subtitle}
                        onChange={(e) =>
                          updateTechnology(tech.id, "subtitle", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`${tech.id}-description`}>설명</Label>
                    <Textarea
                      id={`${tech.id}-description`}
                      value={tech.description}
                      rows={2}
                      onChange={(e) =>
                        updateTechnology(tech.id, "description", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2 sm:max-w-xs">
                    <Label htmlFor={`${tech.id}-icon`}>아이콘</Label>
                    <Input
                      id={`${tech.id}-icon`}
                      value={tech.icon}
                      onChange={(e) =>
                        updateTechnology(tech.id, "icon", e.target.value)
                      }
                      placeholder="lucide 아이콘 이름"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button onClick={handleTechSave} className="gap-2">
              <Save className="h-4 w-4" />
              저장
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
