import Link from "next/link";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const quickLinks = [
  { name: "개인정보처리방침", href: "/privacy" },
  { name: "이용약관", href: "/terms" },
];

const company = {
  name: "주식회사 코드기어",
  nameEn: "Code Gear Inc.",
  address: "충청남도 천안시 서북구 불당동",
  phone: "041-XXX-XXXX",
  email: "contact@codegear.co.kr",
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-[#0f172a] text-slate-300 dark:bg-[#020617]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Column 1: Company Info + Social */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500">
                <span className="text-sm font-bold text-white">CG</span>
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Code Gear
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              NPU, 로봇 제어, 시스템 반도체 IP 등 차세대 기술을 선도하는
              하이테크 스타트업
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer text-slate-400 transition-colors duration-200 hover:text-white"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer text-slate-400 transition-colors duration-200 hover:text-white"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              바로가기
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="cursor-pointer text-sm text-slate-400 transition-colors duration-200 hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              연락처
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-slate-400">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                <span>{company.address}</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-slate-400">
                <Phone className="h-4 w-4 shrink-0 text-slate-500" />
                <span>{company.phone}</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-slate-400">
                <Mail className="h-4 w-4 shrink-0 text-slate-500" />
                <a
                  href={`mailto:${company.email}`}
                  className="cursor-pointer transition-colors duration-200 hover:text-white"
                >
                  {company.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-slate-700/50" />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-2 text-xs text-slate-500 sm:flex-row">
          <p>&copy; 2026 {company.name}. All rights reserved.</p>
          <p>{company.nameEn}</p>
        </div>
      </div>
    </footer>
  );
}
