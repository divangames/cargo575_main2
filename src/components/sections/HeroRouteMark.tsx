////////////////////////////////////////////////////////
//
// Декор маршрута Китай → Россия у мобильного заголовка
//
////////////////////////////////////////////////////////

import { assetUrl } from "../../helpers/assetUrl";

/** Готовая карта маршрута Китай → Россия для мобильного заголовка */
export function HeroRouteMark() {
  return (
    <img
      className="hero-route-mark"
      src={assetUrl("/images/hero/map.webp")}
      alt=""
      aria-hidden="true"
      decoding="async"
    />
  );
}
