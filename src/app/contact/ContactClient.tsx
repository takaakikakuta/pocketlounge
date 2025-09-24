"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import type { Schema } from "../../../amplify/data/resource"
import { Amplify } from "aws-amplify"
import { generateClient } from "aws-amplify/api"
import outputs from "../../../amplify_outputs.json"
import Link from "next/link"; Amplify.configure(outputs)

const client = generateClient<Schema>();

type PlanId = "simple" | "regular" | "luxury" | "";

const PLAN_LABEL: Record<Exclude<PlanId, "">, string> = {
   simple: "簡単コース（送料込み）",
   regular: "レギュラーコース（送料込み）",
   luxury: "ラグジュアリーコース（送料込み）",
}; 

const PREFS = [ "北海道","青森県","岩手県","宮城県","秋田県","山形県","福島県", "茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県", "新潟県","富山県","石川県","福井県","山梨県","長野県", "岐阜県","静岡県","愛知県","三重県", "滋賀県","京都府","大阪府","兵庫県","奈良県","和歌山県", "鳥取県","島根県","岡山県","広島県","山口県", "徳島県","香川県","愛媛県","高知県", "福岡県","佐賀県","長崎県","熊本県","大分県","宮崎県","鹿児島県","沖縄県", ]; 

// YYYY-MM-DD を返す
function toYmd(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function ContactClient() {
  const sp = useSearchParams();
  const router = useRouter();

  const initialPlan = (sp.get("plan") as PlanId) ?? "";
  const [plan, setPlan] = useState<PlanId>(
    ["simple", "regular", "luxury"].includes(initialPlan) ? initialPlan : ""
  );

  // 2週間後(=14日後)を最小選択日に
  const minDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    d.setHours(0, 0, 0, 0);
    return toYmd(d);
  }, []);

  // 日程
  const [arrivalDate, setArrivalDate] = useState(""); // 到着希望日
  const [useDate, setUseDate] = useState("");         // ご利用日
  const [shipDate, setShipDate] = useState("");       // 返却発送予定日

  // 会場
  const [pref, setPref] = useState("");
  const [venueName, setVenueName] = useState("");
  const [venueAddress, setVenueAddress] = useState("");

  // 連絡先
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [agree, setAgree] = useState(false);

  // 状態
  const [submitting, setSubmitting] = useState(false);
  const [sent] = useState<null | { id: string }>(null); // 画面遷移するので内部では未使用
  const [error, setError] = useState<string | null>(null);

  // 割引
  const [promo, setPromo] = useState<"" | "photo5000">("");
  const [photoConsent, setPhotoConsent] = useState(false);
  const [review, setReview] = useState("");

  const priceHint = useMemo(() => {
    switch (plan) {
      case "simple": return "目安：¥19,800（送料込み・税込）";
      case "regular": return "目安：¥39,800（送料込み・税込）";
      case "luxury": return "目安：¥69,800（送料込み・税込）";
      default: return "プラン未定（後から調整可能）";
    }
  }, [plan]);

  // ?promo=photo5000 を初期反映
  useEffect(() => {
    const param = (sp.get("promo") ?? "").toLowerCase();
    if (param === "photo5000") setPromo("photo5000");
  }, [sp]);

  function isBefore(a: string, b: string) {
    if (!a || !b) return false;
    return new Date(a).getTime() < new Date(b).getTime();
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    // 必須チェック
    if (!arrivalDate) return setError("到着希望日を入力してください。");
    if (!useDate) return setError("ご利用日を入力してください。");
    if (!pref) return setError("都道府県を選択してください。");
    if (!venueName) return setError("会場名を入力してください。");
    if (!venueAddress) return setError("住所を入力してください。");
    if (!name) return setError("お名前を入力してください。");
    if (!email) return setError("メールアドレスを入力してください。");
    if (!agree) return setError("プライバシーポリシーに同意してください。");

    // 最小日
    if (arrivalDate < minDate || useDate < minDate || (shipDate && shipDate < minDate)) {
      return setError("日付は本日から2週間以降を選択してください。");
    }
    // 相関
    if (isBefore(useDate, arrivalDate)) {
      return setError("ご利用日は到着希望日と同日以降を選択してください。");
    }
    if (shipDate && isBefore(shipDate, useDate)) {
      return setError("返却発送日はご利用日と同日以降を選択してください。");
    }
    // 割引条件
    if (promo === "photo5000" && !photoConsent) {
      return setError("写真提供割引を選んだ場合は、掲載（ぼかし対応可）への同意が必要です。");
    }

    setSubmitting(true);
    try {
      await client.queries.sendMail({
        plan: plan || null,
        arrivalDate,
        useDate,
        shipDate: shipDate || null,
        pref,
        venueName,
        venueAddress,
        name,
        email,
        promo: promo || null,
        photoConsent,
        review: review || null,
      });
      router.replace("/contact/thanks?src=contact");
    } catch (err) {
      console.error("Error sending mail:", err);
      setError("送信に失敗しました。時間をおいて再度お試しください。");
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-800">
        <p className="font-medium">送信が完了しました。</p>
        <p className="mt-1 text-sm">受付ID: {sent.id}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      {/* プラン */}
      <label className="grid gap-1 text-sm">
        <span>希望プラン（任意）</span>
        <select
          value={plan}
          onChange={(e) => setPlan(e.target.value as PlanId)}
          className="rounded-lg border border-zinc-300 px-3 py-2"
        >
          <option value="">未定</option>
          <option value="simple">{PLAN_LABEL.simple}</option>
          <option value="regular">{PLAN_LABEL.regular}</option>
          <option value="luxury">{PLAN_LABEL.luxury}</option>
        </select>
        <span className="text-xs text-zinc-500">{priceHint}</span>
      </label>

      {/* 割引 */}
      <section className="mt-2 grid gap-4 rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
        <h3 className="text-sm font-semibold text-emerald-900">割引のご希望</h3>

        <label className="inline-flex items-center gap-2 text-sm">
          <input
            type="radio"
            name="promo"
            value=""
            checked={promo === ""}
            onChange={() => setPromo("")}
            className="h-4 w-4 border-zinc-300 text-emerald-600"
          />
          割引なし
        </label>

        <label className="inline-flex items-start gap-2 text-sm">
          <input
            type="radio"
            name="promo"
            value="photo5000"
            checked={promo === "photo5000"}
            onChange={() => setPromo("photo5000")}
            className="mt-1 h-4 w-4 border-zinc-300 text-emerald-600"
          />
          <span>
            写真提供で<strong>5,000円割引</strong>（掲載OKの場合／当方で人物はぼかし等のプライバシー保護を行います）
            <div className="mt-2 grid gap-2">
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={photoConsent}
                  onChange={(e) => setPhotoConsent(e.target.checked)}
                  className="h-4 w-4 border-zinc-300 text-emerald-600"
                  disabled={promo !== "photo5000"}
                />
                掲載（サイト・SNS・提案資料等）に同意します
              </label>
              {/* 任意レビュー欄を使うなら外してください */}
              {/* <label className="grid gap-1">
                <span className="text-xs text-zinc-600">ご感想（任意・20〜60字程度）</span>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="例）会場に合う色味で清潔、保護者も安心して過ごせました。"
                  className="min-h-[80px] rounded-lg border border-emerald-200 bg-white px-3 py-2 text-sm"
                  disabled={promo !== "photo5000"}
                />
              </label> */}
              <p className="text-[12px] text-emerald-900/80">
                ※ データ提出はご利用後2週間以内（横16:9推奨）。個人が特定される情報は掲載しません。
              </p>
            </div>
          </span>
        </label>
      </section>

      {/* 日程 */}
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="grid gap-1 text-sm">
          <span>到着希望日 <span className="text-red-600">*</span></span>
          <input
            type="date"
            value={arrivalDate}
            min={minDate}
            onChange={(e) => setArrivalDate(e.target.value)}
            className="rounded-lg border border-zinc-300 px-3 py-2"
            required
          />
          <span className="text-[12px] text-zinc-500">※ 本日から2週間以降のみ選択可</span>
        </label>

        <label className="grid gap-1 text-sm">
          <span>ご利用日 <span className="text-red-600">*</span></span>
          <input
            type="date"
            value={useDate}
            min={minDate}
            onChange={(e) => setUseDate(e.target.value)}
            className="rounded-lg border border-zinc-300 px-3 py-2"
            required
          />
          <span className="text-[12px] text-zinc-500">※ 到着希望日と同日または後の日付</span>
        </label>

        <label className="grid gap-1 text-sm">
          <span>返却発送予定日 <span className="text-red-600">*</span></span>
          <input
            type="date"
            value={shipDate}
            min={useDate || minDate}
            onChange={(e) => setShipDate(e.target.value)}
            className="rounded-lg border border-zinc-300 px-3 py-2"
          />
          <span className="text-[12px] text-zinc-500">※ ご利用後に宅配便で返送する日付</span>
        </label>
      </div>

      {/* 会場 */}
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="grid gap-1 text-sm">
          <span>都道府県 <span className="text-red-600">*</span></span>
          <select
            value={pref}
            onChange={(e) => setPref(e.target.value)}
            className="rounded-lg border border-zinc-300 px-3 py-2"
            required
          >
            <option value="">選択してください</option>
            {PREFS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </label>

        <label className="grid gap-1 text-sm sm:col-span-3">
          <span>住所 <span className="text-red-600">*</span></span>
          <input
            type="text"
            value={venueAddress}
            onChange={(e) => setVenueAddress(e.target.value)}
            placeholder="例）東京都新宿区西新宿1-2-3"
            className="rounded-lg border border-zinc-300 px-3 py-2"
            required
          />
        </label>

        <label className="grid gap-1 text-sm">
          <span>会場名 <span className="text-red-600">*</span></span>
          <input
            type="text"
            value={venueName}
            onChange={(e) => setVenueName(e.target.value)}
            placeholder="例）〇〇ホテル 3F ○○の間"
            className="rounded-lg border border-zinc-300 px-3 py-2"
            required
          />
        </label>
      </div>

      {/* 連絡先 */}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1 text-sm">
          <span>お名前 <span className="text-red-600">*</span></span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-lg border border-zinc-300 px-3 py-2"
            required
          />
        </label>

        <label className="grid gap-1 text-sm">
          <span>メールアドレス <span className="text-red-600">*</span></span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg border border-zinc-300 px-3 py-2"
            required
          />
        </label>
      </div>

      {/* 同意 */}
      <label className="inline-flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="h-4 w-4 rounded border-zinc-300 text-emerald-600"
        />
        <Link href="/privacy" className="underline">プライバシーポリシー</Link>及び
        <Link href="/disclaimer" className="underline">免責事項</Link>に同意します
      </label>

      {/* エラー */}
      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* 送信 */}
      <button
        disabled={submitting}
        className="mt-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
      >
        {submitting ? "送信中…" : "送信"}
      </button>
    </form>
  );
}
