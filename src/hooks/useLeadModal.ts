////////////////////////////////////////////////////////
//
// Контекст модалки расчёта
//
////////////////////////////////////////////////////////

import { createContext, useContext } from "react";
import type { LeadPayload, LeadSource } from "../types/lead";

interface LeadModalContextValue {
  openLead: (source: LeadSource, preset?: Partial<LeadPayload>) => void;
}

export const LeadModalContext = createContext<LeadModalContextValue | null>(null);

/** Доступ к открытию модалки расчёта */
export function useLeadModal() {
  const ctx = useContext(LeadModalContext);
  if (!ctx) {
    throw new Error("LeadModalContext не найден");
  }
  return ctx;
}
