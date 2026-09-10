////////////////////////////////////////////////////////
//
// Полная форма раннего расчёта
//
////////////////////////////////////////////////////////

import { LeadForm } from "../lead/LeadForm";
import { Reveal } from "../ui/Reveal";
import "./QuickCalc.css";

/** Второй экран: заявка, пока намерение горячее */
export function QuickCalc() {
  return (
    <section className="block quick" id="calc">
      <div className="wrap quick-grid">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">Расчёт</p>
            <h2 className="section-title">Узнайте стоимость доставки вашего груза</h2>
            <p className="section-lead">
              Укажите основные параметры — предложим несколько вариантов доставки по цене и сроку.
            </p>
          </div>
        </Reveal>
        <div className="quick-card">
          <LeadForm source="quick" mode="simple" cta="Получить расчет" />
        </div>
      </div>
    </section>
  );
}
