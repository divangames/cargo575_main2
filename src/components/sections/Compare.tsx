////////////////////////////////////////////////////////
//
// Сравнение карго и белой доставки
//
////////////////////////////////////////////////////////

import { compareRows } from "../../config/content";
import { useLeadModal } from "../../hooks/useLeadModal";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import "./Compare.css";

/** Развилка схем доставки */
export function Compare() {
  const { openLead } = useLeadModal();

  return (
    <section className="block compare">
      <div className="wrap">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">Схема</p>
            <h2 className="section-title">Какой вариант доставки подойдет вашему бизнесу</h2>
            <p className="section-lead">
              Юридические формулировки согласуются с компанией. Ниже — рабочая рамка выбора, без
              обещаний по НДС.
            </p>
          </div>
        </Reveal>
        <div className="cmp-grid">
          <article>
            <h3>Карго</h3>
            {compareRows.map((row) => (
              <div key={row.label}>
                <small>{row.label}</small>
                <p>{row.cargo}</p>
              </div>
            ))}
          </article>
          <article className="is-alt">
            <h3>Белая доставка</h3>
            {compareRows.map((row) => (
              <div key={row.label}>
                <small>{row.label}</small>
                <p>{row.white}</p>
              </div>
            ))}
          </article>
        </div>
        <Button type="button" variant="secondary" onClick={() => openLead("compare")}>
          Помочь выбрать способ доставки
        </Button>
      </div>
    </section>
  );
}
