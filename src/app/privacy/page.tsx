import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function PrivacyPage() {
  return (
    <>
    <Header/>
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-zinc-900">プライバシーポリシー</h1>
      <p className="mt-6 text-sm text-zinc-700 leading-relaxed">
        ポケットラウンジ（以下「当サービス」）は、ユーザーの個人情報を適切に取り扱うことを重要な責務と考え、
        以下の方針に基づきプライバシーの保護に努めます。
      </p>

      <h2 className="mt-8 font-semibold text-zinc-900">1. 個人情報の利用目的</h2>
      <p className="mt-2 text-sm text-zinc-700">
        当サービスは、ユーザーから取得した個人情報を以下の目的で利用します。<br />
        ・レンタル申込の受付・確認・連絡のため<br />
        ・サービス提供に伴う発送・設置サポートのため<br />
        ・ご質問やお問い合わせへの対応のため<br />
        ・サービス改善および新サービス案内のため
      </p>

      <h2 className="mt-8 font-semibold text-zinc-900">2. 個人情報の第三者提供</h2>
      <p className="mt-2 text-sm text-zinc-700">
        法令に基づく場合を除き、本人の同意なく第三者に個人情報を提供することはありません。
      </p>

      <h2 className="mt-8 font-semibold text-zinc-900">3. 安全管理</h2>
      <p className="mt-2 text-sm text-zinc-700">
        当サービスは、個人情報への不正アクセス、紛失、破壊、改ざん、漏えいを防止するため、適切な安全対策を講じます。
      </p>

      <h2 className="mt-8 font-semibold text-zinc-900">4. お問い合わせ窓口</h2>
      <p className="mt-2 text-sm text-zinc-700">
        本ポリシーに関するお問い合わせは、下記までお願いいたします。<br />
        メール: info@pocketpark.jp
      </p>

      <p className="mt-10 text-sm text-zinc-500">
        制定日: {new Date().toLocaleDateString("ja-JP")}
      </p>
    </main>
    <Footer/>
    </>
  );
}
