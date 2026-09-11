////////////////////////////////////////////////////////
//
// Типы формы «Ссылка или фото товара»
//
////////////////////////////////////////////////////////

import type { LeadContactChannel } from "./lead";

/** Что клиент может прислать для расчёта */
export type ProductInputKind = "link" | "photo" | "params";

export interface ProductLeadValues {
  kind: ProductInputKind;
  productLink: string;
  photos: File[];
  weight: string;
  cargo: string;
  contact: string;
  contactChannel: LeadContactChannel;
}

export type ProductLeadErrors = Partial<Record<keyof ProductLeadValues | "photos", string>>;

export type ProductLeadStatus = "idle" | "loading" | "success" | "error";
