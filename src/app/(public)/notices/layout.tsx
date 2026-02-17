import { Metadata } from "next";

export const metadata: Metadata = {
  title: "공고",
  description: "주식회사 코드기어의 채용, 공지, 뉴스 정보",
};

export default function NoticesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
