////////////////////////////////////////////////////////
//
// Типы заявки на расчёт доставки
//
////////////////////////////////////////////////////////

export type LeadPriority = "cheaper" | "optimal" | "faster";

/** Как клиент просит связаться */
export type LeadContactChannel = "call" | "telegram" | "whatsapp" | "max";

/** Короткая заявка, тариф с приоритетом или вопрос без параметров груза */
export type LeadFormMode = "simple" | "tariff" | "question";

export type LeadSource =
  | "hero"
  | "quick"
  | "tariff"
  | "case"
  | "category"
  | "safety"
  | "compare"
  | "extra"
  | "businessTour"
  | "final"
  | "header";

export interface LeadPayload {
  /** Заголовок формы, с которой отправлена заявка */
  formTitle: string;
  cargo: string;
  weight: string;
  volume: string;
  fromCity: string;
  toCity: string;
  name: string;
  contact: string;
  contactChannel: LeadContactChannel;
  priority: LeadPriority;
  source: LeadSource;
}

export type FormStatus = "idle" | "loading" | "success" | "error";

export type FieldErrors = Partial<Record<keyof LeadPayload, string>>;
