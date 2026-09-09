////////////////////////////////////////////////////////
//
// Первый экран: оффер и интерактивная схема автодоставки
//
////////////////////////////////////////////////////////

import { HeroRoute } from "./HeroRoute";
import { heroFacts } from "../../config/content";
import { assetUrl } from "../../helpers/assetUrl";
import { useLeadModal } from "../../hooks/useLeadModal";
import { LeadForm } from "../lead/LeadForm";
import { Button } from "../ui/Button";
import { Wave } from "../ui/Wave";
import "./Hero.css";

/** Главный оффер с фирменной грузовой машиной */
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
              <span>Карго</span>
              <span>из Китая</span>
              <span>в Россию</span>
            </h1>
            <p className="hero-sub">Доставляем коммерческие грузы из Китая в любой город РФ от 20 кг</p>
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
      <div className="hero-dock wrap-wide" id="hero-calc">
        <div className="hero-trap">
          <img src={assetUrl("/images/uslugi/04.jpg")} alt="Склад CARGO 575: консолидация партий" />
          <button type="button" className="hero-stamp" onClick={() => openLead("hero")}>
            Расчёт
            <b>цены</b>
          </button>
        </div>
        <aside className="hero-form">
          <p className="eyebrow">Мини-расчёт</p>
          <h2>Параметры груза</h2>
          <p>Логист подберёт несколько вариантов по цене и сроку.</p>
          <LeadForm source="hero" mode="hero" cta="Рассчитать доставку" />
        </aside>
      </div>
    </section>
  );
}

