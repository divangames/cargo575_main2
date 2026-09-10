////////////////////////////////////////////////////////
//
// Бегущая строка площадок Китая: два ряда, слева направо
//
////////////////////////////////////////////////////////

import { markets } from "../../config/content";
import "./MarketMarquee.css";

const repeats = 4;
const topSet = Array.from({ length: repeats }, () => markets).flat();
const bottomSet = Array.from({ length: repeats }, () => [...markets].reverse()).flat();

/** Одна лента логотипов; clone нужен для бесшовного цикла */
function MarqueeSet({ items, clone }: { items: typeof topSet; clone?: boolean }) {
  return (
    <div className={clone ? "rev-marquee-set is-clone" : "rev-marquee-set"} aria-hidden={clone || undefined}>
      {items.map((item, index) => (
        <img
          key={`${item.name}-${clone ? "c" : "a"}-${index}`}
          src={item.src}
          alt={clone ? "" : item.name}
          width={72}
          height={72}
          decoding="async"
        />
      ))}
    </div>
  );
}

/** Две полноширинные ленты: верх медленнее, низ быстрее */
export function MarketMarquee() {
  const names = markets.map((item) => item.name).join(", ");

  return (
    <div className="rev-markets-block">
      <div className="wrap">
        <p className="rev-markets-title">Работаем с популярными площадками Китая</p>
      </div>
      <div className="rev-marquee" role="region" aria-label={`Площадки Китая: ${names}`}>
        <div className="rev-marquee-row is-slow">
          <div className="rev-marquee-track">
            <MarqueeSet items={topSet} />
            <MarqueeSet items={topSet} clone />
          </div>
        </div>
        <div className="rev-marquee-row is-fast">
          <div className="rev-marquee-track">
            <MarqueeSet items={bottomSet} />
            <MarqueeSet items={bottomSet} clone />
          </div>
        </div>
      </div>
    </div>
  );
}
