import Image from "next/image";

type CaseItem = {
  title: string;
  desc: string;
  img: string;
  tags: string[];
};

const CASES: CaseItem[] = [
  {
    title: "結婚式のキッズスペース",
    desc: "披露宴会場の一角に設置。子どもたちが安心して遊べるスペースを用意でき、保護者もゆっくり式に参加できました。",
    img: "https://pocketpark.s3.ap-northeast-1.amazonaws.com/wedding.png",
    tags: ["結婚式", "レギュラーコース"],
  },
  {
    title: "法人イベントでの導入",
    desc: "来場者ファミリー向けにラグジュアリーコースを採用。テントを加えた“映える”空間で、満足度が向上しました。",
    img: "https://pocketpark.s3.ap-northeast-1.amazonaws.com/companyevent.png",
    tags: ["法人イベント", "ラグジュアリーコース"],
  },
  {
    title: "地域交流会",
    desc: "限られた予算で簡単コースを利用。大判マットだけでも十分に安心感があり、小規模イベントに最適でした。",
    img: "https://pocketpark.s3.ap-northeast-1.amazonaws.com/areaevent2.png",
    tags: ["地域イベント", "簡単コース"],
  },
];

export default function Cases() {
  return (
    <section id="cases" className="py-16 sm:py-24 bg-emerald-50/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 見出し */}
        <header className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-medium text-emerald-700 shadow-sm">
            導入事例
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            ご利用いただいた事例
          </h2>
          <p className="mt-3 text-zinc-600">
            結婚式から法人イベントまで、さまざまな場面で活用されています。
          </p>
        </header>

        {/* 事例カード */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CASES.map((c, i) => (
            <article
              key={i}
              className="rounded-2xl border border-zinc-200 bg-white shadow-sm hover:shadow-md transition"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-2xl">
                <Image
                  src={c.img}
                  alt={c.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-zinc-900">{c.title}</h3>
                <p className="mt-2 text-sm text-zinc-600">{c.desc}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {c.tags.map((t, j) => (
                    <span
                      key={j}
                      className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-emerald-100"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
