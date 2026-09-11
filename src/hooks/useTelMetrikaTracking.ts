////////////////////////////////////////////////////////
//
// Цель Метрики при клике на tel:-ссылки
//
////////////////////////////////////////////////////////

import { useEffect } from "react";
import { metrikaGoals } from "../config/metrika";
import { reachMetrikaGoal } from "../services/metrikaService";

/** Отслеживает клики по любым ссылкам с href, начинающимся на tel: */
export function useTelMetrikaTracking(): void {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const link = target.closest('a[href^="tel:"]');
      if (!link) {
        return;
      }

      reachMetrikaGoal(metrikaGoals.clickTel);
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
}
