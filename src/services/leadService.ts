////////////////////////////////////////////////////////
//
// Отправка заявки: локальное сохранение до подключения CRM
//
////////////////////////////////////////////////////////

import type { LeadPayload } from "../types/lead";

const STORAGE_KEY = "cargo575-leads";

/** Сохраняет заявку и имитирует ответ логиста */
export async function submitLead(payload: LeadPayload): Promise<void> {
  await new Promise((resolve) => window.setTimeout(resolve, 700));
  const prev = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as LeadPayload[];
  prev.push(payload);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prev));
}
