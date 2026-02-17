import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const technologies = [
    { id: "npu", title: "NPU 설계", subtitle: "Neural Processing Unit", description: "고효율 신경망 처리 유닛 설계 및 최적화", icon: "cpu", gradient: "from-blue-500 to-cyan-500", sortOrder: 1 },
    { id: "robot-control", title: "로봇 제어 시스템", subtitle: "Robot Control System", description: "정밀 모션 제어 및 실시간 로봇 시스템", icon: "bot", gradient: "from-purple-500 to-pink-500", sortOrder: 2 },
    { id: "semiconductor-ip", title: "시스템 반도체 IP", subtitle: "System Semiconductor IP", description: "맞춤형 반도체 IP 코어 설계 및 라이센싱", icon: "chip", gradient: "from-orange-500 to-red-500", sortOrder: 3 },
    { id: "embedded-sw", title: "임베디드 소프트웨어", subtitle: "Embedded Software", description: "저전력 고성능 임베디드 시스템 개발", icon: "code", gradient: "from-green-500 to-emerald-500", sortOrder: 4 },
    { id: "ai-accelerator", title: "AI 가속기", subtitle: "AI Accelerator", description: "머신러닝 추론 가속을 위한 전용 하드웨어", icon: "zap", gradient: "from-yellow-500 to-orange-500", sortOrder: 5 },
    { id: "fpga-design", title: "FPGA 설계", subtitle: "FPGA Design", description: "프로토타이핑 및 커스텀 로직 구현", icon: "grid-3x3", gradient: "from-indigo-500 to-purple-500", sortOrder: 6 },
    { id: "soc-integration", title: "SoC 통합", subtitle: "System on Chip", description: "시스템 온 칩 아키텍처 설계 및 통합", icon: "layers", gradient: "from-teal-500 to-cyan-500", sortOrder: 7 },
    { id: "verification", title: "설계 검증", subtitle: "Design Verification", description: "하드웨어 설계 검증 및 테스트 자동화", icon: "check-circle", gradient: "from-rose-500 to-pink-500", sortOrder: 8 },
  ];

  for (const tech of technologies) {
    await prisma.technology.upsert({ where: { id: tech.id }, update: tech, create: tech });
  }

  await prisma.siteSetting.upsert({
    where: { key: "hero" },
    update: { value: { mainCopy: "Connecting Intelligence to Hardware", subCopy: "지능형 하드웨어의 미래를 설계합니다", ctaText: "기술 알아보기", ctaLink: "#technology" } },
    create: { key: "hero", value: { mainCopy: "Connecting Intelligence to Hardware", subCopy: "지능형 하드웨어의 미래를 설계합니다", ctaText: "기술 알아보기", ctaLink: "#technology" } },
  });

  await prisma.siteSetting.upsert({
    where: { key: "company" },
    update: { value: { name: "주식회사 코드기어", nameEn: "Code Gear Inc.", ceo: "대표이사", address: "충청남도 천안시 서북구 불당동", addressDetail: "불당로 XX, XX층", businessNumber: "XXX-XX-XXXXX", phone: "041-XXX-XXXX", email: "contact@codegear.co.kr", foundedYear: 2026 } },
    create: { key: "company", value: { name: "주식회사 코드기어", nameEn: "Code Gear Inc.", ceo: "대표이사", address: "충청남도 천안시 서북구 불당동", addressDetail: "불당로 XX, XX층", businessNumber: "XXX-XX-XXXXX", phone: "041-XXX-XXXX", email: "contact@codegear.co.kr", foundedYear: 2026 } },
  });

  await prisma.siteSetting.upsert({
    where: { key: "social" },
    update: { value: { github: "https://github.com/codegear", linkedin: "https://linkedin.com/company/codegear" } },
    create: { key: "social", value: { github: "https://github.com/codegear", linkedin: "https://linkedin.com/company/codegear" } },
  });

  const notices = [
    { category: "채용", title: "[정규직] NPU 설계 엔지니어 채용 공고", content: "NPU 설계 경력자를 모집합니다.", date: new Date("2026-01-28"), views: 234 },
    { category: "채용", title: "[정규직] 임베디드 소프트웨어 개발자 채용", content: "임베디드 SW 개발 경력자를 모집합니다.", date: new Date("2026-01-25"), views: 189 },
    { category: "공지", title: "2026년 상반기 인턴십 프로그램 안내", content: "인턴십 프로그램에 대한 안내입니다.", date: new Date("2026-01-20"), views: 456 },
    { category: "뉴스", title: "Code Gear, 법인 설립 완료", content: "주식회사 코드기어 법인 설립을 완료했습니다.", date: new Date("2026-01-15"), views: 789 },
  ];

  for (const notice of notices) {
    await prisma.notice.create({ data: notice });
  }

  console.log("Seed completed!");
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
