import type { Schema } from "../../data/resource"

import axios from 'axios';
import crypto from 'crypto';

import { env } from '$amplify/env/send-email'; // the import is '$amplify/env/<function-name>'
import { text } from "stream/consumers";

const generateBearerToken = (): string => {
  const loginId = process.env.BLASTENGINE_LOGIN_ID; // ログインID
  const apiKey = process.env.BLASTENGINE_API_KEY; // APIキー

  if (!loginId || !apiKey) {
    throw new Error('BlastengineのログインIDまたはAPIキーが設定されていません。');
  }

  // SHA256でハッシュ化し、Base64エンコード
  const hash = crypto
    .createHash('sha256')
    .update(`${loginId}${apiKey}`)
    .digest('hex')
    .toLowerCase();

  return Buffer.from(hash).toString('base64');
};

export const handler: Schema["sendMail"]["functionHandler"] = async (event) => {
 console.log("sendMail invoked");
  return "OK";
};

//   const args = event.arguments;
//   console.log("発火");
  

//   const promoLine =
//   args.promo === "photo5000"
//     ? `割引: 写真提供で5,000円引き（掲載同意: ${args.photoConsent ? "あり" : "なし"}）`
//     : "割引: なし";
  

// const reviewLine =
//   args.promo === "photo5000" && args.review
//     ? `ご感想: ${args.review}`
//     : "";

//   // 本文を整形
//   const adminText = [
//     "【ポケットパーク 見積/空き確認 受付】",
//     "----------------------------",
//     `プラン: ${args.plan || "未定"}`,
//     `到着希望日: ${args.arrivalDate}`,
//     `ご利用日: ${args.useDate}`,
//     `返却発送予定日: ${args.shipDate || "未入力"}`,
//     `都道府県: ${args.pref}`,
//     `会場名: ${args.venueName}`,
//     `住所: ${args.venueAddress}`,
//     `お名前: ${args.name}`,
//     `メール: ${args.email}`,
//     promoLine,
//     reviewLine,
//     "----------------------------",
//   ].filter(Boolean).join("\n");

//   const userText = [
//       `${args.name} 様`,
//       "",
//       "この度はお問合せありがとうございます。以下の内容で受け付けました。",
//       "",
//       "▼ お申込み内容",
//       `・プラン: ${args.plan || "未定"}`,
//       `・到着希望日: ${args.arrivalDate}`,
//       `・ご利用日: ${args.useDate}`,
//       `・返却発送予定日: ${args.shipDate || "未入力"}`,
//       `・都道府県: ${args.pref}`,
//       `・会場名: ${args.venueName}`,
//       `・住所: ${args.venueAddress}`,
//       `・${promoLine}`,
//       reviewLine ? `・${reviewLine}` : "",
//       "",
//       "■ ご案内",
//       "・写真の人物は当方でぼかし等のプライバシー保護を行います。",
//       "・写真データのご提出は、ご利用後2週間以内を目安にお願いします（横16:9推奨）。",
//       "",
//       "ポケットラウンジ",
//     ].filter(Boolean).join("\n");

//   try {
//     // Bearerトークン生成
//     const bearerToken = generateBearerToken();

//     // Blastengineにメール送信リクエストを送信(管理者)
//     const blastengineResponse = await axios.post(
//       'https://app.engn.jp/api/v1/deliveries/transaction', // トランザクションメールの送信エンドポイント
//       {
//         from: { email: "noreply@pocketlounge.example", name: "Pocket Lounge" }, // 送信元
//         to: "soci0926@gmail.com", // 送信先
//         subject: `【受付】${args.name}様 / ${args.arrivalDate} 到着希望`,
//         text_part: adminText
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${bearerToken}`, // 生成したBearerトークンを使用
//           'Content-Type': 'application/json'
//         }
//       }
//     );

//      // Blastengineにメール送信リクエストを送信(申し込み)
//     const blastengineResponse2 = await axios.post(
//       'https://app.engn.jp/api/v1/deliveries/transaction', // トランザクションメールの送信エンドポイント
//       {
//         from: { email: "noreply@pocketlounge.example", name: "Pocket Lounge" }, // 送信元
//         to: args.email, // 送信先
//         subject: `【自動返信】お問い合わせ受付のご連絡`, // 件名
//         text_part: userText
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${bearerToken}`, // 生成したBearerトークンを使用
//           'Content-Type': 'application/json'
//         }
//       }
//     );

//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       // Axios のエラーオブジェクトに安全にアクセス
//       console.error('Axios error occurred:', error.response?.data || error.message);
//     } else if (error instanceof Error) {
//       // 通常のエラーオブジェクト
//       console.error('An error occurred:', error.message);
//     } else {
//       // 型が特定できない場合
//       console.error('An unknown error occurred:', error);
//     }
//   }

//   // Bearerトークンを生成
//   return `Hello, ${env.BLASTENGINE_LOGIN_ID}!`
// }