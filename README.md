# Code Gear v0.8.0

> "Connecting Intelligence to Hardware" - 지능형 하드웨어의 미래를 설계합니다

주식회사 코드기어 공식 웹사이트 v2. 테크 코퍼리트 디자인 + Neon PostgreSQL 백엔드.

## 기술 스택

| 분류 | 기술 |
|------|------|
| Framework | Next.js 16 (App Router, Server Components) |
| Language | TypeScript |
| UI | shadcn/ui + Tailwind CSS v4 |
| Animation | Framer Motion |
| Icons | Lucide React |
| Database | Neon PostgreSQL + Prisma v7 |
| Auth | NextAuth.js v5 (Google OAuth) |
| Font | Pretendard (한글) + Inter (영문) |
| Deploy | Vercel |

## 페이지 구조

### 퍼블릭
- `/` — 메인 (Hero, 기술카드, 공고, 회사소개, 연락처)
- `/notices` — 공고 목록 (카테고리 필터)
- `/notices/[id]` — 공고 상세
- `/about` — 회사소개 (27개 사업목적)
- `/privacy` — 개인정보처리방침
- `/terms` — 이용약관

### 관리자 (보호됨)
- `/admin` — 대시보드 (통계)
- `/admin/notices` — 공고 CRUD (생성/수정/삭제/발행 토글)
- `/admin/content` — Hero/기술카드 콘텐츠 편집
- `/admin/settings` — 회사정보/소셜링크 설정

### 인증
- `/auth` — Google OAuth 로그인
- 관리자 이메일 화이트리스트 기반 접근 제어

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경변수 설정

`.env.local` 파일을 생성하고 아래 값을 채워주세요:

```env
# Neon PostgreSQL
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# NextAuth
AUTH_SECRET="openssl rand -base64 32 로 생성"
AUTH_URL="http://localhost:3000"

# Google OAuth (Google Cloud Console에서 발급)
GOOGLE_CLIENT_ID="your-client-id"
GOOGLE_CLIENT_SECRET="your-client-secret"

# 관리자 이메일 (쉼표 구분)
ADMIN_EMAILS="admin@example.com"
```

### 3. DB 설정

```bash
# Prisma 클라이언트 생성
npx prisma generate

# DB 스키마 푸시
npx prisma db push

# 시드 데이터 (기술카드, 사이트 설정, 샘플 공고)
npx prisma db seed
```

### 4. 개발 서버

```bash
npm run dev
```

http://localhost:3000 에서 확인

### 5. 빌드 및 배포

```bash
npm run build
npm start
```

## 프로젝트 구조

```
codegear2/
├── prisma/
│   ├── schema.prisma      # DB 스키마
│   └── seed.ts            # 시드 데이터
├── src/
│   ├── app/
│   │   ├── (public)/      # 퍼블릭 페이지 (Header+Footer 레이아웃)
│   │   ├── admin/         # 관리자 대시보드
│   │   ├── api/auth/      # NextAuth API
│   │   ├── auth/          # 로그인 페이지
│   │   ├── layout.tsx     # 루트 레이아웃 (폰트, 메타데이터)
│   │   ├── sitemap.ts     # SEO sitemap
│   │   └── robots.ts      # SEO robots.txt
│   ├── components/
│   │   ├── ui/            # shadcn/ui 컴포넌트
│   │   ├── layout/        # Header, Footer, AdminSidebar, ThemeToggle
│   │   ├── sections/      # Hero, Technology, Notice, About, Contact
│   │   └── admin/         # NoticeForm 등 관리자 컴포넌트
│   ├── lib/
│   │   ├── auth.ts        # NextAuth 설정
│   │   ├── prisma.ts      # Prisma 클라이언트
│   │   └── utils.ts       # 유틸리티
│   ├── hooks/             # 커스텀 훅
│   └── types/             # TypeScript 타입
├── public/
│   └── fonts/             # Pretendard 폰트
└── docs/
    └── plans/             # 디자인/구현 문서
```

## 디자인 시스템

- **스타일**: Tech Corporate (Samsung/IBM 반도체 사이트 느낌)
- **컬러**: Navy (#0f172a), Slate, Electric Blue (#3b82f6)
- **모드**: 라이트 모드 기본 + 다크 모드 토글
- **카드**: 솔리드 배경, 미세한 보더와 그림자, 호버 시 elevation 변화
- **타이포**: Pretendard (한글) + Inter (영문)

## 남은 작업

- [ ] Neon DB 연결 및 실제 데이터 연동
- [ ] Google OAuth 설정 (Google Cloud Console)
- [ ] 퍼블릭 페이지 하드코딩 데이터 → Prisma 쿼리로 교체
- [ ] 관리자 CRUD → Prisma 연동
- [ ] Vercel 배포
- [ ] 커스텀 도메인 연결

## 라이선스

(c) 2026 주식회사 코드기어. All rights reserved.
