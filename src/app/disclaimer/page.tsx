import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function DisclaimerPage() {
  return (
    <>
    <Header/>
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-zinc-900">免責事項</h1>
      <p className="mt-6 text-sm text-zinc-700 leading-relaxed">
        ポケットラウンジ（以下「当サービス」）のウェブサイトをご利用いただくにあたり、
        以下の免責事項をご確認ください。
      </p>

      <h2 className="mt-8 font-semibold text-zinc-900">1. 情報の正確性について</h2>
      <p className="mt-2 text-sm text-zinc-700">
        当サービスのウェブサイトに掲載する情報については、正確性や最新性の確保に努めていますが、
        その内容の正確性・完全性を保証するものではありません。
        利用により生じたいかなる損害についても責任を負いかねます。
      </p>

      <h2 className="mt-8 font-semibold text-zinc-900">2. サービスの変更・停止</h2>
      <p className="mt-2 text-sm text-zinc-700">
        当サービスは、事前の予告なくウェブサイトの内容を変更、またはサービスの提供を中断・停止する場合があります。
        これにより生じたいかなる損害についても責任を負いません。
      </p>

      <h2 className="mt-8 font-semibold text-zinc-900">3. 外部リンクについて</h2>
      <p className="mt-2 text-sm text-zinc-700">
        当サービスのウェブサイトからリンクされている外部サイトの内容について、
        その正確性や合法性を保証するものではありません。
        外部サイトの利用により生じたいかなる損害についても責任を負いません。
      </p>

      <h2 className="mt-8 font-semibold text-zinc-900">4. レンタル利用について</h2>
      <p className="mt-2 text-sm text-zinc-700">
        当サービスのレンタル品は消毒・検品を行っておりますが、
        利用中の事故・ケガ・トラブル等については責任を負いかねます。
        保護者および管理者の責任において安全にご利用ください。
      </p>

      <h2 className="mt-8 font-semibold text-zinc-900">5. 適用範囲</h2>
      <p className="mt-2 text-sm text-zinc-700">
        本免責事項は、当サービスのウェブサイト及び提供サービス全般に適用されます。
      </p>

      <p className="mt-10 text-sm text-zinc-500">
        制定日: {new Date().toLocaleDateString("ja-JP")}
      </p>
    </main>
    <Footer/>
    </>
  );
}
