import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");
const SITE_URL = "https://veloxstudio.co";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readingTime: string;
  content: string;
};

const postsConfig = [
  {
    slug: "1-homepage-guide",
    fileName: "1-homepage-guide.md",
    publishedAt: "2026-03-25",
    readingTime: "4분 읽기",
  },
  {
    slug: "2-reservation-hesitation",
    fileName: "2-reservation-hesitation.md",
    publishedAt: "2026-03-25",
    readingTime: "3분 읽기",
  },
  {
    slug: "3-homepage-vs-instagram",
    fileName: "3-homepage-vs-instagram.md",
    publishedAt: "2026-03-25",
    readingTime: "4분 읽기",
  },
] as const;

const slugMap = new Map(postsConfig.map((post) => [post.fileName, post.slug]));

marked.setOptions({
  gfm: true,
  breaks: true,
});

function toBlogPath(slug: string) {
  return `/blog/${slug}`;
}

function transformMarkdownLinks(markdown: string) {
  return markdown.replace(/\((\.\/)?([^)]+\.md)\)/g, (_, _prefix, fileName) => {
    const slug = slugMap.get(fileName);
    return slug ? `(${toBlogPath(slug)})` : `(${fileName})`;
  });
}

function extractTitle(markdown: string) {
  const match = markdown.match(/^#\s+(.+)$/m);
  if (!match) throw new Error("Blog title not found");
  return match[1].trim();
}

function extractDescription(markdown: string) {
  const match = markdown.match(/\*\*Meta Description:\*\*\s*(.+)/);
  if (!match) throw new Error("Meta description not found");
  return match[1].trim();
}

function stripFrontNotes(markdown: string) {
  return markdown
    .replace(/^수정일:.*\n*/m, "")
    .replace(/<!-- meta description -->\n> \*\*Meta Description:\*\*.*\n*/m, "")
    .trim();
}

function readPost(slug: string): BlogPost {
  const config = postsConfig.find((post) => post.slug === slug);
  if (!config) throw new Error(`Unknown blog slug: ${slug}`);

  const raw = fs.readFileSync(path.join(BLOG_DIR, config.fileName), "utf8");
  const normalized = transformMarkdownLinks(raw);
  const title = extractTitle(normalized);
  const description = extractDescription(normalized);
  const content = marked.parse(stripFrontNotes(normalized)) as string;

  return {
    slug: config.slug,
    title,
    description,
    publishedAt: config.publishedAt,
    readingTime: config.readingTime,
    content,
  };
}

export function getAllBlogPosts() {
  return postsConfig.map((post) => readPost(post.slug));
}

export function getBlogPost(slug: string) {
  return readPost(slug);
}

export function getRelatedPosts(slug: string) {
  return getAllBlogPosts().filter((post) => post.slug !== slug).slice(0, 2);
}

export function getBlogPostUrl(slug: string) {
  return `${SITE_URL}${toBlogPath(slug)}`;
}
