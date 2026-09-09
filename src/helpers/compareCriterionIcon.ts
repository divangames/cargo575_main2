////////////////////////////////////////////////////////
//
// Иконка критерия в таблице схем доставки
//
////////////////////////////////////////////////////////

import {
  ClockIcon,
  CoinsIcon,
  FileTextIcon,
  TargetIcon,
  WarningCircleIcon,
  type Icon,
} from "@phosphor-icons/react";
import type { compareRows } from "../config/content";

type CriterionLabel = (typeof compareRows)[number]["label"];

/** Подбирает иконку по подписи строки сравнения */
export function compareCriterionIcon(label: CriterionLabel): Icon {
  switch (label) {
    case "Срок":
      return ClockIcon;
    case "Стоимость":
      return CoinsIcon;
    case "Оформление":
      return FileTextIcon;
    case "Кому подходит":
      return TargetIcon;
    case "Ограничения":
      return WarningCircleIcon;
    default: {
      const exhaustive: never = label;
      throw new Error(`Неизвестный критерий сравнения: ${exhaustive}`);
    }
  }
}
