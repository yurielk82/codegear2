export interface Notice {
  id: string;
  category: "채용" | "공지" | "뉴스";
  title: string;
  content: string;
  date: string;
  views: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Technology {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  gradient: string;
  sort_order: number;
}

export interface HeroSettings {
  mainCopy: string;
  subCopy: string;
  ctaText: string;
  ctaLink: string;
}

export interface CompanySettings {
  name: string;
  nameEn: string;
  ceo: string;
  address: string;
  addressDetail: string;
  businessNumber: string;
  phone: string;
  email: string;
  foundedYear: number;
}

export interface SocialSettings {
  github?: string;
  linkedin?: string;
  twitter?: string;
}

export interface SiteSetting<T = unknown> {
  key: string;
  value: T;
  updated_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  role: string;
  created_at: string;
}
