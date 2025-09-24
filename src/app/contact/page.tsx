// app/contact/page.tsx
import { Suspense } from "react";
import ContactClient from "./ContactClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


export default function ContactPage() {
  return (
    <Suspense fallback={<div className="p-6 text-zinc-500">読み込み中...</div>}>
      <Header/>
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <ContactClient />
      </main>
      <Footer/>
    </Suspense>
  );
}
