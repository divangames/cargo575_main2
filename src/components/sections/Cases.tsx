////////////////////////////////////////////////////////
//
// Примеры доставок: портретные фото-досье
//
////////////////////////////////////////////////////////

import { cases } from "../../config/content";
import { useLeadModal } from "../../hooks/useLeadModal";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import "./Cases.css";

/** Кейсы с вертикальными кадрами проверки груза */
export function Cases() {
  const { openLead } = useLeadModal();

  return (
    <section className="block cases" id="reviews">
      <div className="wrap">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">Практика</p>
            <h2 className="section-title">Примеры реальных доставок из Китая</h2>
            <p className="section-lead">
              Стоимость партии публикуем после согласования. Здесь — структура реальной операции.
            </p>
          </div>
        </Reveal>
        <div className="case-track">
          {cases.map((item) => (
            <article className="case-card" key={item.n}>
              <div className="case-photo">
                <img
                  src={item.image}
                  alt={item.alt}
                  width={900}
                  height={1200}
                  loading="lazy"
                  decoding="async"
                />
                <span className="case-num">{item.n}</span>
                <span className="case-cat">{item.category}</span>
              </div>
              <div className="case-body">
                <h3>{item.route}</h3>
                <ul className="case-stats">
                  <li>{item.weight}</li>
                  <li>{item.volume}</li>
                  <li>{item.days}</li>
                  <li>{item.mode}</li>
                </ul>
                <p>{item.note}</p>
                <small>{item.rate}</small>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => openLead("case", { cargo: item.category })}
                >
                  Рассчитать похожий груз
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
