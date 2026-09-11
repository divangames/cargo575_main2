////////////////////////////////////////////////////////
//
// Отправка целей в Яндекс.Метрику
//
////////////////////////////////////////////////////////

import { metrikaCounterId } from "../config/metrika";
import type { MetrikaGoalId } from "../config/metrika";

/** Отправляет reachGoal; тихо пропускает, если счётчик ещё не загружен */
export function reachMetrikaGoal(goalId: MetrikaGoalId): void {
  if (typeof window.ym !== "function") {
    return;
  }

  window.ym(metrikaCounterId, "reachGoal", goalId);
}
