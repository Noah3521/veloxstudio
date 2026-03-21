import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Velox Studio — 3일 만에 완성하는 프리미엄 웹사이트",
  description:
    "제로 호스팅비, SEO 최적화, 글로벌 CDN. Velox Studio는 빠르고 세련된 프리미엄 웹사이트를 제작합니다.",
  keywords: [
    "홈페이지 제작",
    "웹사이트 제작",
    "웹 에이전시",
    "Next.js",
    "프리미엄 웹사이트",
    "Velox Studio",
  ],
  openGraph: {
    title: "Velox Studio — 3일 만에 완성하는 프리미엄 웹사이트",
    description:
      "제로 호스팅비 · SEO 최적화 · 글로벌 CDN. 빠르고 세련된 프리미엄 웹사이트 제작.",
    url: "https://veloxstudio.co",
    siteName: "Velox Studio",
    locale: "ko_KR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
