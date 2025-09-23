"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      aria-label="Pocket Park ヒーロー"
    >
      {/* 背景グラデ＋装飾 */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-50 via-white to-white" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-1/2 h-[480px] w-[960px] translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(16,185,129,0.22) 0%, rgba(16,185,129,0) 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 pt-16 lg:grid-cols-2">
          {/* 左カラム：コピー */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-medium text-emerald-700 shadow-sm">
              👶 キッズスペースレンタル
              <span className="h-1 w-1 rounded-full bg-emerald-400" />
              結婚式・法人イベントに
            </span>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl">
              必要なときだけ、<br className="hidden sm:block" />
              清潔・安全な<span className="text-emerald-600">キッズスペース</span>を。
            </h1>

            <p className="mt-4 max-w-xl text-zinc-600">
              大判ジョイントマットと厳選おもちゃで、
              会場の一角を“安心して遊べる空間”に。設置ガイド付きでカンタン、片付けもラク。
            </p>

            {/* 価格チップ */}
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm text-zinc-700 shadow-sm ring-1 ring-zinc-200">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                シンプル 19,800円
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm text-zinc-700 shadow-sm ring-1 ring-zinc-200">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                レギュラー 39,800円
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm text-zinc-700 shadow-sm ring-1 ring-zinc-200">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                ラグジュアリー 69,800円
              </span>
            </div>

            {/* CTA */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/50"
              >
                見積り・空き確認
              </Link>
              <Link
                href="#plans"
                className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-800 shadow-sm hover:bg-zinc-50"
              >
                プランを見る
              </Link>
            </div>

            {/* 信頼バッジ */}
            <ul className="mt-6 grid gap-3 text-sm text-zinc-600 sm:grid-cols-3">
              <li className="inline-flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M4 12l5 5L20 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                マット&おもちゃは消毒済み
              </li>
              <li className="inline-flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M4 12l5 5L20 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                設置ガイド付きで簡単
              </li>
              <li className="inline-flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M4 12l5 5L20 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                事前チェックリストで安心
              </li>
            </ul>
          </div>

          {/* 右カラム：プレビュー枠（差し替え想定） */}
          <div className="relative">
            <div className="relative mx-auto w-full max-w-[560px] overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
              {/* ここはお好みで実写写真やイラストに差し替え */}
              <div className="aspect-video relative">
                <Image
                  src="https://pocketpark.s3.ap-northeast-1.amazonaws.com/2cbbbc91-86ba-434e-aec8-5c04976092e7.png" // 画像が無ければ仮のグラフィックに
                  alt="キッズスペースのイメージ"
                  fill
                  className="object-cover"
                  priority
                />
               
              </div>

              {/* 下部の補助帯 */}
              <div className="flex items-center justify-between border-t border-zinc-100 p-3">
                <div className="text-xs text-zinc-600">
                  セット内容例：大判マット＋おもちゃ（20点前後）
                </div>
                <Link
                  href="#cases"
                  className="text-xs font-medium text-emerald-700 hover:underline"
                >
                  事例を見る →
                </Link>
              </div>
            </div>

            {/* 浮遊カード（強み訴求） */}
            <div className="pointer-events-none absolute -bottom-6 left-6 hidden rounded-xl bg-white/90 p-3 shadow-lg ring-1 ring-zinc-200/80 md:block">
              <p className="text-[11px] text-zinc-700">
                施設を傷つけにくい<span className="font-medium">大判マット</span>で
                レイアウトも安定
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 下端の柔らかい波 */}
      <svg
        className="pointer-events-none block w-full text-emerald-50"
        viewBox="0 0 1440 70"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M0,32 C120,56 360,64 720,48 C1080,32 1320,16 1440,24 L1440,70 L0,70 Z" />
      </svg>
    </section>
  );
}
