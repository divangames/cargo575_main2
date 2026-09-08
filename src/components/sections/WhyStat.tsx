////////////////////////////////////////////////////////
//
// Карточка цифры компании с анимацией счётчика
//
////////////////////////////////////////////////////////

import { parseStatValue } from "../../helpers/parseStatValue";
import { useCountUp } from "../../hooks/useCountUp";

interface Item {
  value: string;
  suffix: string;
  label: string;
}

interface Props {
  item: Item;
  active: boolean;
  delay: number;
}

/** Одна метрика: число растёт при появлении блока */
export function WhyStat({ item, active, delay }: Props) {
  const { count, plus } = parseStatValue(item.value);
  const shown = useCountUp(count, active, { delay });
  const label = `${item.value}${item.suffix ? ` ${item.suffix}` : ""} ${item.label}`;

  return (
    <li>
      <strong aria-label={label}>
        <span aria-hidden="true">
          {shown}
          {plus ? "+" : null}
        </span>
        {item.suffix ? <small aria-hidden="true">{item.suffix}</small> : null}
      </strong>
      <span className="why-stats-label">{item.label}</span>
    </li>
  );
}
