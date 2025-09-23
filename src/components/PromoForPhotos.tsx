"use client";

import Link from "next/link";
import { useState } from "react";

export default function PromoForPhotos() {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <section
      aria-label="写真提供で割引のご案内"
      className="mt-10 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 sm:p-6"
    >
      <div className="flex items-start gap-4">
        <div className="shrink-0 h-9 w-9 grid place-items-center rounded-xl bg-emerald-600 text-white font-bold">
          ¥
        </div>
        <div className="grow">
          <h3 className="text-lg font-semibold text-emerald-900">
            写真提供で <span className="underline underline-offset-2">5,000円割引</span>
          </h3>
          <p className="mt-1 text-sm text-emerald-900/90">
            ご利用時の様子を撮影した写真を「使用例」として当サイト・SNSで掲載OKの場合、
            次回または今回請求で <strong>5,000円引き</strong>いたします。
          </p>

          <ul className="mt-3 grid gap-2 text-sm text-emerald-900/90">
            <li>・人物が映り込んでも、当方で <strong>ぼかし等のプライバシー保護</strong>を行います。</li>
            <li>・簡単な <strong>ご感想（20〜60字程度）</strong>のご提供をお願いします。</li>
            <li>・掲載範囲：当サイト、SNS、提案資料等（営利目的の転売はしません）。</li>
            <li>・提出期限：<strong>ご利用後2週間以内</strong>を目安にデータ送付（横<span className="tabular-nums">16:9</span>推奨 / 高解像度）。</li>
          </ul>

          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/contact?promo=photo5000"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              割引で見積り・空き確認する
            </Link>
            <button
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center rounded-xl border border-emerald-200 bg-white px-3 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-50"
            >
              閉じる
            </button>
          </div>

          <p className="mt-3 text-xs text-emerald-900/70">
            ※ 著作権は撮影者に帰属し、当方は掲載のための非独占的利用許諾（期間・媒体の制限なし）を頂きます。
            個人が特定される情報は掲載しません。詳細は
            <Link href="/privacy" className="text-emerald-700 underline underline-offset-2">プライバシーポリシー</Link>
            と
            <Link href="/disclaimer" className="text-emerald-700 underline underline-offset-2">免責事項</Link>
            をご確認ください。
          </p>
        </div>
      </div>
    </section>
  );
}
