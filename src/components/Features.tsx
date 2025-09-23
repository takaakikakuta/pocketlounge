// /components/Features.tsx
import Link from "next/link";

const FEATURES = [
  {
    title: "清潔・安全に配慮した備品",
    desc: "マット・おもちゃは都度消毒＆点検。年齢バランスを考えたセレクトで誤飲やケガのリスクにも配慮。",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "会場を傷つけにくい大判マット",
    desc: "60cm角の厚手マットで段差が出にくく安定。写真映えの良い落ち着いたカラーを採用。",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
        <path d="M3 7l9-4 9 4-9 4-9-4zM3 17l9 4 9-4M3 12l9 4 9-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "送料込みの総額表示",
    desc: "往復送料込み・税込のわかりやすい価格。離島・一部地域は追加の可能性あり。",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
        <path d="M12 1v22M5 6h8a4 4 0 010 8H7a4 4 0 000 8h10" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "設置ガイド＆チェックリスト同梱",
    desc: "初めてでも迷わない導線。配置例・注意喚起サイン・片付けチェックまでA4で完結。",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
        <path d="M9 11l3 3L22 4M21 14v4a2 2 0 01-2 2H7l-4-4V5a2 2 0 012-2h8" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "映える空間演出（上位プラン）",
    desc: "テントやビッグクッションで“フォトスポット化”。披露宴・レセプションの満足度UP。",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
        <path d="M3 20l9-16 9 16H3zM9 20l3-5 3 5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "スムーズなやり取り",
    desc: "空き確認→見積り→発送手配までオンラインで完結。急ぎのときは電話もOK。",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
        <path d="M22 16.92V21a2 2 0 01-2.18 2A19.79 19.79 0 013 5.18 2 2 0 015 3h4.09a2 2 0 012 1.72l.45 3a2 2 0 01-.57 1.73l-1.27 1.27a16 16 0 007.27 7.27l1.27-1.27A2 2 0 0116.28 14l3 .45a2 2 0 011.72 2.47z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const FLOW = [
  { n: 1, t: "空き確認・お見積り", d: "日程・会場規模・人数目安を入力。総額をその場で提示。"},
  { n: 2, t: "お申し込み・お支払い", d: "オンライン決済／請求書払いに対応。法人名義OK。"},
  { n: 3, t: "お届け・設置", d: "前日または当日午前に到着。設置ガイド＆サイン同梱。"},
  { n: 4, t: "返送", d: "同梱の返送伝票で集荷依頼。片付けチェック付き。"},
];

export default function Features() {
  return (
    <section id="features" className="relative py-16">
      {/* 背景の柔らかグラデ */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-emerald-50/60 to-white" aria-hidden />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 見出し */}
        <header className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-medium text-emerald-700 shadow-sm">
            ポケットパークの特長
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            必要なときだけ、清潔・安全な<span className="text-emerald-600">キッズスペース</span>を
          </h2>
          <p className="mt-3 text-zinc-600">
            送料込み・税込の総額表示。消毒済みの大判マットと厳選おもちゃで、会場の一角を“安心して遊べる空間”に。
          </p>
        </header>

        {/* 特長グリッド */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <div key={i} className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
                  {f.icon}
                </div>
                <h3 className="text-base font-semibold text-zinc-900">{f.title}</h3>
              </div>
              <p className="mt-3 text-sm text-zinc-600">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Before / After（任意の訴求） */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-zinc-200 bg-white p-5">
            <h3 className="font-medium text-zinc-900">Before（未導入）</h3>
            <ul className="mt-2 space-y-1 text-sm text-zinc-600">
              <li>・子どもの待ち時間が長く、保護者がそわそわ</li>
              <li>・床が硬く、転倒時の不安</li>
              <li>・持ち寄りおもちゃの衛生状態が不明</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-5">
            <h3 className="font-medium text-zinc-900">After（導入後）</h3>
            <ul className="mt-2 space-y-1 text-sm text-zinc-700">
              <li>・安全な遊び場で子どもも保護者も安心</li>
              <li>・写真映えするスペースでイベント満足度UP</li>
              <li>・消毒済み備品で衛生面の説明がしやすい</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
