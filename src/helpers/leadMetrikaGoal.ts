////////////////////////////////////////////////////////
//
// Сопоставление заголовка формы и цели Метрики
//
////////////////////////////////////////////////////////

import { metrikaGoals, type MetrikaGoalId } from "../config/metrika";

/** Возвращает идентификатор цели по заголовку формы или null, если цель не задана */
export function getLeadMetrikaGoal(formTitle: string): MetrikaGoalId | null {
  switch (formTitle) {
    case "Рассчитать стоимость доставки":
      return metrikaGoals.leadDelivery;
    case "Поможем выбрать способ доставки":
      return metrikaGoals.leadHelpCargoOrWhite;
    case "Обсудить бизнес-тур":
      return metrikaGoals.leadBusinessTour;
    case "Остались вопросы?":
      return metrikaGoals.leadQuestions;
    default:
      return null;
  }
}
