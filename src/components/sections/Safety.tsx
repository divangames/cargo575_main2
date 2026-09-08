////////////////////////////////////////////////////////
//
// Безопасность груза
//
////////////////////////////////////////////////////////

import { safetyItems } from "../../config/content";
import { assetUrl } from "../../helpers/assetUrl";
import { useLeadModal } from "../../hooks/useLeadModal";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { SafetyIcon } from "./SafetyIcon";
import "./Safety.css";

/** Доказательства контроля груза */
export function Safety() {
  const { openLead } = useLeadModal();

  return (
    <section className="block safety">
      <div className="wrap-wide safety-grid">
        <div className="safety-copy">
          <Reveal>
            <div className="section-head">
              <p className="eyebrow">Контроль</p>
              <h2 className="section-title">
                Ваш груз не исчезает
                <br /> после отправки из Китая
              </h2>
              <p className="section-lead">Контролируем партию на каждом этапе: склад, проверка, маршрут, выдача.</p>
            </div>
          </Reveal>
        </div>
        <div className="safety-visual">
          <img
            src={assetUrl("/images/uslugi/02.jpg")}
            alt="Упаковка и подготовка груза на складе CARGO 575"
            loading="lazy"
            decoding="async"
          />
        </div>
        <ul className="safety-list">
          {safetyItems.map((item) => (
            <li key={item.title} className="safety-card">
              <span className="safety-icon">
                <SafetyIcon name={item.icon} />
              </span>
              <div className="safety-card-copy">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="safety-cta">
          <Button type="button" onClick={() => openLead("safety")}>
            Обсудить доставку с логистом
          </Button>
        </div>
      </div>
    </section>
  );
}
