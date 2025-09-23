"use client";
import { useState } from "react";

const PER_PAGE = 5;

export default function MoreButtonList({ guides }: { guides: any[] }) {
  const [visibleCount, setVisibleCount] = useState(PER_PAGE);

  const visibleGuides = guides.slice(0, visibleCount);
  const hasMore = visibleCount < guides.length;

  return (
    <div>
      <ul className="space-y-4">
        {visibleGuides.map((g) => (
          <li key={g.slug} className="border rounded-xl p-4 bg-white">
            <h2 className="font-semibold text-zinc-900">{g.frontmatter.title}</h2>
            <p className="text-sm text-zinc-600">{g.frontmatter.excerpt}</p>
          </li>
        ))}
      </ul>

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
