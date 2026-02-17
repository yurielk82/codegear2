-- =============================================
-- Codegear 2 - Initial Database Schema
-- =============================================

-- Notices table
CREATE TABLE notices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL CHECK (category IN ('채용', '공지', '뉴스')),
  title TEXT NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  views INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Technologies table
CREATE TABLE technologies (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  gradient TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

-- Site settings table (key-value JSON store)
CREATE TABLE site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Admin users whitelist
CREATE TABLE admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER notices_updated_at
  BEFORE UPDATE ON notices
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =============================================
-- Row Level Security
-- =============================================

ALTER TABLE notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Public read access for published notices
CREATE POLICY "Public can read published notices"
  ON notices FOR SELECT
  USING (is_published = true);

-- Admin full access to notices
CREATE POLICY "Admins can manage notices"
  ON notices FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

-- Public read access for technologies
CREATE POLICY "Public can read technologies"
  ON technologies FOR SELECT
  TO anon, authenticated
  USING (true);

-- Admin full access to technologies
CREATE POLICY "Admins can manage technologies"
  ON technologies FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

-- Public read access for site_settings
CREATE POLICY "Public can read site_settings"
  ON site_settings FOR SELECT
  TO anon, authenticated
  USING (true);

-- Admin full access to site_settings
CREATE POLICY "Admins can manage site_settings"
  ON site_settings FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

-- Only admins can read their own admin_users record
CREATE POLICY "Admins can read admin_users"
  ON admin_users FOR SELECT
  USING (
    email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );

-- =============================================
-- Seed Data
-- =============================================

-- 8 core technologies
INSERT INTO technologies (id, title, subtitle, description, icon, gradient, sort_order) VALUES
  ('npu', 'NPU 설계', 'Neural Processing Unit', '고효율 신경망 처리 유닛 설계 및 최적화', 'cpu', 'from-blue-500 to-cyan-500', 1),
  ('robot-control', '로봇 제어 시스템', 'Robot Control System', '정밀 모션 제어 및 실시간 로봇 시스템', 'bot', 'from-purple-500 to-pink-500', 2),
  ('semiconductor-ip', '시스템 반도체 IP', 'System Semiconductor IP', '맞춤형 반도체 IP 코어 설계 및 라이센싱', 'chip', 'from-orange-500 to-red-500', 3),
  ('embedded-sw', '임베디드 소프트웨어', 'Embedded Software', '저전력 고성능 임베디드 시스템 개발', 'code', 'from-green-500 to-emerald-500', 4),
  ('ai-accelerator', 'AI 가속기', 'AI Accelerator', '머신러닝 추론 가속을 위한 전용 하드웨어', 'zap', 'from-yellow-500 to-orange-500', 5),
  ('fpga-design', 'FPGA 설계', 'FPGA Design', '프로토타이핑 및 커스텀 로직 구현', 'grid-3x3', 'from-indigo-500 to-purple-500', 6),
  ('soc-integration', 'SoC 통합', 'System on Chip', '시스템 온 칩 아키텍처 설계 및 통합', 'layers', 'from-teal-500 to-cyan-500', 7),
  ('verification', '설계 검증', 'Design Verification', '하드웨어 설계 검증 및 테스트 자동화', 'check-circle', 'from-rose-500 to-pink-500', 8);

-- Site settings
INSERT INTO site_settings (key, value) VALUES
  ('hero', '{"mainCopy": "Connecting Intelligence to Hardware", "subCopy": "지능형 하드웨어의 미래를 설계합니다", "ctaText": "기술 알아보기", "ctaLink": "#technology"}'::jsonb),
  ('company', '{"name": "주식회사 코드기어", "nameEn": "Code Gear Inc.", "ceo": "대표이사", "address": "충청남도 천안시 서북구 불당동", "addressDetail": "불당로 XX, XX층", "businessNumber": "XXX-XX-XXXXX", "phone": "041-XXX-XXXX", "email": "contact@codegear.co.kr", "foundedYear": 2026}'::jsonb),
  ('social', '{"github": "https://github.com/codegear", "linkedin": "https://linkedin.com/company/codegear"}'::jsonb);

-- Sample notices
INSERT INTO notices (category, title, content, date, views) VALUES
  ('채용', '[정규직] NPU 설계 엔지니어 채용 공고', 'NPU 설계 경력자를 모집합니다.', '2026-01-28', 234),
  ('채용', '[정규직] 임베디드 소프트웨어 개발자 채용', '임베디드 SW 개발 경력자를 모집합니다.', '2026-01-25', 189),
  ('공지', '2026년 상반기 인턴십 프로그램 안내', '인턴십 프로그램에 대한 안내입니다.', '2026-01-20', 456),
  ('뉴스', 'Code Gear, 법인 설립 완료', '주식회사 코드기어 법인 설립을 완료했습니다.', '2026-01-15', 789);
