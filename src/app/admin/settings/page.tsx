"use client";

import { useState, useEffect } from "react";
import { Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/* ── Default data (fallback if DB empty) ── */
const defaultCompany = {
  name: "주식회사 코드기어",
  nameEn: "Code Gear Inc.",
  ceo: "대표이사",
  address: "충청남도 천안시 서북구 불당동",
  addressDetail: "불당로 XX, XX층",
  businessNumber: "XXX-XX-XXXXX",
  phone: "041-XXX-XXXX",
  email: "contact@codegear.co.kr",
};

const defaultSocial = {
  github: "",
  linkedin: "",
  twitter: "",
};

export default function AdminSettingsPage() {
  const [company, setCompany] = useState(defaultCompany);
  const [social, setSocial] = useState(defaultSocial);
  const [companySaving, setCompanySaving] = useState(false);
  const [socialSaving, setSocialSaving] = useState(false);
  const [companyMsg, setCompanyMsg] = useState("");
  const [socialMsg, setSocialMsg] = useState("");

  /* ── Load from DB on mount ── */
  useEffect(() => {
    fetch("/api/settings/company")
      .then((r) => r.ok ? r.json() : null)
      .then((data) => { if (data) setCompany(data); })
      .catch(() => {});

    fetch("/api/settings/social")
      .then((r) => r.ok ? r.json() : null)
      .then((data) => { if (data) setSocial(data); })
      .catch(() => {});
  }, []);

  const handleCompanySave = async () => {
    setCompanySaving(true);
    setCompanyMsg("");
    try {
      const res = await fetch("/api/settings/company", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(company),
      });
      setCompanyMsg(res.ok ? "저장되었습니다" : "저장 실패");
    } catch {
      setCompanyMsg("저장 실패");
    } finally {
      setCompanySaving(false);
    }
  };

  const handleSocialSave = async () => {
    setSocialSaving(true);
    setSocialMsg("");
    try {
      const res = await fetch("/api/settings/social", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(social),
      });
      setSocialMsg(res.ok ? "저장되었습니다" : "저장 실패");
    } catch {
      setSocialMsg("저장 실패");
    } finally {
      setSocialSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">설정</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          회사 정보 및 소셜 링크를 관리합니다.
        </p>
      </div>

      {/* 회사 정보 */}
      <Card>
        <CardContent className="space-y-6 pt-6">
          <h2 className="text-lg font-semibold">회사 정보</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="companyName">회사명</Label>
              <Input id="companyName" value={company.name} onChange={(e) => setCompany((p) => ({ ...p, name: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyNameEn">영문 회사명</Label>
              <Input id="companyNameEn" value={company.nameEn} onChange={(e) => setCompany((p) => ({ ...p, nameEn: e.target.value }))} />
            </div>
          </div>

          <div className="space-y-2 sm:max-w-xs">
            <Label htmlFor="ceo">대표이사</Label>
            <Input id="ceo" value={company.ceo} onChange={(e) => setCompany((p) => ({ ...p, ceo: e.target.value }))} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="address">주소</Label>
              <Input id="address" value={company.address} onChange={(e) => setCompany((p) => ({ ...p, address: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="addressDetail">상세주소</Label>
              <Input id="addressDetail" value={company.addressDetail} onChange={(e) => setCompany((p) => ({ ...p, addressDetail: e.target.value }))} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="businessNumber">사업자번호</Label>
              <Input id="businessNumber" value={company.businessNumber} onChange={(e) => setCompany((p) => ({ ...p, businessNumber: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">전화번호</Label>
              <Input id="phone" value={company.phone} onChange={(e) => setCompany((p) => ({ ...p, phone: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input id="email" type="email" value={company.email} onChange={(e) => setCompany((p) => ({ ...p, email: e.target.value }))} />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button onClick={handleCompanySave} disabled={companySaving} className="gap-2">
              {companySaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              저장
            </Button>
            {companyMsg && <span className="text-sm text-muted-foreground">{companyMsg}</span>}
          </div>
        </CardContent>
      </Card>

      {/* 소셜 링크 */}
      <Card>
        <CardContent className="space-y-6 pt-6">
          <h2 className="text-lg font-semibold">소셜 링크</h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="github">GitHub URL</Label>
              <Input id="github" type="url" placeholder="https://github.com/codegear" value={social.github} onChange={(e) => setSocial((p) => ({ ...p, github: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn URL</Label>
              <Input id="linkedin" type="url" placeholder="https://linkedin.com/company/codegear" value={social.linkedin} onChange={(e) => setSocial((p) => ({ ...p, linkedin: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="twitter">
                Twitter URL{" "}
                <span className="text-muted-foreground font-normal">(선택)</span>
              </Label>
              <Input id="twitter" type="url" placeholder="https://twitter.com/codegear" value={social.twitter} onChange={(e) => setSocial((p) => ({ ...p, twitter: e.target.value }))} />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button onClick={handleSocialSave} disabled={socialSaving} className="gap-2">
              {socialSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              저장
            </Button>
            {socialMsg && <span className="text-sm text-muted-foreground">{socialMsg}</span>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
