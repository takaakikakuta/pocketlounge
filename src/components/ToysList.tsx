"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

export type StockState = "in" | "low" | "out";
export type PlanTag = "regular" | "luxury";

export type ToyItem = {
  id: string;
  title: string;
  thumb: string;
  price: number;        // 税込（送料別／込みはバッジ等で表現してもOK）
  categories: string[]; // 任意の分類
  ages: string[];       // 例: ["3-6","4-7"]
  stock: StockState;
  short?: string;
  plans: PlanTag[];     // ★ 対象コース（regular / luxury / 両方）
};

type Props = { items: ToyItem[] };

const PLAN_LABEL: Record<PlanTag, string> = {
  regular: "レギュラー対象",
  luxury: "ラグジュアリー対象",
};

const AGE_OPTIONS = ["0-3", "2-5", "3-6", "4-7", "6-9"];
const PLAN_OPTIONS: PlanTag[] = ["regular", "luxury"];

function yen(n: number) {
  return n.toLocaleString("ja-JP");
}

function StockBadge({ stock }: { stock: StockState }) {
  const map = {
    in: { label: "在庫あり", cls: "bg-emerald-50 text-emerald-700 ring-emerald-100" },
    low: { label: "残りわずか", cls: "bg-amber-50 text-amber-800 ring-amber-100" },
    out: { label: "在庫切れ", cls: "bg-zinc-100 text-zinc-600 ring-zinc-200" },
  } as const;
  const s = map[stock];
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ${s.cls}`}>
      {s.label}
    </span>
  );
}

export default function ToysList({ items }: Props) {
  const [q, setQ] = useState("");
  const [age, setAge] = useState<string | "">("");
  const [plan, setPlan] = useState<PlanTag | "">("");
  const [sort, setSort] = useState<"pop" | "price-asc" | "price-desc">("pop");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return items.filter((it) => {
      const okQ =
        !query ||
        it.title.toLowerCase().includes(query) ||
        (it.short ?? "").toLowerCase().includes(query);
      const okAge = !age || it.ages.includes(age);
      const okPlan = !plan || it.plans.includes(plan as PlanTag);
      return okQ && okAge && okPlan;
    });
  }, [items, q, age, plan]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    if (sort === "price-asc") arr.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") arr.sort((a, b) => b.price - a.price);
    else {
      // おすすめ順：在庫→価格
      const score = (s: StockState) => (s === "in" ? 2 : s === "low" ? 1 : 0);
      arr.sort((a, b) => {
        const byStock = score(b.stock) - score(a.stock);
        if (byStock !== 0) return byStock;
        return a.price - b.price;
      });
    }
    return arr;
  }, [filtered, sort]);

  return (
    <div className="grid gap-6">
      {/* ツールバー */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative w-full sm:max-w-md">
          <input
            type="search"
            placeholder="キーワード検索（例：ブロック、レール、テント など）"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 pr-10 text-sm shadow-sm focus:border-emerald-500 focus:outline-none"
          />
          <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" width="18" height="18" viewBox="0 0 24 24" aria-hidden>
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" />
          </svg>
        </label>

        <div className="flex flex-wrap gap-2">
          <select
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm"
          >
            <option value="">年齢：すべて</option>
            {AGE_OPTIONS.map((a) => <option key={a} value={a}>{a}歳</option>)}
          </select>

          <select
            value={plan}
            onChange={(e) => setPlan(e.target.value as any)}
            className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm"
          >
            <option value="">対象コース：すべて</option>
            {PLAN_OPTIONS.map((p) => (
              <option key={p} value={p}>
                {PLAN_LABEL[p]}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as any)}
            className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm"
          >
            <option value="pop">おすすめ順</option>
            <option value="price-asc">価格の安い順</option>
            <option value="price-desc">価格の高い順</option>
          </select>
        </div>
      </div>

      {/* グリッド */}
      {sorted.length === 0 ? (
        <p className="text-sm text-zinc-500">該当するアイテムが見つかりませんでした。</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((it) => (
            <article key={it.id} className="rounded-2xl border border-zinc-200 bg-white shadow-sm hover:shadow-md transition">
              <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl">
                <Image src={it.thumb} alt={it.title} fill className="object-cover" />
              </div>
              <div className="p-5">

                <p className="mt-1 text-sm text-zinc-600 line-clamp-2">
                  {it.short || ""}
                </p>

                {/* 対象コースバッジ */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {it.plans.map((p) => (
                    <span key={p} className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-emerald-100">
                      {PLAN_LABEL[p]}
                    </span>
                  ))}
                </div>

              </div>
            </article>
          ))}
        </div>
      )}

      {/* 注記 */}
      <p className="mt-6 text-center text-xs text-zinc-500">
        掲載価格は<strong>ご利用日と前後1〜2日（おおよそ4日間）</strong>を想定した料金です。長期ご利用は
        <Link href="/contact" className="text-emerald-700 underline underline-offset-2">お見積りフォーム</Link>からご相談ください。
      </p>
    </div>
  );
}
