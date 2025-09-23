"use client";

import Link from "next/link";
import { useMemo } from "react";
import PromoForPhotos from "./PromoForPhotos";

type Plan = {
  id: "simple" | "regular" | "luxury";
  name: string;
  price: number; // 税込想定
  headline: string; // 一言キャッチ
  includes: string[]; // 内容物
  scenes: string[];   // おすすめ用途
  logistics: {
    boxes: number; // 発送箱数
    note?: string; // 例：160サイズ相当 など
  };
  addons?: { label: string; note?: string }[];
  highlight?: "most" | "new"; // バッジ
};

const PLANS: Plan[] = [
  {
    id: "simple",
    name: "シンプルコース",
    price: 19800, // 送料込み
    headline: "マットだけでまずは安全・清潔に",
    includes: ["大判ジョイントマット一式 25枚 (280cm×280cm)", "設置ガイド", "事前チェックリスト"],
    scenes: ["結婚式の控室／待合い", "短時間イベント", "省スペースで最低限の安心を確保"],
    logistics: { boxes: 1, note: "160サイズ相当（送料込み）" },
  },
  {
    id: "regular",
    name: "レギュラーコース",
    price: 39800, // 送料込み
    headline: "一番選ばれる標準セット",
    includes: [
      "大判ジョイントマット一式 25枚 (280cm×280cm)",
      "おもちゃ約20点（年齢バランス選定）",
      "設置ガイド／片付けチェックリスト",
    ],
    scenes: ["披露宴のファミリーテーブル横", "社内イベント", "待ち時間が長めの会場"],
    logistics: { boxes: 2, note: "マット＋おもちゃ（送料込み）" },
    highlight: "most",
  },
  {
    id: "luxury",
    name: "ラグジュアリーコース",
    price: 69800, // 送料込み
    headline: "映える演出で会場の一角をプレイゾーンに",
    includes: [
      "大判ジョイントマット一式 64枚 (500cm×500cm)",
      "おもちゃ約20点",
      "テント／ビッグクッション等の空間演出アイテム",
      "設置ガイド／片付けチェックリスト",
    ],
    scenes: ["高級感ある結婚式", "法人レセプション", "フォトスポット化したいイベント"],
    logistics: { boxes: 4, note: "大型アイテム同梱（送料込み）" },
    // addons: [{ label: "名札・注意喚起サイン一式", note: "設置用スタンド付き" }],
  },
];


function yen(n: number) {
  return n.toLocaleString("ja-JP");
}

export default function Plans() {
  const sorted = useMemo(
    () =>
      [...PLANS].sort((a, b) => {
        // 「人気No.1」が中央に来やすい並び（simple -> regular -> luxury）
        const order = { simple: 0, regular: 1, luxury: 2 } as const;
        return order[a.id] - order[b.id];
      }),
    []
  );

  return (
    <section id="plans" aria-labelledby="plans-heading" className="py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="plans-heading" className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            料金プラン
          </h2>
          <p className="mt-3 text-zinc-600">
            すべて<strong>消毒・検品済み</strong>。設置ガイド同梱で初めてでも安心です。
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {sorted.map((p) => (
            <article
              key={p.id}
              className={`relative rounded-2xl border bg-white shadow-sm transition hover:shadow-md ${
                p.highlight === "most" ? "border-emerald-300" : "border-zinc-200"
              }`}
            >
              {p.highlight && (
                <div className="absolute -top-3 left-4 inline-flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white shadow">
                  {p.highlight === "most" ? "人気No.1" : "NEW"}
                </div>
              )}

              <div className="p-6">
                <h3 className="text-lg font-semibold text-zinc-900">{p.name}</h3>
                <p className="mt-1 text-sm text-zinc-600">{p.headline}</p>

                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-3xl font-bold tracking-tight text-zinc-900">¥{yen(p.price)}</span>
                  <span className="text-xs text-zinc-500">（税込）/ 1イベント</span>
                </div>

                {/* 内容物 */}
                <details className="group mt-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-800 hover:bg-zinc-50">
                    <span className="font-medium">セット内容</span>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      className="transition-transform group-open:rotate-180"
                      aria-hidden="true"
                    >
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                  </summary>
                  <ul className="mt-3 grid gap-2 pl-4 text-sm text-zinc-700">
                    {p.includes.map((it, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-[6px] inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </details>

                {/* おすすめ用途 */}
                <details className="group mt-3">
                  <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-800 hover:bg-zinc-50">
                    <span className="font-medium">おすすめの使いどころ</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" className="transition-transform group-open:rotate-180">
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                  </summary>
                  <ul className="mt-3 grid gap-2 pl-4 text-sm text-zinc-700">
                    {p.scenes.map((it, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-[6px] inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </details>

                {/* 物流情報 */}
                <div className="mt-4 rounded-lg border border-zinc-200 bg-zinc-50/60 p-3">
                  <dl className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <dt className="text-zinc-500">発送箱数</dt>
                      <dd className="font-medium text-zinc-800">{p.logistics.boxes}箱</dd>
                    </div>
                    <div>
                      <dt className="text-zinc-500">目安サイズ</dt>
                      <dd className="font-medium text-zinc-800">{p.logistics.note ?? "—"}</dd>
                    </div>
                  </dl>
                  <p className="mt-2 text-[12px] text-zinc-500">
                    ※ 往復送料は地域・箱数で変動します。お見積り時に自動計算します。
                  </p>
                </div>

                {/* 追加オプション */}
                {p.addons && p.addons.length > 0 && (
                  <details className="group mt-3">
                    <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-800 hover:bg-zinc-50">
                      <span className="font-medium">追加オプション</span>
                      <svg width="18" height="18" viewBox="0 0 24 24" className="transition-transform group-open:rotate-180">
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" />
                      </svg>
                    </summary>
                    <ul className="mt-3 grid gap-2 pl-4 text-sm text-zinc-700">
                      {p.addons.map((a, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-[6px] inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          <span>
                            {a.label}
                            {a.note ? <span className="text-zinc-500">（{a.note}）</span> : null}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </details>
                )}

                {/* CTA */}
                <div className="mt-6 grid gap-2">
                <Link
                    href={`/contact?plan=${p.id}`}
                    className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/50"
                    aria-label={`${p.name}の見積り・空き確認`}
                >
                    見積り・空き確認
                </Link>
                <Link
                    href="#faq"
                    className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-800 hover:bg-zinc-50"
                >
                    よくある質問へ
                </Link>
                <Link
                    href="/rentals"
                    className="inline-flex items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-700 hover:bg-emerald-100"
                >
                    レンタル内容の詳細を見る →
                </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-zinc-500">
            表示価格は<strong>往復送料込み</strong>・税込。離島・一部地域は追加料金が発生する場合があります。
        </p>
        <p className="mt-6 text-center text-xs text-zinc-500">
            掲載している金額は、<strong>ご利用日と前後1〜2日（おおよそ4日間）</strong>を想定した料金です。期間がそれ以上となる場合は、<strong>お見積もりフォーム</strong>よりお問い合わせください。
        </p>

         <PromoForPhotos />

      </div>
    </section>
  );
}
