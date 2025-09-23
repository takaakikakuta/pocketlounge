"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const PER_PAGE = 5;

export function GuideList({ guides }: { guides: any[] }) {
  const [visibleCount, setVisibleCount] = useState(PER_PAGE);

  const visibleGuides = guides.slice(0, visibleCount);
  const hasMore = visibleCount < guides.length;

  return (
    <div>
      <div className="space-y-4">
        {visibleGuides.map((g) => {
          const { title, excerpt, ogImage, date } = g.frontmatter;
          const cats = [
            ...(g.frontmatter.categories ?? []),
            ...(g.frontmatter.category ? [g.frontmatter.category] : []),
          ];
          return (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}`}
              className="flex gap-4 rounded-2xl border border-zinc-200 bg-white p-4 hover:shadow-sm transition"
            >
              {ogImage ? (
                <div className="relative h-24 w-40 shrink-0 overflow-hidden rounded-xl bg-zinc-100">
                  <Image
                    src={ogImage}
                    alt={title ?? g.slug}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="h-24 w-40 shrink-0 rounded-xl bg-zinc-100" />
              )}
              <div className="min-w-0">
                <h2 className="text-base sm:text-lg font-semibold text-zinc-900">{title}</h2>
                {excerpt && <p className="mt-1 text-sm text-zinc-600 line-clamp-2">{excerpt}</p>}
                <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-500">
                  {date && <time>{new Date(date).toLocaleDateString("ja-JP")}</time>}
                  {cats.length > 0 && <span>•</span>}
                  {cats.map((c, i) => (
                    <span key={c + i} className="rounded-full bg-zinc-100 px-2 py-0.5">
                      {c}
                    </span>
                  ))}
                </div>
                <span className="mt-2 inline-block text-sm font-medium text-emerald-700">
                  続きを読む →
                </span>
              </div>
            </Link>
          );
        })}
        {visibleGuides.length === 0 && (
          <p className="text-sm text-zinc-500">該当する記事が見つかりませんでした。</p>
        )}
      </div>

      {hasMore && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setVisibleCount((c) => c + PER_PAGE)}
            className="inline-flex items-center justify-center rounded-xl border border-emerald-600 bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            もっと見る
          </button>
        </div>
      )}
    </div>
  );
}
