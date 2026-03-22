import type { Metadata } from "next";
import { DM_Mono, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

const monoFont = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://veloxstudio.co"),
  title: "Velox Studio | AI가 만드는 프리미엄 웹사이트",
  description:
    "Velox Studio는 AI 기반 설계와 프리미엄 디자인으로 7일 안에 성과 중심 웹사이트를 제작합니다. 제로 호스팅비, SEO 최적화, Cloudflare 배포까지 한 번에 제공합니다.",
  keywords: [
    "Velox Studio",
    "홈페이지 제작",
    "웹사이트 제작",
    "AI 웹 에이전시",
    "프리미엄 랜딩페이지",
    "Cloudflare Pages",
    "Next.js agency",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Velox Studio | AI가 만드는 프리미엄 웹사이트",
    description:
      "7일 납기, 제로 호스팅비, 프리미엄 디자인. Velox Studio가 브랜드를 이기는 웹사이트로 바꿉니다.",
    url: "https://veloxstudio.co",
    siteName: "Velox Studio",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Velox Studio | AI가 만드는 프리미엄 웹사이트",
    description:
      "7일 납기, 제로 호스팅비, 프리미엄 디자인. Velox Studio가 브랜드를 이기는 웹사이트로 바꿉니다.",
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
    <html lang="ko" suppressHydrationWarning>
      <body className={`${bodyFont.variable} ${headingFont.variable} ${monoFont.variable}`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
