import { Metadata } from "next";

export const metadata: Metadata = {
  title: "회사소개",
  description: "주식회사 코드기어 회사소개 - NPU 설계, 로봇 제어 시스템, 시스템 반도체 IP",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
