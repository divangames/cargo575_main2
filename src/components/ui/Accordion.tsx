////////////////////////////////////////////////////////
//
// Аккордеон FAQ
//
////////////////////////////////////////////////////////

import { useState } from "react";
import "./Accordion.css";

interface Item {
  q: string;
  a: string;
}

interface Props {
  items: readonly Item[];
}

/** Список вопросов с одним открытым пунктом */
export function Accordion({ items }: Props) {
  const [open, setOpen] = useState(0);

  return (
    <div className="acc">
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div className={`acc-item ${isOpen ? "is-open" : ""}`} key={item.q}>
            <button
              type="button"
              className="acc-btn"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : index)}
            >
              <span>{item.q}</span>
              <b aria-hidden="true">{isOpen ? "−" : "+"}</b>
            </button>
            {isOpen ? <p className="acc-body">{item.a}</p> : null}
          </div>
        );
      })}
    </div>
  );
}
