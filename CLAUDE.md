# codegear2

주식회사 코드기어 공식 웹사이트 v2 — 마케팅 + 관리자 CMS (Prisma + Neon)

| 항목 | 값 |
|------|-----|
| **유형** | 풀스택 |
| **역할** | 코드기어 공식 웹사이트 v2 + CMS |
| **MCP** | Vercel |

## Tech Stack

- **프레임워크**: Next.js 16 + React 19 + TypeScript 5 (strict)
- **DB/ORM**: Prisma 7.4 + Neon Serverless PostgreSQL (@prisma/adapter-neon)
- **인증**: NextAuth 5 (beta) + Google OAuth + @auth/prisma-adapter
- **UI**: Tailwind CSS 4 + shadcn/ui (Radix UI) + Lucide Icons + Framer Motion
- **검증**: Zod 4
- **테스트**: Vitest 4
- **린트**: ESLint 9

## Design 규칙

- Tailwind arbitrary values 금지 (`p-[13px]` 등) — 테마 토큰 사용
- 하드코딩 색상 금지 (`text-blue-500`) — 시맨틱 변수만 (`text-primary`, `bg-muted`)
- 인라인 스타일, hex/rgb 직접 사용 금지 (동적 계산값 제외)
- 새 UI 전 `@/components/ui/` 기존 컴포넌트 탐색 → 없으면 확인 후 추가

## 도메인 특화 규칙

### 공개/관리자 이원 구조

```
app/
├── (public)/     # 공개 (인증 불필요) — Hero, 기술카드, 공고, 회사소개
├── admin/        # 관리자 (Google OAuth 필수) — 대시보드, CRUD, 콘텐츠 편집
└── api/          # REST API (notices, technologies, settings)
```

### Neon + Prisma 주의사항

- `prisma.ts`: Neon 어댑터로 서버리스 연결 풀링
- `prisma.config.ts`: CLI용 unpooled 연결 문자열 (마이그레이션 시 필수)
- `auth.config.ts`: Edge Runtime 호환 — Prisma 미사용 (auth.ts에서만 PrismaAdapter)

### 권한 체계

- `/admin/*`: middleware에서 로그인 필수, API는 `auth()` 세션 검증
- 관리자 판정: `ADMIN_EMAILS` 환경변수 (쉼표 구분)

### Fallback 데이터

DB 장애 시 하드코딩 기본값 사용 (TechnologySection, NoticeSection)

### 알려진 예외

- Technology `icon`: 문자열 → `iconMap`으로 Lucide 컴포넌트 매핑
- 폼 유효성: 클라이언트 검증만 (내부 CMS이므로 허용)

## 주요 명령어

```bash
npm run dev          # 개발 서버
npm run build        # 프로덕션 빌드
npm test             # Vitest
npx prisma migrate dev   # DB 마이그레이션
npx prisma studio        # DB GUI
```

## Copyright

```
Copyright (c) 2026 Code Gear Inc. All rights reserved.
```
