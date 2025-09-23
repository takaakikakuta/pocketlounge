"use client";

import { useSearchParams } from "next/navigation";

export default function ContactClient() {
  const sp = useSearchParams();
  const plan = sp.get("plan") ?? "";
  const ref = sp.get("ref") ?? "";

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-bold">お問い合わせ</h1>
      {/* ここにフォーム。初期値に searchParams を使う例 */}
      <form className="mt-6 space-y-4">
        <input
          name="plan"
          defaultValue={plan}
          className="w-full rounded border px-3 py-2"
          placeholder="プラン（任意）"
        />
        <input
          name="ref"
          defaultValue={ref}
          className="w-full rounded border px-3 py-2"
          placeholder="参照（任意）"
        />
        {/* …残り */}
      </form>
    </main>
  );
}
