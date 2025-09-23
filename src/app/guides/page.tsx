// app/guides/page.tsx
import Header from "@/components/Header";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllGuidesMeta } from "@/lib/mdx";
import { GuideList } from "@/components/GuideList";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "お役立ちガイド｜結婚式・イベントのキッズスペース準備",
  description:
    "結婚式や法人イベントでのキッズスペース作りに役立つガイド。安全対策、設置のコツ、会場との調整ポイントをわかりやすく解説します。",
  alternates: { canonical: "/guides" },
  openGraph: {
    title: "お役立ちガイド｜結婚式・イベントのキッズスペース準備",
    description: "安全・清潔・スムーズな設置のためのノウハウをまとめました。",
    url: "/guides",
    type: "article",
  },
};

type Props = {
  searchParams?: Promise<{ q?: string; category?: string }>;
};

export default async function GuidesPage({ searchParams }: Props) {
  const sp = await searchParams;
  const q = (sp?.q ?? "").trim().toLowerCase();
  const selectedCat = (sp?.category ?? "").trim().toLowerCase();

  const allGuides = getAllGuidesMeta(); // 日付降順想定（lib側）

  // カテゴリ一覧を抽出
  const categorySet = new Set<string>();
  for (const g of allGuides) {
    const c1 = g.frontmatter.category;
    if (c1) categorySet.add(c1);
    const c2 = g.frontmatter.categories ?? [];
    for (const c of c2) categorySet.add(c);
  }
  const allCategories = Array.from(categorySet).sort((a, b) =>
    a.localeCompare(b, "ja"),
  );

  // フィルタ
  const guides = allGuides.filter((g) => {
    // カテゴリ判定
    if (selectedCat) {
      const cats = [
        ...(g.frontmatter.categories ?? []),
        ...(g.frontmatter.category ? [g.frontmatter.category] : []),
      ].map((s) => s.toLowerCase());
      if (!cats.includes(selectedCat)) return false;
    }
    // キーワード判定
    if (q) {
      const t = (g.frontmatter.title ?? "").toLowerCase();
      const e = (g.frontmatter.excerpt ?? "").toLowerCase();
      const slug = g.slug.toLowerCase();
      if (!(t.includes(q) || e.includes(q) || slug.includes(q))) return false;
    }
    return true;
  });

  const recent = allGuides.slice(0, 6); // 新着6件

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        {/* タイトル＋検索 */}
        <header className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            お役立ちガイド
          </h1>
          <p className="mt-3 text-zinc-600">
            結婚式・法人イベント向けのキッズスペース準備に役立つ情報をまとめました。
          </p>

          {/* 検索フォーム */}
          <form
            action="/guides"
            method="GET"
            className="mt-6 flex items-stretch gap-2 max-w-xl mx-auto"
            aria-label="ガイド検索フォーム"
          >
            {/* 検索入力 */}
            <input
              type="search"
              name="q"
              defaultValue={q}
              placeholder="キーワードで検索（例：設置、安全、チェックリスト）"
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label="ガイドの検索キーワード"
            />
            {/* 選択カテゴリの状態を維持する（検索とカテゴリ併用） */}
            {selectedCat && <input type="hidden" name="category" value={selectedCat} />}
            <button
              type="submit"
              className="shrink-0 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              検索
            </button>
          </form>

          {/* 検索・カテゴリの現在値 */}
          {(q || selectedCat) && (
            <p className="mt-3 text-sm text-zinc-500">
              {selectedCat && <>カテゴリ: <strong>{selectedCat}</strong>　</>}
              {q && <>キーワード: <strong>{q}</strong>　</>}
              検索結果：{guides.length}件
            </p>
          )}
        </header>

        {/* カテゴリ一覧（検索の下） */}
        <nav className="mt-6 flex flex-wrap justify-center gap-2">
          {/* すべて */}
          <Link
            href={`/guides${q ? `?q=${encodeURIComponent(q)}` : ""}`}
            className={`inline-flex items-center rounded-full border px-3 py-1 text-sm ${
              selectedCat
                ? "border-zinc-300 text-zinc-700 hover:bg-zinc-50"
                : "border-emerald-200 bg-emerald-50 text-emerald-800"
            }`}
          >
            すべて
          </Link>
          {allCategories.map((cat) => {
            const isActive = selectedCat === cat.toLowerCase();
            const query = new URLSearchParams();
            if (q) query.set("q", q);
            query.set("category", cat.toLowerCase());
            return (
              <Link
                key={cat}
                href={`/guides?${query.toString()}`}
                className={`inline-flex items-center rounded-full border px-3 py-1 text-sm ${
                  isActive
                    ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                    : "border-zinc-300 text-zinc-700 hover:bg-zinc-50"
                }`}
              >
                {cat}
              </Link>
            );
          })}
        </nav>

        {/* 2カラム：左=一覧 / 右=新着 */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* 左：ガイド一覧（横長カード） */}
          <section className="lg:col-span-8">
            <GuideList guides={guides} />
            
            <div className="mt-10 text-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                見積り・空き確認へ
              </Link>
            </div>
          </section>

          {/* 右：新着記事（既存のまま） */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 self-start">
            <div className="rounded-2xl border border-zinc-200 bg-white p-5">
              <h3 className="text-base font-semibold text-zinc-900">新着記事</h3>
              <ul className="mt-4 space-y-3">
                {recent.map((r) => (
                  <li key={r.slug} className="group">
                    <Link href={`/guides/${r.slug}`} className="block">
                      <p className="text-sm font-medium text-zinc-900 group-hover:text-emerald-700">
                        {r.frontmatter.title}
                      </p>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        {r.frontmatter.date
                          ? new Date(r.frontmatter.date).toLocaleDateString("ja-JP")
                          : ""}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <Link
                  href="/guides"
                  className="text-sm font-medium text-emerald-700 hover:underline"
                >
                  すべてのガイドを見る →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer/>
    </>
  );
}
