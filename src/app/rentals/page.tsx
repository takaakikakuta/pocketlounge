import ToysList, { ToyItem } from "@/components/ToysList";
import Image from "next/image";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata = {
  title: "レンタル一覧 | ポケットパーク",
  description: "大判ジョイントマットのサイズ感の目安と、おもちゃのレンタル一覧（対象コース表示・絞り込み対応）。",
};

// 例: おもちゃのダミーデータ
const TOYS: ToyItem[] = [
  {
    id: "blocks-giant",
    title: "ビッグブロックセット",
    thumb: "https://pocketpark.s3.ap-northeast-1.amazonaws.com/items/item1.jpg",
    price: 4800,
    categories: ["創作", "大型"],
    ages: ["3-6", "4-7"],
    stock: "in",
    short: "大きめパーツで安全。写真映えも◎",
    plans: ["regular", "luxury"], // ← 両方対象
  },
  {
    id: "rail-basic",
    title: "レールトイ基本セット",
    thumb: "/rentals/toys/rail-basic.jpg",
    price: 3800,
    categories: ["乗り物"],
    ages: ["3-6"],
    stock: "low",
    short: "定番のレール遊び。整備済みで安心。",
    plans: ["regular"], // ← レギュラーのみ
  },
  {
    id: "tent-soft-zone",
    title: "ソフトテントミニ",
    thumb: "/rentals/toys/tent-mini.jpg",
    price: 5800,
    categories: ["演出", "ごっこ"],
    ages: ["2-5", "3-6"],
    stock: "in",
    short: "小型テントで秘密基地ゾーンを作れる。",
    plans: ["luxury"], // ← ラグジュアリーのみ
  },
  {
    id: "puzzle-floor",
    title: "ラージピースパズル",
    thumb: "/rentals/toys/puzzle-large.jpg",
    price: 2400,
    categories: ["創作"],
    ages: ["4-7"],
    stock: "in",
    short: "散らかりにくい大きめピース。",
    plans: ["regular", "luxury"],
  },
];

export default function RentalsPage() {
  // マットの寸法想定（60cm角）。畳は目安で 1畳 ≒ 1.62㎡ として計算
  const MAT_SIDE_M = 0.6;
  const TILE_AREA = MAT_SIDE_M * MAT_SIDE_M; // 0.36㎡
  const TATAMI_1 = 1.62; // 1畳の目安（地域差あり）
  const TATAMI_4 = TATAMI_1 * 4; // 6.48㎡
  const needTilesFor4Tatami = Math.ceil(TATAMI_4 / TILE_AREA); // ≒ 18枚

  return (
    <>
    <Header/>
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 sm:py-16">
      {/* 上部：マット説明 */}
      <section className="grid gap-6 rounded-2xl border border-zinc-200 bg-white p-5 sm:p-8 shadow-sm">
        <div className="grid items-start gap-6 lg:grid-cols-3">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl lg:col-span-1 border border-zinc-100">
            <Image
              src="/rentals/mat-hero.jpg" // ← public に画像を置いてね
              alt="大判ジョイントマットの設営イメージ"
              fill
              className="object-cover"
              priority
              />
          </div>

          <div className="lg:col-span-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
              大判ジョイントマットのサイズ感
            </h1>
            <p className="mt-3 text-zinc-700">
              標準では<strong>60cm角の大判ジョイントマット</strong>を採用しています。
              会場のレイアウトに合わせて枚数を調整でき、子どもが安心して過ごせるクッション性を確保します。
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-zinc-200 bg-zinc-50/60 p-4">
                <div className="text-sm text-zinc-500">マット1枚</div>
                <div className="mt-1 text-lg font-semibold text-zinc-900">60cm × 60cm</div>
                <div className="text-xs text-zinc-500 mt-1">面積 0.36㎡</div>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-zinc-50/60 p-4">
                <div className="text-sm text-zinc-500">1畳の目安</div>
                <div className="mt-1 text-lg font-semibold text-zinc-900">約 1.62㎡</div>
                <div className="text-xs text-zinc-500 mt-1">地域差あり（目安値）</div>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-zinc-50/60 p-4">
                <div className="text-sm text-zinc-500">4畳ぶんの必要枚数</div>
                <div className="mt-1 text-2xl font-bold text-emerald-700">{needTilesFor4Tatami}枚</div>
                <div className="text-xs text-zinc-500 mt-1">※ 60cm角使用時の目安</div>
              </div>
            </div>

            <p className="mt-3 text-xs text-zinc-500">
              ※ 畳のサイズは地域や会場により異なるため、上記はあくまで目安です。45cm角マット等に変更する場合は必要枚数が変わります。
            </p>
          </div>
        </div>
      </section>

      {/* おもちゃ一覧 */}
      <section className="mt-10">
        <header className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
            おもちゃレンタル一覧
          </h2>
          <p className="mt-3 text-zinc-600">
            各アイテムには対象コース（<strong>レギュラー／ラグジュアリー</strong>）を表示します。
            一覧から対象コースで絞り込みも可能です。
          </p>
        </header>

        <div className="mt-8">
          <ToysList items={TOYS} />
        </div>
      </section>
    </main>
    <Footer/>
    </>
  );
}
