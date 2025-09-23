// app/guides/[slug]/page.tsx
import type { Metadata } from "next";
import { compileGuide, getAllGuideSlugs } from "@/lib/mdx";
import Header from "@/components/Header";
import InlineToc from "@/components/InlineToc";
import Image from "next/image";
import "./local.css";
import Link from "next/link";
import Footer from "@/components/Footer";

// 自前で型定義（Next.js 15 では PageProps がない）
type PageProps<T extends Record<string, any>> = {
  params: Promise<T>;
};

// SSG: /guides/[slug] の静的パス生成
export function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

// メタデータ
export async function generateMetadata(
  { params }: PageProps<{ slug: string }>
): Promise<Metadata> {
  const { slug } = await params; // Promise を await
  const { frontmatter } = await compileGuide(slug);

  const title = frontmatter.title ?? "ガイド";
  const description = frontmatter.excerpt ?? "キッズスペース準備のためのガイド";
  const canonical = frontmatter.canonical ?? `/guides/${slug}`;
  const ogImage = frontmatter.ogImage ?? "/ogp.jpg";

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      images: [{ url: ogImage }],
    },
  };
}

// ページ本体
export default async function GuideDetailPage(
  { params }: PageProps<{ slug: string }>
) {
  const { slug } = await params; // Promise を await
  const { frontmatter, content } = await compileGuide(slug);
  const hero = frontmatter.ogImage;

  return (
    <>
      <Header />
      {/* 2カラム：左=本文 / 右=目次 */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 本文 */}
        <section className="lg:col-span-8">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            {frontmatter.title}
          </h1>
          {frontmatter.date && (
            <p className="mt-2 text-sm text-zinc-500">
              {new Date(frontmatter.date).toLocaleDateString("ja-JP")}
            </p>
          )}

          {hero && (
            <div className="not-prose my-6">
              <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl bg-zinc-100">
                <Image
                  src={hero}
                  alt={frontmatter.title ?? ""}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 896px"
                  priority
                />
              </div>
            </div>
          )}

          {/* MDX本文 */}
          <article
            data-article-root
            className="prose prose-zinc max-w-none prose-headings:scroll-mt-24"
          >
            {content}
          </article>

          <div className="mt-10 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              見積り・空き確認へ
            </Link>
          </div>
        </section>

        {/* 目次（Sticky） */}
        <aside
          data-inline-toc
          className="lg:col-span-4 lg:sticky lg:top-24 self-start"
        >
          <InlineToc
            title="目次"
            accent="emerald"
            scrollOffset={72}
            rootSelector="[data-article-root]"
          />
        </aside>
      </main>
      <Footer />
    </>
  );
}
