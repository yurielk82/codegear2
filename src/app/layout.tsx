import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Code Gear - Connecting Intelligence to Hardware",
    template: "%s | Code Gear",
  },
  description: "NPU, 로봇 제어, 시스템 반도체 IP 등 차세대 기술을 선도하는 하이테크 스타트업 주식회사 코드기어",
  keywords: ["코드기어", "Code Gear", "NPU", "반도체", "로봇 제어", "AI 가속기", "FPGA", "임베디드", "SoC"],
  authors: [{ name: "주식회사 코드기어" }],
  creator: "Code Gear Inc.",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "Code Gear",
    title: "Code Gear - Connecting Intelligence to Hardware",
    description: "NPU, 로봇 제어, 시스템 반도체 IP 등 차세대 기술을 선도하는 하이테크 스타트업",
  },
  twitter: {
    card: "summary_large_image",
    title: "Code Gear - Connecting Intelligence to Hardware",
    description: "NPU, 로봇 제어, 시스템 반도체 IP 등 차세대 기술을 선도하는 하이테크 스타트업",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${pretendard.variable} ${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
