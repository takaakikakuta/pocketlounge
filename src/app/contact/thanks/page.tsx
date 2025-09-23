import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ThanksPage() {
  

  return (
    <>
    <Header/>
    <main className="md:py-44 py-28 bg-zinc-100">
      <section className="mx-auto max-w-lg px-6 text-center">
        <h1 className="text-2xl font-bold">送信ありがとうございました！</h1>
        <p className="mt-3 text-zinc-600">
          担当者より折り返しご連絡します。少々お待ちください。
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-block rounded-lg bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-800"
            >
            ホームへ戻る
          </Link>
        </div>
      </section>
    </main>
    <Footer/>
    </>
  );
}
