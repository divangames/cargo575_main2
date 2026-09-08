////////////////////////////////////////////////////////
//
// Сравнение тарифов авто / авиа
//
////////////////////////////////////////////////////////

import { tariffs } from "../../config/content";
import { useLeadModal } from "../../hooks/useLeadModal";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import "./Tariffs.css";

/** Три маршрута: эконом, оптимальный, экспресс */
export function Tariffs() {
  const { openLead } = useLeadModal();

  return (
    <section className="block" id="tariffs">
      <div className="wrap">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">Маршруты</p>
            <h2 className="section-title">Выберите подходящий вариант доставки</h2>
            <p className="section-lead">
              Подберём маршрут под ваш приоритет: дешевле, быстрее или оптимально по цене и сроку.
            </p>
          </div>
        </Reveal>
        <div className="tariff-grid">
          {tariffs.map((item) => (
            <article className={`tariff ${item.featured ? "is-feat" : ""}`} key={item.id}>
              {item.featured ? <span className="tariff-badge">Выбирают чаще всего</span> : null}
              <h3>{item.name}</h3>
              <p className="tariff-days">{item.days}</p>
              <p className="tariff-price">{item.price}</p>
              <p className="tariff-min">{item.minWeight}</p>
              <p>{item.text}</p>
              <details>
                <summary>Что входит</summary>
                <p>
                  Приём на складе, консолидация, стандартная упаковка, перевозка, сопровождение
                  оформления. Фото / доп. упаковка / страхование — по условиям расчёта.
                </p>
              </details>
              <Button type="button" variant={item.featured ? "primary" : "secondary"} onClick={() => openLead("tariff")}>
                Рассчитать мой груз
              </Button>
            </article>
          ))}
        </div>
        <p className="tariff-foot">
          Точная стоимость зависит от категории товара, веса, объёма, города отправления и маршрута.
          Рассчитаем ваш груз индивидуально. Ориентиры ставок — с 575cargo.ru.
        </p>
      </div>
    </section>
  );
}
