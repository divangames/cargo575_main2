////////////////////////////////////////////////////////
//
// Выбор типа данных о товаре: ссылка, фото или параметры
//
////////////////////////////////////////////////////////

import type { ProductInputKind } from "../../types/productLead";
import "./ProductInputPicker.css";

const options: { id: ProductInputKind; label: string }[] = [
  { id: "link", label: "Ссылка на товар" },
  { id: "photo", label: "Фото товара" },
  { id: "params", label: "Знаю параметры груза" },
];

interface Props {
  value: ProductInputKind;
  onChange: (value: ProductInputKind) => void;
}

/** Три крупные кнопки выбора типа заявки */
export function ProductInputPicker({ value, onChange }: Props) {
  return (
    <fieldset className="product-kind">
      <legend>Что у вас есть?</legend>
      <div className="product-kind-grid" role="radiogroup" aria-label="Что у вас есть?">
        {options.map((item) => {
          const selected = value === item.id;
          return (
            <label key={item.id} className={`product-kind-option${selected ? " is-on" : ""}`}>
              <input
                type="radio"
                name="product-kind"
                value={item.id}
                checked={selected}
                onChange={() => onChange(item.id)}
              />
              <span>{item.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
