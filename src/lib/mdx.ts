// src/lib/mdx.ts
import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc"; // ← rsc ではなく通常版に統一でもOK
// ↑ App Routerで使うなら現状は `next-mdx-remote` から import でOK

export type GuideFrontmatter = {
  title: string;
  date: string;
  excerpt?: string;
  thumbnail?: string;   // ← サムネイルURL（/images/... など）
  category?: string;    // ← 単一カテゴリの場合
  categories?: string[];// ← 複数カテゴリにも対応
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
};

export type Guide = {
  slug: string;
  frontmatter: GuideFrontmatter;
  // Content は詳細ページでのみ使う（一覧は不要）
  // Content?: React.ComponentType;
};

const GUIDES_DIR = path.join(process.cwd(), "src", "content", "guides");

export function getAllGuideSlugs(): string[] {
  if (!fs.existsSync(GUIDES_DIR)) return [];
  return fs
    .readdirSync(GUIDES_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function readGuideFile(slug: string) {
  const fp = path.join(GUIDES_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(fp, "utf-8");
  return raw;
}

export function getAllGuidesMeta() {
  return getAllGuideSlugs()
    .map((slug) => {
      const raw = readGuideFile(slug);
      const { data } = matter(raw);
      return { slug, frontmatter: data as GuideFrontmatter };
    })
    .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
}

// 詳細ページ用：MDXをコンパイル
export async function compileGuide(slug: string) {
  const source = readGuideFile(slug);
  const { content: body, data } = matter(source);

  const { content } = await compileMDX<GuideFrontmatter>({
    source: body,
    options: { parseFrontmatter: false },
    // components: { ... } // 必要なら
  });

  return {
    slug,
    frontmatter: data as GuideFrontmatter,
    content, // ← ReactElement
  };
}
