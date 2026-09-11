////////////////////////////////////////////////////////
//
// Заголовок формы для UI и заявки в Telegram
//
////////////////////////////////////////////////////////

import type { LeadFormMode, LeadSource } from "../types/lead";

/** Возвращает заголовок формы по источнику и режиму */
export function getLeadFormTitle(source: LeadSource, mode: LeadFormMode): string {
  switch (source) {
    case "compare":
      return "Поможем выбрать способ доставки";
    case "quick":
      return "Узнайте стоимость доставки вашего груза";
    case "final":
      return mode === "question" ? "Остались вопросы?" : "Рассчитать стоимость доставки";
    case "hero":
    case "tariff":
    case "case":
    case "category":
    case "safety":
    case "extra":
      return "Рассчитать стоимость доставки";
    case "businessTour":
      return "Обсудить бизнес-тур";
    case "header":
      return "Рассчитать стоимость доставки";
    default: {
      const neverSource: never = source;
      return neverSource;
    }
  }
}
