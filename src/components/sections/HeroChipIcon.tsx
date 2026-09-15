////////////////////////////////////////////////////////
//
// Иконки плашек мобильного hero
//
////////////////////////////////////////////////////////

import { Cube, Truck } from "@phosphor-icons/react";
import type { HeroChipIconId } from "../../types/hero";

interface Props {
  name: HeroChipIconId;
}

/** Иконка «кг» как на макете */
function WeightMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M8.2 6.2h7.6L18 10.4c.7 1.6.9 3.3.4 4.9l-.8 2.5H6.4l-.8-2.5c-.5-1.6-.3-3.3.4-4.9L8.2 6.2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M10 6.2V5a2 2 0 0 1 4 0v1.2" stroke="currentColor" strokeWidth="1.7" />
      <text x="12" y="15.2" textAnchor="middle" fill="currentColor" fontSize="7" fontWeight="800">
        kg
      </text>
    </svg>
  );
}

/** Подбирает иконку ориентира доставки */
export function HeroChipIcon({ name }: Props) {
  const props = { size: 22, weight: "regular" as const, "aria-hidden": true };

  switch (name) {
    case "weight":
      return <WeightMark />;
    case "truck":
      return <Truck {...props} />;
    case "box":
      return <Cube {...props} />;
    default: {
      const unused: never = name;
      throw new Error(`Неизвестная иконка hero: ${String(unused)}`);
    }
  }
}
