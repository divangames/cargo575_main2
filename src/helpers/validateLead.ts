////////////////////////////////////////////////////////
//
// Валидация формы расчёта
//
////////////////////////////////////////////////////////

import type { FieldErrors, LeadPayload } from "../types/lead";

/** Проверяет обязательные поля заявки */
export function validateLead(payload: LeadPayload, mode: "hero" | "full"): FieldErrors {
  const errors: FieldErrors = {};
  if (!payload.cargo.trim()) errors.cargo = "Укажите, что везём";
  if (!payload.weight.trim()) errors.weight = "Укажите вес";
  else if (!/^\d+([.,]\d+)?$/.test(payload.weight.trim())) errors.weight = "Только число";
  if (!payload.toCity.trim()) errors.toCity = "Укажите город доставки";
  if (!payload.contact.trim()) errors.contact = "Укажите телефон или Telegram";
  if (mode === "full") {
    if (!payload.name.trim()) errors.name = "Укажите имя";
  }
  if (payload.volume && !/^\d+([.,]\d+)?$/.test(payload.volume.trim())) {
    errors.volume = "Только число";
  }
  return errors;
}
