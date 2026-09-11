////////////////////////////////////////////////////////
//
// Финальный расчёт
//
////////////////////////////////////////////////////////

import { LeadForm } from "../lead/LeadForm";
import { metrikaGoals } from "../../config/metrika";
import { site } from "../../config/site";
import { assetUrl } from "../../helpers/assetUrl";
import { reachMetrikaGoal } from "../../services/metrikaService";
import { Reveal } from "../ui/Reveal";
import "./FinalCalc.css";

/** Финальный блок связи после прогрева */
export function FinalCalc() {
  return (
    <section className="block final">
      <div className="wrap final-grid">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">Связь</p>
            <h2 className="section-title">Остались вопросы?</h2>
            <p className="section-lead">Напишите имя и удобный способ связи — ответим.</p>
            <div className="final-person">
              <img src={assetUrl("/images/ava.jpg")} alt="Специалист по доставке из Китая" />
              <div>
                <b>На связи специалист по доставке из Китая</b>
                <a href={site.phoneHref}>{site.phoneDisplay}</a>
                <a
                  href={site.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => reachMetrikaGoal(metrikaGoals.clickWhatsapp)}
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </Reveal>
        <div className="final-card">
          <LeadForm source="final" mode="question" cta="Отправить" />
        </div>
      </div>
    </section>
  );
}
