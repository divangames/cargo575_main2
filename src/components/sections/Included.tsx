////////////////////////////////////////////////////////
//
// Что входит в стоимость
//
////////////////////////////////////////////////////////

import { useState } from "react";
import { costFactors, includedItems } from "../../config/content";
import { Reveal } from "../ui/Reveal";
import "./Included.css";

/** Состав тарифа и факторы цены */
export function Included() {
  const [open, setOpen] = useState(false);

  return (
    <section className="block included" id="included">
      <div className="wrap">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">Прозрачность</p>
            <h2 className="section-title">Что входит в стоимость карго доставки</h2>
            <p className="section-lead">
              Перед отправкой вы знаете согласованную стоимость и условия доставки.
            </p>
          </div>
        </Reveal>
        <ol className="inc-grid">
          {includedItems.map((item, index) => (
            <li key={item.title}>
              <span>0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ol>
        <p className="inc-note">
          Часть услуг (доп. упаковка, расширенная проверка, адресная доставка) может оплачиваться
          отдельно — это видно в расчёте, без эффекта «всё включено».
        </p>
        <button type="button" className="inc-toggle" onClick={() => setOpen((v) => !v)}>
          {open ? "Скрыть факторы цены" : "Что может повлиять на стоимость?"}
        </button>
        {open ? (
          <ul className="inc-factors">
            {costFactors.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
