"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/* ── Initial data ── */

const initialCompany = {
  name: "주식회사 코드기어",
  nameEn: "Code Gear Inc.",
  ceo: "대표이사",
  address: "충청남도 천안시 서북구 불당동",
  addressDetail: "불당로 XX, XX층",
  businessNumber: "XXX-XX-XXXXX",
  phone: "041-XXX-XXXX",
  email: "contact@codegear.co.kr",
};

const initialSocial = {
  github: "",
  linkedin: "",
  twitter: "",
};

export default function AdminSettingsPage() {
  const [company, setCompany] = useState(initialCompany);
  const [social, setSocial] = useState(initialSocial);

  const handleCompanySave = () => {
    window.alert("저장되었습니다");
  };

  const handleSocialSave = () => {
    window.alert("저장되었습니다");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">설정</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          회사 정보 및 소셜 링크를 관리합니다.
        </p>
      </div>

      {/* Section 1: 회사 정보 */}
      <Card>
        <CardContent className="space-y-6 pt-6">
          <h2 className="text-lg font-semibold">회사 정보</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="companyName">회사명</Label>
              <Input
                id="companyName"
                value={company.name}
                onChange={(e) =>
                  setCompany((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyNameEn">영문 회사명</Label>
              <Input
                id="companyNameEn"
                value={company.nameEn}
                onChange={(e) =>
                  setCompany((prev) => ({ ...prev, nameEn: e.target.value }))
                }
              />
            </div>
          </div>

          <div className="space-y-2 sm:max-w-xs">
            <Label htmlFor="ceo">대표이사</Label>
            <Input
              id="ceo"
              value={company.ceo}
              onChange={(e) =>
                setCompany((prev) => ({ ...prev, ceo: e.target.value }))
              }
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="address">주소</Label>
              <Input
                id="address"
                value={company.address}
                onChange={(e) =>
                  setCompany((prev) => ({ ...prev, address: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="addressDetail">상세주소</Label>
              <Input
                id="addressDetail"
                value={company.addressDetail}
                onChange={(e) =>
                  setCompany((prev) => ({
                    ...prev,
                    addressDetail: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="businessNumber">사업자번호</Label>
              <Input
                id="businessNumber"
                value={company.businessNumber}
                onChange={(e) =>
                  setCompany((prev) => ({
                    ...prev,
                    businessNumber: e.target.value,
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">전화번호</Label>
              <Input
                id="phone"
                value={company.phone}
                onChange={(e) =>
                  setCompany((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                value={company.email}
                onChange={(e) =>
                  setCompany((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>
          </div>

          <Button onClick={handleCompanySave} className="gap-2">
            <Save className="h-4 w-4" />
            저장
          </Button>
        </CardContent>
      </Card>

      {/* Section 2: 소셜 링크 */}
      <Card>
        <CardContent className="space-y-6 pt-6">
          <h2 className="text-lg font-semibold">소셜 링크</h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="github">GitHub URL</Label>
              <Input
                id="github"
                type="url"
                placeholder="https://github.com/codegear"
                value={social.github}
                onChange={(e) =>
                  setSocial((prev) => ({ ...prev, github: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn URL</Label>
              <Input
                id="linkedin"
                type="url"
                placeholder="https://linkedin.com/company/codegear"
                value={social.linkedin}
                onChange={(e) =>
                  setSocial((prev) => ({ ...prev, linkedin: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="twitter">
                Twitter URL{" "}
                <span className="text-muted-foreground font-normal">
                  (선택)
                </span>
              </Label>
              <Input
                id="twitter"
                type="url"
                placeholder="https://twitter.com/codegear"
                value={social.twitter}
                onChange={(e) =>
                  setSocial((prev) => ({ ...prev, twitter: e.target.value }))
                }
              />
            </div>
          </div>

          <Button onClick={handleSocialSave} className="gap-2">
            <Save className="h-4 w-4" />
            저장
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
