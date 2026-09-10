////////////////////////////////////////////////////////
//
// Текст заявки для Telegram (HTML)
//
////////////////////////////////////////////////////////

import { getContactChannel } from "../config/contactChannels";
import { priorities } from "../config/content";
import type { LeadPayload, LeadPriority, LeadSource } from "../types/lead";

/** Экранирует пользовательский ввод для parse_mode HTML */
function escapeHtml(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

/** Человекочитаемый источник формы */
function sourceLabel(source: LeadSource): string {
  switch (source) {
    case "hero":
      return "Первый экран";
    case "quick":
      return "Быстрый расчёт";
    case "tariff":
      return "Тарифы";
    case "case":
      return "Кейс";
    case "category":
      return "Категория";
    case "safety":
      return "Контроль груза";
    case "compare":
      return "Сравнение";
    case "extra":
      return "Доп. услуги";
    case "final":
      return "Остались вопросы";
    case "header":
      return "Шапка";
    default: {
      const neverSource: never = source;
      return neverSource;
    }
  }
}

/** Подпись приоритета из контента лендинга */
function priorityLabel(priority: LeadPriority): string {
  return priorities.find((item) => item.id === priority)?.label ?? priority;
}

/** Строка поля; пустые значения не попадают в сообщение */
function line(label: string, value: string): string {
  const trimmed = value.trim();
  if (!trimmed) {
    return "";
  }
  return `<b>${label}:</b> ${escapeHtml(trimmed)}`;
}

/** Собирает HTML-сообщение для api/stanki-lead.php */
export function formatLeadTelegram(payload: LeadPayload): string {
  const channel = getContactChannel(payload.contactChannel);
  return [
    "<b>Новая заявка — CARGO 575</b>",
    line("Источник", sourceLabel(payload.source)),
    line("Имя", payload.name),
    line("Груз", payload.cargo),
    line("Вес, кг", payload.weight),
    line("Город доставки", payload.toCity),
    payload.source === "tariff" ? line("Приоритет", priorityLabel(payload.priority)) : "",
    line("Способ связи", channel.notifyChannel),
    line(channel.notifyPhone, payload.contact),
  ]
    .filter(Boolean)
    .join("\n");
}
