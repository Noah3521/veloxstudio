import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const headingFont = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://veloxstudio.co"),
  title: "Velox Studio | AI Web Agency",
  description:
    "Velox Studio builds conversion-ready websites in as little as 7 days. Warm premium design, zero hosting fee, refined UX, and static deployment on Cloudflare Pages.",
  keywords: [
    "Velox Studio",
    "홈페이지 제작",
    "웹사이트 제작",
    "AI 웹에이전시",
    "스타트업 홈페이지",
    "랜딩페이지 제작",
    "Next.js agency",
    "Cloudflare Pages",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Velox Studio | 고객이 먼저 연락해오는 웹사이트, 7일 안에",
    description:
      "Claude Cream 웜 라이트모드, 7일 납기, 제로 호스팅비. Velox Studio가 스타트업과 테크 브랜드의 첫 인상을 부드럽고 신뢰감 있게 바꿉니다.",
    url: "https://veloxstudio.co",
    siteName: "Velox Studio",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Velox Studio | Bold AI Web Agency",
    description:
      "7일 납기, 제로 호스팅비, 웜 프리미엄 인터랙션까지. Velox Studio가 스타트업과 테크 브랜드의 첫 인상을 바꿉니다.",
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
    <html lang="ko">
      <body className={`${bodyFont.variable} ${headingFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
