////////////////////////////////////////////////////////
//
// Сопоставление источника формы и цели Метрики
//
////////////////////////////////////////////////////////

import { metrikaGoals, type MetrikaGoalId } from "../config/metrika";
import type { LeadFormMode, LeadSource } from "../types/lead";

/** Возвращает идентификатор цели по источнику формы */
export function getLeadMetrikaGoal(source: LeadSource, mode: LeadFormMode): MetrikaGoalId {
  switch (source) {
    case "quick":
    case "hero":
    case "tariff":
    case "case":
    case "category":
    case "safety":
    case "extra":
    case "header":
      return metrikaGoals.leadDelivery;
    case "final":
      return mode === "question" ? metrikaGoals.leadQuestions : metrikaGoals.leadDelivery;
    case "compare":
      return metrikaGoals.leadHelpCargoOrWhite;
    case "businessTour":
      return metrikaGoals.leadBusinessTour;
    default: {
      const neverSource: never = source;
      return neverSource;
    }
  }
}
