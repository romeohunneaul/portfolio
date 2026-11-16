import type { AskContext } from "./context";

export type Alert = {
  question: string;
  context: AskContext;
  /** 1 for the opening question of a conversation. */
  turn: number;
  /** Absent when the stream failed or the visitor stopped it. */
  answer?: string;
  /** The model's reason when it showed the contact card. */
  contact?: string;
};

const clip = (s: string, max: number) => (s.length > max ? `${s.slice(0, max).trimEnd()}…` : s);

/** Plain text (no parse_mode): nothing a visitor types can break the message. */
export function formatAlert({ question, context, turn, answer, contact }: Alert) {
  const where = context ? `${context.kind} ${context.id}` : "accueil";
  return [
    contact ? "📇 Demande de contact — portfolio" : "💬 Question — portfolio",
    `${turn > 1 ? `Relance n°${turn}` : "Nouvelle conversation"} · ${where}`,
    "",
    `« ${question} »`,
    ...(contact ? ["", `Raison : ${contact}`] : []),
    "",
    answer ? `Réponse : ${clip(answer, 400)}` : "Pas de réponse (erreur ou arrêt).",
  ].join("\n");
}

/** Telegram bot message to François. Silent when the bot is not configured; never throws. */
export async function sendAlert(alert: Alert) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) return;
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ chat_id: chat, text: formatAlert(alert), link_preview_options: { is_disabled: true } }),
  }).catch(() => {});
}
