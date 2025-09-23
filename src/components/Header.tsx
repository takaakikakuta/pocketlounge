// /components/Header.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type NavItem =
  | { label: string; href: `#${string}` }     // 同一ページ内スクロール
  | { label: string; href: `/${string}` | "/"}; // 通常のパス遷移

const NAV: NavItem[] = [
  { label: "特長", href: "#features" },
  { label: "料金プラン", href: "#plans" },
  { label: "ご利用の流れ", href: "#flow" },
  { label: "事例", href: "#cases" },
  { label: "よくある質問", href: "#faq" },
  // 追加：別ページ
  { label: "お役立ち情報", href: "/guides" },
];

export default function Header() {
  const pathname = usePathname(); // "/", "/contact", "/guides" など
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [elevated, setElevated] = useState(false);

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 2);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToHash(hash: `#${string}`) {
    const id = hash.slice(1);
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function onNavClick(item: NavItem) {
    if (item.href.startsWith("#")) {
      // 同一ページ内 or 他ページ
      if (pathname === "/") {
        scrollToHash(item.href as `#${string}`);
      } else {
        router.push("/" + item.href); // "/#features" など
      }
      setOpen(false);
      return;
    }
    // 通常ページ遷移
    router.push(item.href);
    setOpen(false);
  }

  const isActive = (item: NavItem) => {
    if (!item.href.startsWith("#")) {
      // パス用のアクティブ判定
      return pathname === item.href;
    }
    // ハッシュは常にトップ扱いなので "/" のときだけ強調（任意）
    return pathname === "/" ? false : false;
  };

  return (
    <header className={`sticky top-0 z-50 transition-shadow ${elevated ? "shadow-sm" : ""}`}>
      <div className="supports-[backdrop-filter]:backdrop-blur bg-zinc-100/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2" aria-label="ポケットラウンジ ホームへ">
              <div className="h-14 w-14 rounded-xl grid place-items-center overflow-hidden">
                <Image
                  src="https://pocketpark.s3.ap-northeast-1.amazonaws.com/logo.png" // public 配下に配置したファイル
                  alt="ポケットラウンジ ロゴ"
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>
              <div className="leading-tight">
                <div className="font-bold tracking-tight text-zinc-900">ポケットラウンジ</div>
                <div className="text-xs text-zinc-500">Kids Space Rental</div>
              </div>
            </Link>

            {/* PCナビ */}
            <nav className="hidden md:flex items-center gap-6">
              {NAV.map((n) => (
                <button
                  key={n.label}
                  onClick={() => onNavClick(n)}
                  className={`text-sm transition-colors ${
                    isActive(n) ? "text-emerald-700 font-semibold" : "text-zinc-700 hover:text-zinc-900"
                  }`}
                >
                  {n.label}
                </button>
              ))}
            </nav>

            {/* 右サイドCTA（PC） */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-xl border border-emerald-600 bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                見積り・空き確認
              </Link>
            </div>

            {/* モバイルメニュー ボタン */}
            <button
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 text-zinc-800"
              onClick={() => setOpen(true)}
              aria-label="メニューを開く"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* モバイルドロワー */}
      <div className={`md:hidden fixed inset-0 z-50 transition ${open ? "pointer-events-auto" : "pointer-events-none"}`} aria-hidden={!open}>
        <div className={`absolute inset-0 bg-black/30 transition-opacity ${open ? "opacity-100" : "opacity-0"}`} onClick={() => setOpen(false)} />
        <div className={`absolute right-0 top-0 h-full w-80 max-w-[85%] bg-white shadow-xl transition-transform duration-200 ${open ? "translate-x-0" : "translate-x-full"}`} role="dialog" aria-label="モバイルメニュー">
          <div className="flex items-center justify-between p-4 border-b border-zinc-100">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-emerald-500/90 grid place-items-center text-white font-bold">P</div>
              <div className="font-semibold">ポケットラウンジ</div>
            </div>
            <button onClick={() => setOpen(false)} className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200" aria-label="メニューを閉じる">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          <nav className="px-4 py-3 grid">
            {NAV.map((n) => (
              <button
                key={n.label}
                onClick={() => onNavClick(n)}
                className="rounded-lg px-3 py-3 text-left text-zinc-800 hover:bg-zinc-50"
              >
                {n.label}
              </button>
            ))}
            <Link
              href="/contact"
              className="mt-2 inline-flex items-center justify-center rounded-xl border border-emerald-600 bg-emerald-600 px-4 py-3 font-semibold text-white hover:bg-emerald-700"
              onClick={() => setOpen(false)}
            >
              見積り・空き確認
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
