////////////////////////////////////////////////////////
//
// Отправка заявки в Telegram через PHP-прокси /api
//
////////////////////////////////////////////////////////

import { site } from "../config/site";
import { formatLeadTelegram } from "../helpers/formatLeadTelegram";
import { getLeadTracking } from "../helpers/leadTracking";
import type { LeadPayload } from "../types/lead";

/** Отправляет заявку на stanki-lead.php вместе с токеном SmartCaptcha */
export async function submitLead(payload: LeadPayload, smartToken: string, requestId: string): Promise<void> {
  const response = await fetch(site.leadApiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: formatLeadTelegram(payload),
      lead: { ...payload, ...getLeadTracking(), type: "standard", requestId },
      smartToken,
    }),
  });

  if (response.status === 403) {
    throw new Error("CAPTCHA_FAILED");
  }

  if (!response.ok) {
    throw new Error("Lead API error");
  }

  const data = (await response.json()) as { ok?: boolean };
  if (!data.ok) {
    throw new Error("Lead rejected");
  }
}
