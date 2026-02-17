import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Eye, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

/* ── Notice data ── */
const notices = [
  {
    id: "1",
    category: "채용",
    title: "[정규직] NPU 설계 엔지니어 채용 공고",
    date: "2026-01-28",
    views: 234,
    content: `주식회사 코드기어에서 NPU(신경망처리장치) 설계 엔지니어를 채용합니다.

■ 모집 분야
- NPU 아키텍처 설계 및 RTL 구현
- 딥러닝 추론 가속기 최적화

■ 자격 요건
- 관련 분야 석사 이상 또는 동등 경력
- Verilog/SystemVerilog 활용 능력
- 디지털 회로 설계 경험 3년 이상

■ 우대 사항
- RISC-V 기반 프로세서 설계 경험
- AI/ML 프레임워크 이해
- FPGA 프로토타이핑 경험

■ 근무 조건
- 근무지: 충남 천안시
- 근무형태: 정규직
- 급여: 면접 후 협의

■ 지원 방법
- 이메일: recruit@codegear.co.kr
- 제출서류: 이력서, 자기소개서, 포트폴리오(선택)`,
  },
  {
    id: "2",
    category: "채용",
    title: "[정규직] 임베디드 소프트웨어 개발자 채용",
    date: "2026-01-25",
    views: 189,
    content: `주식회사 코드기어에서 임베디드 소프트웨어 개발자를 채용합니다.

■ 모집 분야
- 임베디드 리눅스 기반 소프트웨어 개발
- 디바이스 드라이버 개발 및 최적화

■ 자격 요건
- C/C++ 활용 능력 우수자
- 임베디드 시스템 개발 경험 2년 이상
- Linux 커널 및 디바이스 드라이버 이해

■ 우대 사항
- ARM/RISC-V 아키텍처 경험
- RTOS 개발 경험
- 하드웨어 디버깅 능력

■ 지원 방법
- 이메일: recruit@codegear.co.kr`,
  },
  {
    id: "3",
    category: "공지",
    title: "2026년 상반기 인턴십 프로그램 안내",
    date: "2026-01-20",
    views: 456,
    content: `Code Gear 2026년 상반기 인턴십 프로그램을 안내드립니다.

■ 프로그램 개요
- 기간: 2026년 3월 ~ 8월 (6개월)
- 분야: 반도체 설계, 임베디드 SW, AI/ML
- 대상: 관련 전공 대학(원)생

■ 프로그램 특징
- 현업 프로젝트 참여 기회
- 1:1 멘토링 제공
- 우수 인턴 정규직 전환 기회

■ 지원 일정
- 서류 접수: 2026.02.01 ~ 2026.02.28
- 면접: 2026.03.01 ~ 2026.03.10
- 결과 발표: 2026.03.15

■ 지원 방법
- 이메일: recruit@codegear.co.kr
- 제출서류: 이력서, 성적증명서`,
  },
  {
    id: "4",
    category: "뉴스",
    title: "Code Gear, 법인 설립 완료",
    date: "2026-01-15",
    views: 789,
    content: `주식회사 코드기어가 2026년 1월 법인 설립을 완료하였습니다.

Code Gear는 2018년부터 시스템 반도체 설계 및 임베디드 소프트웨어 개발 분야에서 기술력을 축적해왔으며, 이번 법인 설립을 통해 본격적인 사업 확장에 나섭니다.

주요 사업 분야:
- 시스템 반도체 설계 및 NPU 개발
- 로봇 제어 시스템 및 모션 컨트롤러
- AI/ML 하드웨어 가속기
- 임베디드 소프트웨어 및 펌웨어

앞으로 Code Gear는 차세대 지능형 반도체와 로봇 제어 기술을 통해 산업 혁신에 기여하겠습니다.

감사합니다.
주식회사 코드기어 대표이사`,
  },
  {
    id: "5",
    category: "공지",
    title: "설 연휴 휴무 안내",
    date: "2026-01-10",
    views: 123,
    content: `설 연휴 휴무 안내드립니다.

■ 휴무 기간
- 2026년 1월 28일(화) ~ 1월 30일(목)

■ 업무 재개
- 2026년 1월 31일(금)부터 정상 운영

휴무 기간 중 긴급 문의는 이메일(contact@codegear.co.kr)로 연락 부탁드립니다.

즐거운 명절 보내세요!
주식회사 코드기어 드림`,
  },
  {
    id: "6",
    category: "채용",
    title: "[계약직] FPGA 검증 엔지니어 채용",
    date: "2026-01-08",
    views: 167,
    content: `주식회사 코드기어에서 FPGA 검증 엔지니어를 채용합니다.

■ 모집 분야
- FPGA 기반 SoC 설계 검증
- UVM 기반 테스트벤치 개발

■ 자격 요건
- SystemVerilog/UVM 활용 능력
- FPGA 프로토타이핑 경험
- 디지털 회로 설계 검증 경험 1년 이상

■ 근무 조건
- 근무지: 충남 천안시
- 근무형태: 계약직 (1년, 연장 가능)
- 급여: 면접 후 협의

■ 지원 방법
- 이메일: recruit@codegear.co.kr`,
  },
];

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
  const notice = notices.find((n) => n.id === id);

  if (!notice) {
    notFound();
  }

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
              {notice.date}
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
