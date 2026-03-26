import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";
import { BlogShell } from "@/components/blog-shell";
import { getAllBlogPosts, getBlogPostUrl } from "@/lib/blog";

export const metadata: Metadata = {
  title: "블로그 | Velox Studio",
  description:
    "뷰티샵·1인샵 홈페이지 제작과 검색 유입, 예약 전환, 인스타그램 운영에 대한 실전 가이드를 모은 Velox Studio 블로그입니다.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "블로그 | Velox Studio",
    description:
      "뷰티샵·1인샵 홈페이지 제작과 검색 유입, 예약 전환, 인스타그램 운영에 대한 실전 가이드를 모은 Velox Studio 블로그입니다.",
    url: "https://veloxstudio.co/blog",
    siteName: "Velox Studio",
    locale: "ko_KR",
    type: "website",
  },
};

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  return (
    <BlogShell>
      <section className="container-shell py-16 md:py-24">
        <div className="mesh-panel soft-card rounded-[32px] border border-border px-6 py-10 md:px-10 md:py-14">
          <div className="section-chip border-primary/20 text-primary">Velox Blog</div>
          <h1 className="display-title mt-6 max-w-4xl text-4xl font-black tracking-[-0.05em] sm:text-5xl md:text-6xl">
            검색 유입과 예약 전환을 돕는 뷰티샵 홈페이지 가이드
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
            인스타그램만으로 운영할 때 생기는 한계, 홈페이지가 실제로 필요한 순간,
            그리고 예약 전환을 더 부드럽게 만드는 구조를 현실적으로 정리했습니다.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {posts.map((post, index) => (
            <article
              key={post.slug}
              className="soft-card flex h-full flex-col rounded-[28px] border border-border p-6"
            >
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>SEO Article</span>
              </div>
              <h2 className="mt-5 text-2xl font-semibold tracking-tight text-foreground">
                <Link href={`/blog/${post.slug}`} className="hover:text-primary">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-4 flex-1 text-sm leading-7 text-muted-foreground">
                {post.description}
              </p>
              <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
                <span>{post.publishedAt}</span>
                <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4" />{post.readingTime}</span>
              </div>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-foreground hover:text-primary"
              >
                글 읽기
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </BlogShell>
  );
}
