"use client";

import { useMemo, useState } from "react";

type FaqItem = {
  q: string;
  a: string;
  cat: "料金" | "配送" | "衛生/安全" | "利用方法" | "支払い/請求" | "その他";
  id: string; // アンカー用
};

const FAQS: FaqItem[] = [
  {
    id: "price-includes-shipping",
    cat: "料金",
    q: "表示価格は送料込みですか？",
    a: "はい。基本エリアは往復送料込み・税込の総額表示です。北海道・沖縄・離島など一部地域は追加料金が発生する場合があります（お見積り時にご案内します）。",
  },
  {
    id: "which-plan-choose",
    cat: "料金",
    q: "どのプランを選べばよいか迷っています。",
    a: "迷ったらレギュラーコース（マット＋おもちゃ20点）がおすすめです。子どもの人数が多い／写真映え重視ならラグジュアリー、短時間・省スペースなら簡単コースが適しています。",
  },
  {
    id: "delivery-date",
    cat: "配送",
    q: "いつ届きますか？当日朝着は可能ですか？",
    a: "通常は前日着、もしくは当日午前着で手配します。地域や配送状況により最適なお届け日時をご提案します。お急ぎの場合は事前にご相談ください。",
  },
  {
    id: "box-count",
    cat: "配送",
    q: "箱はいくつ届きますか？返送はどうすればいいですか？",
    a: "簡単コースは1箱、レギュラー/ラグジュアリーは原則2箱です（在庫状況で前後する場合あり）。返送は同梱の伝票で集荷をご依頼ください。設置・片付けガイドを同梱します。",
  },
  {
    id: "sanitization",
    cat: "衛生/安全",
    q: "衛生管理はどのように行っていますか？",
    a: "マット・おもちゃは都度消毒・検品を実施しています。小さな部品は対象年齢に応じてセレクトし、誤飲リスクに配慮しています。",
  },
  {
    id: "floor-protection",
    cat: "衛生/安全",
    q: "会場の床を傷つけませんか？",
    a: "大判ジョイントマット（厚手）を採用しており、クッション性と安定性を確保しています。床材が特殊な場合は事前にお知らせください。",
  },
  {
    id: "setup",
    cat: "利用方法",
    q: "設置や片付けは難しくありませんか？必要な備品は？",
    a: "A4サイズの設置・片付けガイド、注意喚起サインを同梱します。テープ類など会場の指示に従う必要がある場合は、事前に確認のうえご用意ください。",
  },
  {
    id: "age-range",
    cat: "利用方法",
    q: "対象年齢の目安は？",
    a: "未就学児〜小学校低学年を想定しています。年齢に応じておもちゃのセレクトを調整しますので、見積り時に年齢層をご記入ください。",
  },
  {
    id: "damage",
    cat: "利用方法",
    q: "汚損・破損があった場合は？",
    a: "通常使用の範囲での軽微な汚れは問題ありません。明らかな破損・紛失がある場合は実費をお願いすることがあります（事前にガイド内で基準を明示）。",
  },
  {
    id: "payment",
    cat: "支払い/請求",
    q: "支払い方法は？領収書や請求書は発行できますか？",
    a: "銀行振込に対応。領収書の発行、請求書払いにも対応可能です（与信・期日応相談）。",
  },
  {
    id: "cancel",
    cat: "その他",
    q: "キャンセル規定を教えてください。",
    a: "お申し込み確定後のキャンセルは所定のキャンセル料が発生します。天候や不可抗力の場合は個別にご相談ください。詳細はお見積り時にご案内します。",
  },
];

const CATS: FaqItem["cat"][] = [
  "料金",
  "配送",
  "衛生/安全",
  "利用方法",
  "支払い/請求",
  "その他",
];

export default function FAQ() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<null | FaqItem["cat"]>(null);
  const [openAll, setOpenAll] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FAQS.filter((f) => {
      const inCat = activeCat ? f.cat === activeCat : true;
      const inText =
        !q ||
        f.q.toLowerCase().includes(q) ||
        f.a.toLowerCase().includes(q);
      return inCat && inText;
    });
  }, [query, activeCat]);

  // JSON-LD（構造化データ）
  const jsonLd = useMemo(() => {
    const list = filtered.slice(0, 12); // 長すぎ防止
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": list.map((f) => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a },
      })),
    };
  }, [filtered]);

  return (
    <section id="faq" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ヘッダー */}
        <header className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-medium text-emerald-700 shadow-sm">
            よくある質問
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            送料込みの総額表示や衛生管理など、よくいただく質問をまとめました
          </h2>
          <p className="mt-3 text-zinc-600">
            解決しない場合は、ページ下部の「見積り・空き確認」からお気軽にお問い合わせください。
          </p>
        </header>

        {/* ツールバー */}
        <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* 検索 */}
          <label className="relative w-full sm:max-w-md">
            <input
              type="search"
              placeholder="キーワードで検索（例：送料、衛生、到着 など）"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 pr-10 text-sm shadow-sm focus:border-emerald-500 focus:outline-none"
              aria-label="FAQ検索"
            />
            <svg
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" />
            </svg>
          </label>

          {/* カテゴリ */}
          <div className="flex flex-wrap gap-2">
            <button
              className={`rounded-full px-3 py-1 text-sm ring-1 ${
                activeCat === null
                  ? "bg-emerald-600 text-white ring-emerald-600"
                  : "bg-white text-zinc-800 ring-zinc-200"
              }`}
              onClick={() => setActiveCat(null)}
            >
              すべて
            </button>
            {CATS.map((c) => (
              <button
                key={c}
                className={`rounded-full px-3 py-1 text-sm ring-1 ${
                  activeCat === c
                    ? "bg-emerald-600 text-white ring-emerald-600"
                    : "bg-white text-zinc-800 ring-zinc-200"
                }`}
                onClick={() => setActiveCat(c)}
              >
                {c}
              </button>
            ))}
          </div>

          {/* 全展開/全閉じ */}
          <div className="flex gap-2">
            <button
              className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800 hover:bg-zinc-50"
              onClick={() => setOpenAll(true)}
            >
              すべて展開
            </button>
            <button
              className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800 hover:bg-zinc-50"
              onClick={() => setOpenAll(false)}
            >
              すべて閉じる
            </button>
          </div>
        </div>

        {/* リスト */}
        <div className="mt-8 grid gap-3">
          {filtered.length === 0 ? (
            <p className="text-sm text-zinc-500">該当する質問が見つかりませんでした。</p>
          ) : null}

          {filtered.map((f) => (
            <details
              key={f.id}
              id={f.id}
              open={openAll}
              className="group rounded-2xl border border-zinc-200 bg-white p-0 shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-start gap-3 px-4 py-3">
                <div className="grid h-7 w-7 flex-none place-items-center rounded-lg bg-emerald-50 text-emerald-700">
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-zinc-900">{f.q}</div>
                  <div className="mt-1 hidden text-xs text-emerald-700 sm:inline">{f.cat}</div>
                </div>
                <svg
                  className="mt-1 h-5 w-5 flex-none text-zinc-500 transition-transform group-open:rotate-180"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </summary>
              <div className="border-t border-zinc-100 px-4 py-3 text-sm text-zinc-700">
                {f.a}
              </div>
            </details>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
          >
            見積り・空き確認
          </a>
          <a
            href="#plans"
            className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-800 hover:bg-zinc-50"
          >
            料金プランを見る
          </a>
        </div>
      </div>

      {/* 構造化データ（FAQPage） */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
