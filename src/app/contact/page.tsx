// app/contact/page.tsx
import { Suspense } from "react";
import ContactClient from "./ContactClient";


export default function ContactPage() {
  return (
    <Suspense fallback={<div className="p-6 text-zinc-500">読み込み中...</div>}>
      <ContactClient />
    </Suspense>
  );
}
