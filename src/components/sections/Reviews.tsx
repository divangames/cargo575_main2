////////////////////////////////////////////////////////
//
// Отзывы YourFB и площадки Китая
//
////////////////////////////////////////////////////////

import { Reveal } from "../ui/Reveal";
import { MarketMarquee } from "./MarketMarquee";
import { YourFbReviews } from "./YourFbReviews";
import "./Reviews.css";

/** Социальное доказательство: виджет отзывов */
export function Reviews() {
  return (
    <section className="block reviews" id="otzyvy">
      <div className="wrap">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">Отзывы</p>
            <h2 className="section-title">Что говорят клиенты CARGO 575</h2>
          </div>
        </Reveal>
        <YourFbReviews />
      </div>
      <MarketMarquee />
    </section>
  );
}
