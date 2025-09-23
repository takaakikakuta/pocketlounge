"use client";

import Image from "next/image";
import Link from "next/link";

const NAV = [
  { label: "特長", href: "#features" },
  { label: "料金プラン", href: "#plans" },
  { label: "ご利用の流れ", href: "#flow" },
  { label: "事例", href: "#cases" },
  { label: "よくある質問", href: "#faq" },
  { label: "お問い合わせ", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* 左：ブランド */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <div className="h-14 w-14 rounded-xl grid place-items-center overflow-hidden">
                <Image
                  src="https://pocketpark.s3.ap-northeast-1.amazonaws.com/logo.png" // public 配下に配置したファイル
                  alt="ポケットラウンジ ロゴ"
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-zinc-900">ポケットラウンジ</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-zinc-600">
              結婚式・法人イベント向けのキッズスペースレンタル。
              安心・清潔なマットとおもちゃを全国へお届けします。
            </p>
          </div>

          {/* 中央：ナビ */}
          <nav className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:col-span-1">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="text-sm text-zinc-700 hover:text-zinc-900"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          {/* 右：連絡先 */}
          <div className="space-y-2 text-sm text-zinc-700">
            <p className="font-semibold text-zinc-900">お問い合わせ</p>
            {/* <p>
              電話:{" "}
              <a
                href="tel:0000000000"
                className="font-medium text-emerald-700 hover:underline"
              >
                00-0000-0000
              </a>{" "}
              （受付 10:00-18:00）
            </p> */}
            <p>
              メール:{" "}
              <a
                href="mailto:info@pocketpark.jp"
                className="font-medium text-emerald-700 hover:underline"
              >
                pocketlounge2025@gmail.com
              </a>
            </p>
            <p>所在地: 長野県上田市常磐城５丁目</p>
          </div>
        </div>

        {/* コピーライト */}
        <div className="mt-10 border-t border-zinc-100 pt-6 text-center text-xs text-zinc-500">
          © {new Date().getFullYear()} Pocket Park. All rights reserved.
        </div>
        <p className="space-x-5">
            <Link
                href="/privacy"
                className="text-zinc-500 hover:text-emerald-700 underline"
            >
                プライバシーポリシー
            </Link>
            <Link
              href="/disclaimer"
              className="text-zinc-500 hover:text-emerald-700 underline"
            >
              免責事項
            </Link>
        </p>
      </div>
    </footer>
  );
}
