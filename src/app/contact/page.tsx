import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata = {
  title: "見積り・空き確認 | ポケットパーク",
  description: "結婚式や法人イベント向けキッズスペースレンタルの見積り・空き状況を確認できます。",
};

export default function ContactPage() {
  return (
    <>
    <Header/>
    <main className="mx-auto max-w-3xl px-4 py-16 sm:py-24">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
        見積り・空き確認
      </h1>
      <p className="mt-3 text-zinc-600">
        日程と会場情報を入力してください。送料込みの総額をお知らせします。
      </p>
      <div className="mt-8">
        <ContactForm />
      </div>
    </main>
    <Footer/>
    </>
  );
}
