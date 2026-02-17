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
  title: "Code Gear - Connecting Intelligence to Hardware",
  description: "NPU, 로봇 제어, 시스템 반도체 IP 등 차세대 기술을 선도하는 하이테크 스타트업",
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
