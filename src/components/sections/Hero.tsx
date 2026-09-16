////////////////////////////////////////////////////////
//
// Первый экран: оффер и интерактивная схема автодоставки
//
////////////////////////////////////////////////////////

import { Play } from "@phosphor-icons/react";
import { useState } from "react";
import { guangzhouOffice, heroChips, heroFacts } from "../../config/content";
import { assetUrl } from "../../helpers/assetUrl";
import { useLeadModal } from "../../hooks/useLeadModal";
import { useViewportActive } from "../../hooks/useViewportActive";
import { Button } from "../ui/Button";
import { VideoLightbox } from "../ui/VideoLightbox";
import { Wave } from "../ui/Wave";
import { HeroChipIcon } from "./HeroChipIcon";
import { HeroRoute } from "./HeroRoute";
import { HeroRouteMark } from "./HeroRouteMark";
import "./Hero.css";

/** Главный оффер: на мобильном — фото, видео офиса и сцена с фурой */
export function Hero() {
  const { openLead } = useLeadModal();
  const [officeOpen, setOfficeOpen] = useState(false);
  const { ref, active } = useViewportActive<HTMLElement>(0.08);

  return (
    <section ref={ref} className={`hero${active ? " is-in-view" : ""}`} id="top">
      <div className="hero-poster">
        <div className="hero-poster-fx" aria-hidden="true" />
        <div className="hero-main wrap-wide">
          <div className="hero-copy">
            <HeroRouteMark />
            <p className="eyebrow">CARGO 575 · Китай → Россия</p>
            <h1>
              <span className="hero-title-desktop">
                <span className="hero-title-brand">КАРГО</span>
                <span className="hero-title-route">доставка из Китая в Россию</span>
              </span>
              <span className="hero-title-mobile">
                <span>Карго-доставка</span>
                <span>из Китая</span>
                <span className="hero-title-mobile-last">
                  <span className="hero-title-mobile-word">в Россию</span>
                </span>
              </span>
            </h1>
            <p className="hero-sub hero-sub-desktop">
              Доставляем коммерческие грузы из Китая в любой город РФ от 20 кг
            </p>
            <p className="hero-sub hero-sub-mobile">
              Заберём товар у поставщика, проверим, застрахуем и доставим в ваш город.
              Стоимость фиксируем до отправки.
            </p>
            <figure className="hero-shot">
              <img
                src={assetUrl("/images/hero/HERO.webp?v=2")}
                alt="Встреча клиента и представителя CARGO 575 у офиса 575 Карго Синь Да"
                width={1080}
                height={1080}
                decoding="async"
                fetchPriority="high"
              />
              {guangzhouOffice ? (
                <button
                  type="button"
                  className="hero-play"
                  onClick={() => setOfficeOpen(true)}
                  aria-label="Смотреть видео из офиса в Гуанчжоу"
                >
                  <span className="hero-play-icon" aria-hidden="true">
                    <Play size={16} weight="fill" />
                  </span>
                  <span className="hero-play-label">
                    <span>Видео из офиса</span>
                    <span>в Китае</span>
                  </span>
                </button>
              ) : null}
            </figure>
            <ul className="hero-chips" aria-label="Ориентиры по доставке">
              {heroChips.map((item) => (
                <li key={item.label}>
                  <span className="hero-chip-icon">
                    <HeroChipIcon name={item.icon} />
                  </span>
                  <span className="hero-chip-copy">
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="hero-cta">
              <Button type="button" onClick={() => openLead("hero")}>
                <span className="hero-cta-desk">Рассчитать стоимость доставки</span>
                <span className="hero-cta-mob">Рассчитать доставку</span>
              </Button>
              <button type="button" className="hero-ghost" onClick={() => openLead("hero")}>
                Получить консультацию логиста
              </button>
            </div>
            <p className="hero-cta-note">Расчёт бесплатно · ответим удобным способом</p>
            <ul className="hero-facts">
              {heroFacts.map((item) => (
                <li key={item.text}>
                  <span className="hero-fact-full">{item.text}</span>
                  <span className="hero-fact-short">{item.short}</span>
                </li>
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
      {officeOpen && guangzhouOffice ? (
        <VideoLightbox office={guangzhouOffice} onClose={() => setOfficeOpen(false)} />
      ) : null}
    </section>
  );
}
