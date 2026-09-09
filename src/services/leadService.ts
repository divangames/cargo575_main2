////////////////////////////////////////////////////////
//
// Отправка заявки в Telegram через PHP-прокси /api
//
////////////////////////////////////////////////////////

import { site } from "../config/site";
import { formatLeadTelegram } from "../helpers/formatLeadTelegram";
import type { LeadPayload } from "../types/lead";

/** Отправляет заявку на stanki-lead.php, бот дублирует её в Telegram */
export async function submitLead(payload: LeadPayload): Promise<void> {
  const response = await fetch(site.leadApiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: formatLeadTelegram(payload) }),
  });

  if (!response.ok) {
    throw new Error("Lead API error");
  }

  const data = (await response.json()) as { ok?: boolean };
  if (!data.ok) {
    throw new Error("Lead rejected");
  }
}
