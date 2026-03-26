import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock3 } from "lucide-react";
import { BlogShell } from "@/components/blog-shell";
import {
  getAllBlogPosts,
  getBlogPost,
  getBlogPostUrl,
  getRelatedPosts,
} from "@/lib/blog";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getAllBlogPosts().find((item) => item.slug === slug);

  if (!post) {
    return {};
  }

  const url = getBlogPostUrl(post.slug);

  return {
    title: `${post.title} | Velox Studio`,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | Velox Studio`,
      description: post.description,
      url,
      siteName: "Velox Studio",
      locale: "ko_KR",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Velox Studio`,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getAllBlogPosts().find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug);

  return (
    <BlogShell>
      <article className="container-shell py-14 md:py-20">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            블로그 목록으로
          </Link>

          <header className="mt-8 mesh-panel soft-card rounded-[32px] border border-border px-6 py-10 md:px-10 md:py-14">
            <div className="section-chip border-primary/20 text-primary">SEO Article</div>
            <h1 className="display-title mt-6 text-4xl font-black tracking-[-0.05em] sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
              {post.description}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span>{post.publishedAt}</span>
              <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4" />{post.readingTime}</span>
              <span>Canonical: {getBlogPostUrl(post.slug)}</span>
            </div>
          </header>

          <div className="soft-card mt-8 rounded-[32px] border border-border px-6 py-8 md:px-10 md:py-10">
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          <section className="mt-8 rounded-[32px] border border-border bg-gradient-to-br from-[#FFF8F0] via-white to-[#F7EBDD] px-6 py-8 shadow-[0_18px_48px_rgba(140,120,100,0.10)] md:px-10 md:py-10">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">
              Ready to launch
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
              Velox Studio 메인 페이지에서 사례와 제작 흐름을 확인해보세요.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
              검색 유입을 받는 블로그와 문의로 이어지는 랜딩 구조를 함께 설계합니다.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-[0_12px_28px_rgba(140,120,100,0.14)]"
              >
                veloxstudio.co 메인으로
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center rounded-full border border-border bg-white/90 px-6 py-3 text-sm font-bold text-foreground"
              >
                문의 남기기
              </Link>
            </div>
          </section>

          <section className="mt-8">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-semibold tracking-tight">관련 글</h2>
              <Link href="/blog" className="text-sm font-semibold text-muted-foreground hover:text-foreground">
                전체 보기
              </Link>
            </div>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {relatedPosts.map((relatedPost) => (
                <article
                  key={relatedPost.slug}
                  className="soft-card rounded-[28px] border border-border p-6"
                >
                  <h3 className="text-xl font-semibold tracking-tight">
                    <Link href={`/blog/${relatedPost.slug}`} className="hover:text-primary">
                      {relatedPost.title}
                    </Link>
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {relatedPost.description}
                  </p>
                  <Link
                    href={`/blog/${relatedPost.slug}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-foreground hover:text-primary"
                  >
                    관련 글 읽기
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              ))}
            </div>
          </section>
        </div>
      </article>
    </BlogShell>
  );
}
