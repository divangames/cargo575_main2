////////////////////////////////////////////////////////
//
// Валидация формы расчёта
//
////////////////////////////////////////////////////////

import { getContactChannel } from "../config/contactChannels";
import type { FieldErrors, LeadFormMode, LeadPayload } from "../types/lead";

/** Проверяет обязательные поля заявки */
export function validateLead(payload: LeadPayload, mode: LeadFormMode): FieldErrors {
  const errors: FieldErrors = {};

  switch (mode) {
    case "question":
      if (!payload.name.trim()) {
        errors.name = "Укажите имя";
      }
      break;
    case "simple":
    case "tariff":
      if (payload.weight && !/^\d+([.,]\d+)?$/.test(payload.weight.trim())) {
        errors.weight = "Только число";
      }
      if (payload.volume && !/^\d+([.,]\d+)?$/.test(payload.volume.trim())) {
        errors.volume = "Только число";
      }
      break;
    default: {
      const exhaustive: never = mode;
      throw new Error(`Неизвестный режим формы: ${exhaustive}`);
    }
  }

  if (!payload.contact.trim()) {
    errors.contact = `Укажите ${getContactChannel(payload.contactChannel).phoneLabel.toLowerCase()}`;
  }

  return errors;
}
