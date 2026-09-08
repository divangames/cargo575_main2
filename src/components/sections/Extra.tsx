////////////////////////////////////////////////////////
//
// Дополнительные услуги в Китае
//
////////////////////////////////////////////////////////

import { extraServices } from "../../config/content";
import { assetUrl } from "../../helpers/assetUrl";
import { useLeadModal } from "../../hooks/useLeadModal";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import "./Extra.css";

/** Развилка: уже купили / нужна закупка */
export function Extra() {
  const { openLead } = useLeadModal();

  return (
    <section className="block extra" id="vykup">
      <div className="wrap">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">Китай под ключ</p>
            <h2 className="section-title">Нужно больше, чем просто доставка?</h2>
            <p className="section-lead">
              Можем взять на себя работу с поставщиком и подготовку товара в Китае.
            </p>
          </div>
        </Reveal>
        <div className="extra-scenes">
          <article>
            <img src={assetUrl("/images/uslugi/04.jpg")} alt="" />
            <div>
              <h3>Уже купили товар? Просто доставим.</h3>
              <p>Поставщик отправляет партию на наш склад — дальше логистика и контроль.</p>
              <Button type="button" onClick={() => openLead("extra")}>
                Рассчитать доставку
              </Button>
            </div>
          </article>
          <article>
            <img src={assetUrl("/images/uslugi/05.png")} alt="" />
            <div>
              <h3>Нужно организовать закупку с нуля? Возьмём весь процесс.</h3>
              <p>Поиск, проверка фабрики, выкуп, оплата в юанях, контроль отгрузки.</p>
              <Button type="button" variant="secondary" onClick={() => openLead("extra")}>
                Обсудить закупку и доставку
              </Button>
            </div>
          </article>
        </div>
        <ul className="extra-list">
          {extraServices.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
