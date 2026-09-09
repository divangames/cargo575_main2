////////////////////////////////////////////////////////
//
// Развилка схем: карго и белая доставка
//
////////////////////////////////////////////////////////

import { compareLanes, compareRows } from "../../config/content";
import { compareCriterionIcon } from "../../helpers/compareCriterionIcon";
import { useLeadModal } from "../../hooks/useLeadModal";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import "./Compare.css";

/** Матрица выбора схемы без обещаний по НДС */
export function Compare() {
  const { openLead } = useLeadModal();

  return (
    <section className="block compare" id="scheme">
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

        <Reveal>
          <div className="cmp-board">
            <table className="cmp-table">
              <caption className="cmp-caption">Сравнение карго и белой доставки по сроку, стоимости и оформлению</caption>
              <thead>
                <tr>
                  <th scope="col" className="cmp-axis">
                    Критерий
                  </th>
                  <th scope="col" className="cmp-lane is-cargo">
                    <span className="cmp-kicker">{compareLanes.cargo.kicker}</span>
                    <span className="cmp-name">{compareLanes.cargo.name}</span>
                  </th>
                  <th scope="col" className="cmp-lane is-white">
                    <span className="cmp-kicker">{compareLanes.white.kicker}</span>
                    <span className="cmp-name">{compareLanes.white.name}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row) => {
                  const Icon = compareCriterionIcon(row.label);

                  return (
                    <tr key={row.label}>
                      <th scope="row">
                        <Icon weight="bold" size={18} aria-hidden />
                        {row.label}
                      </th>
                      <td>{row.cargo}</td>
                      <td>{row.white}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Reveal>

        <div className="cmp-foot">
          <Button type="button" variant="secondary" onClick={() => openLead("compare")}>
            Помочь выбрать способ доставки
          </Button>
        </div>
      </div>
    </section>
  );
}
