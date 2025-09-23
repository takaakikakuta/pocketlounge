// components/Flow.tsx
import { CheckCircle2 } from "lucide-react";

const STEPS = [
  {
    n: 1,
    title: "お問い合わせ・ご相談",
    desc: "まずはフォームからお気軽にご連絡ください。受け取り希望日や配送先などが決まっていれば入力をお願いします。ご希望にそっておもちゃを選定し、リストをお送りします。",
  },
  {
    n: 2,
    title: "おもちゃリスト確認・ご入金",
    desc: "内容をご確認いただき、問題なければ前金にてご入金をお願いします。ご入金確認後、正式に申込完了となり、発送準備を開始します。（原則、事前の銀行振込）",
  },
  {
    n: 3,
    title: "発送前の最終確認",
    desc: `発送にあたり、以下①〜④の情報を確認させていただきます。
① 到着希望日と時間帯（到着日は前日または前々日でお願いしています）
② お届け先の住所と名称
③ 荷物を受け取り管理される方のお名前（会場担当の方など）
④ 配送会社とやり取りできる連絡先番号`,
    note: "最終的な確認メールとヤマト便の追跡番号をお送りします（場所によっては直接お届けする場合もあります）。",
  },
  {
    n: 4,
    title: "当日ご利用",
    desc: "ご指定いただいた会場で安全にお使いください。",
  },
  {
    n: 5,
    title: "返却",
    desc: "レンタル終了後、同封のヤマト着払い伝票に記入し返送してください（ガムテープ等はご用意ください）。",
  },
];

export default function Flow() {
  return (
    <section id="flow" className="pt-8 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-medium text-emerald-700 shadow-sm">
            ご利用の流れ
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            安心してご利用いただくためのステップ
          </h2>
        </header>

        <ol className="mt-10 space-y-8">
          {STEPS.map((s) => (
            <li key={s.n} className="relative rounded-2xl border border-zinc-200 bg-zinc-50/60 p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-emerald-600 text-white font-bold">
                  {s.n}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900">{s.title}</h3>
                  <p className="mt-2 text-sm text-zinc-700 whitespace-pre-line">{s.desc}</p>
                  {s.note && (
                    <p className="mt-2 text-xs text-zinc-500">{s.note}</p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
