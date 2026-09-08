////////////////////////////////////////////////////////
//
// Финальный расчёт
//
////////////////////////////////////////////////////////

import { LeadForm } from "../lead/LeadForm";
import { site } from "../../config/site";
import { assetUrl } from "../../helpers/assetUrl";
import { Reveal } from "../ui/Reveal";
import "./FinalCalc.css";

/** Последняя конверсия после прогрева */
export function FinalCalc() {
  return (
    <section className="block final">
      <div className="wrap final-grid">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">Расчёт</p>
            <h2 className="section-title">Рассчитайте стоимость доставки вашего груза</h2>
            <p className="section-lead">
              Оставьте параметры груза — логист подберёт варианты и предложит оптимальный по цене и
              сроку.
            </p>
            <div className="final-person">
              <img src={assetUrl("/images/uslugi/03.jpg")} alt="Специалист по доставке из Китая" />
              <div>
                <b>На связи специалист по доставке из Китая</b>
                <a href={site.phoneHref}>{site.phoneDisplay}</a>
                <a href={site.whatsappHref} target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </Reveal>
        <div className="final-card">
          <LeadForm source="final" mode="full" cta="Получить расчет доставки" />
        </div>
      </div>
    </section>
  );
}
