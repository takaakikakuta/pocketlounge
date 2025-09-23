import type { Metadata } from "next";
import Cases from "@/components/Cases";
import FAQ from "@/components/FAQ";
import Features from "@/components/Features";
import Flows from "@/components/Flows";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Plans from "@/components/Plans";
import Image from "next/image";
import FAQSchema from "@/components/FAQSchema";

export const metadata: Metadata = {
  metadataBase: new URL("https://pocket-lounge.jp"), // ←本番ドメインに差し替え
  title: "結婚式のキッズスペース｜レンタルで簡単・清潔・安全｜ポケットラウンジ",
  description:
    "結婚式や法人イベントで子ども連れゲストも安心。清潔な大判マットと厳選おもちゃ一式を全国へ直送。設置ガイド付きで簡単、安全にキッズスペースを用意できます。",
  alternates: { canonical: "/" },
  openGraph: {
    title: "結婚式のキッズスペース｜レンタルで簡単・清潔・安全",
    description:
      "会場に直送・簡単設置。清潔なマット＋おもちゃ一式で、子連れゲストが安心して過ごせる空間を。",
    url: "https://pocket-lounge.jp/",
    siteName: "ポケットラウンジ",
    images: [{ url: "/ogp.jpg", width: 1200, height: 630 }],
    locale: "ja_JP",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};


export default function Home() {
  return (
    <>
     {/* 視覚的にはHeroの見出しを使いつつ、SEO用のH1を明示 */}
      <h1 className="sr-only">
        結婚式・法人イベントのキッズスペース｜レンタルで簡単・清潔・安全｜ポケットラウンジ
      </h1>

     <Header/>
     <Hero/>
     <Plans/>
     <Features/>
     <Flows/>
     <Cases/>
     <FAQ/>
     <FAQSchema /> 
     <Footer/>

     {/* JSON-LD（構造化データ） */}
      <script
        type="application/ld+json"
        // Service + Organization を最小構成で
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "結婚式・イベント向けキッズスペースレンタル",
            serviceType: "Kids' play area rental for weddings and events",
            areaServed: "JP",
            provider: {
              "@type": "Organization",
              name: "ポケットラウンジ",
              url: "https://pocket-lounge.jp",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                email: "info@pocketpark.jp"
              }
            },
            offers: {
              "@type": "AggregateOffer",
              priceCurrency: "JPY",
              // ざっくり最小/最大の目安。Plansの価格に合わせる
              lowPrice: "19800",
              highPrice: "69800",
              availability: "https://schema.org/InStock"
            },
            url: "https://pocket-lounge.jp"
          }),
        }}
      />
      {/* FAQ構造化（FAQコンポーネントの内容に合わせて後で差し替え推奨） */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "結婚式当日のどのタイミングで設置しますか？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "前日到着〜当日朝に設置いただくケースが多いです。設置ガイド・片付けチェックリストを同梱しています。"
                }
              },
              {
                "@type": "Question",
                name: "衛生管理はどうしていますか？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "すべて消毒・検品済みのマットとおもちゃをお届けします。気になる点があれば事前にご相談ください。"
                }
              }
            ]
          }),
        }}
      />
    </>
  );
}
