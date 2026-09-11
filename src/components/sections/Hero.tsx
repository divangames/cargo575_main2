////////////////////////////////////////////////////////
//
// Первый экран: оффер и интерактивная схема автодоставки
//
////////////////////////////////////////////////////////

import { HeroRoute } from "./HeroRoute";
import { heroChips, heroFacts } from "../../config/content";
import { assetUrl } from "../../helpers/assetUrl";
import { useLeadModal } from "../../hooks/useLeadModal";
import { Button } from "../ui/Button";
import { Wave } from "../ui/Wave";
import "./Hero.css";

/** Главный оффер: на мобильном — фото, плашки и маршрут, на десктопе — сцена с фурой */
export function Hero() {
  const { openLead } = useLeadModal();

  return (
    <section className="hero" id="top">
      <div className="hero-poster">
        <div className="hero-poster-fx" aria-hidden="true" />
        <div className="hero-main wrap-wide">
          <div className="hero-copy">
            <p className="eyebrow">CARGO 575 · Китай → Россия</p>
            <h1>
              <span className="hero-title-brand">КАРГО</span>
              <span className="hero-title-route">доставка из Китая в Россию</span>
            </h1>
            <figure className="hero-shot">
              <img
                src={assetUrl("/images/hero/HERO.webp?v=2")}
                alt="Встреча клиента и представителя CARGO 575 у офиса 575 Карго Синь Да"
                width={1080}
                height={1080}
                decoding="async"
                fetchPriority="high"
              />
            </figure>
            <ul className="hero-chips" aria-label="Ориентиры по доставке">
              {heroChips.map((item) => (
                <li key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
            <p className="hero-sub">Доставляем коммерческие грузы из Китая в любой город РФ от 2 кг</p>
            <div className="hero-cta">
              <Button type="button" onClick={() => openLead("hero")}>
                Рассчитать стоимость доставки
              </Button>
              <button type="button" className="hero-ghost" onClick={() => openLead("hero")}>
                Получить консультацию логиста
              </button>
            </div>
            <ul className="hero-facts">
              {heroFacts.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <HeroRoute />
        </div>
        <div className="hero-metrics wrap-wide">
          <div>
            <strong>1$</strong>
            <span>от ставки / кг</span>
          </div>
          <div>
            <strong>12</strong>
            <span>от дней в пути</span>
          </div>
          <div>
            <strong>20</strong>
            <span>от кг минимум</span>
          </div>
        </div>
        <Wave from="#0088d8" to="#f5faff" />
      </div>
    </section>
  );
}

