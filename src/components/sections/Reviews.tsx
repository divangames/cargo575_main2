////////////////////////////////////////////////////////
//
// Отзывы и площадки Китая
//
////////////////////////////////////////////////////////

import { reviews } from "../../config/content";
import { Reveal } from "../ui/Reveal";
import { MarketMarquee } from "./MarketMarquee";
import "./Reviews.css";

/** Социальное доказательство */
export function Reviews() {
  return (
    <section className="block reviews">
      <div className="wrap">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">Отзывы</p>
            <h2 className="section-title">Что говорят клиенты CARGO 575</h2>
            <p className="section-lead">
              Формат отзывов привязан к перевозке. Видеоотзывы и карточки Яндекс / 2ГИС добавляются
              после согласования публикации.
            </p>
          </div>
        </Reveal>
        <div className="rev-grid">
          {reviews.map((item) => (
            <blockquote key={item.name}>
              <p>{item.text}</p>
              <footer>
                <b>
                  {item.name}, {item.company}
                </b>
                <span>
                  {item.cargo} · {item.route}
                </span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
      <MarketMarquee />
    </section>
  );
}
