////////////////////////////////////////////////////////
//
// Типы заявки на расчёт доставки
//
////////////////////////////////////////////////////////

export type LeadPriority = "cheaper" | "optimal" | "faster";

export type LeadSource =
  | "hero"
  | "quick"
  | "tariff"
  | "case"
  | "category"
  | "safety"
  | "compare"
  | "extra"
  | "final"
  | "header";

export interface LeadPayload {
  cargo: string;
  weight: string;
  volume: string;
  fromCity: string;
  toCity: string;
  name: string;
  contact: string;
  priority: LeadPriority;
  source: LeadSource;
}

export type FormStatus = "idle" | "loading" | "success" | "error";

export type FieldErrors = Partial<Record<keyof LeadPayload, string>>;
