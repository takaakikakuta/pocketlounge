import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pocket-lounge.jp"), // ← あなたの本番ドメインに変更
  title: "結婚式・法人イベント向けキッズスペースレンタル｜ポケットラウンジ",
  description: "結婚式や法人イベントに最適なキッズスペースをレンタルできます。清潔なマットと安心のおもちゃを全国配送。お子さま連れゲストも安心して過ごせます。",
  keywords: ["結婚式 キッズスペース", "キッズスペース レンタル", "イベント 子供 スペース", "法人イベント キッズコーナー"],
  openGraph: {
    title: "結婚式・法人イベント向けキッズスペースレンタル｜ポケットラウンジ",
    description: "結婚式や法人イベントでお子さまが安心して遊べるキッズスペースを全国にお届けします。",
    url: "https://pocket-lounge.jp",
    siteName: "ポケットラウンジ",
    images: [
      {
        url: "/ogp.jpg", // 1200x630 のOGP画像を `public/` に入れる
        width: 1200,
        height: 630,
        alt: "ポケットラウンジ キッズスペースレンタル",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
