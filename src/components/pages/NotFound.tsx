////////////////////////////////////////////////////////
//
// 404: потерявшаяся посылка возвращает посетителя на маршрут
//
////////////////////////////////////////////////////////

import { ArrowLeft, MapPin, Phone } from "@phosphor-icons/react";
import { useEffect } from "react";
import { site } from "../../config/site";
import { assetUrl } from "../../helpers/assetUrl";
import "./NotFound.css";

/** Фирменная страница для неизвестных адресов */
export function NotFound() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `Страница не найдена — ${site.name}`;
    document.body.classList.add("has-not-found");
    return () => {
      document.title = previousTitle;
      document.body.classList.remove("has-not-found");
    };
  }, []);

  return (
    <main className="not-found">
      <header className="not-found__header">
        <a className="not-found__logo" href={import.meta.env.BASE_URL} aria-label="CARGO 575 — на главную">
          <img src={assetUrl("/logo.svg")} alt="CARGO 575" width={140} height={69} />
        </a>
        <a className="not-found__phone" href={site.phoneHref}>
          <Phone size={19} weight="fill" aria-hidden="true" />
          <span>{site.phoneDisplay}</span>
        </a>
      </header>

      <section className="not-found__stage" aria-labelledby="not-found-title">
        <div className="not-found__copy">
          <p className="not-found__eyebrow">Посылка сбилась с маршрута</p>
          <h1 id="not-found-title">Этой страницы нет на складе</h1>
          <p className="not-found__lead">
            Похоже, адрес указан неверно. Вернём вас на главную — там доставка из Китая идёт точно по плану.
          </p>
          <div className="not-found__actions">
            <a className="not-found__button not-found__button--primary" href={import.meta.env.BASE_URL}>
              <ArrowLeft size={20} weight="bold" aria-hidden="true" />
              На главную
            </a>
            <a className="not-found__button not-found__button--ghost" href={site.phoneHref}>
              Позвонить нам
            </a>
          </div>
        </div>

        <div className="not-found__visual" aria-hidden="true">
          <div className="not-found__number">
            <span>4</span>
            <span>0</span>
            <span>4</span>
          </div>
          <div className="not-found__orbit not-found__orbit--one" />
          <div className="not-found__orbit not-found__orbit--two" />
          {/* Десктоп: грузовик с первого экрана; мобильный — маскот-кот */}
          <img
            className="not-found__truck"
            src={assetUrl("/assets/car.svg?v=2")}
            alt=""
            width="228"
            height="94"
            decoding="async"
          />
          <img className="not-found__mascot" src={assetUrl("/mascote/hero.webp")} alt="" />
          <div className="not-found__label not-found__label--china">
            <MapPin size={16} weight="fill" /> Китай
          </div>
          <div className="not-found__label not-found__label--russia">
            Россия <MapPin size={16} weight="fill" />
          </div>
        </div>
      </section>

      <footer className="not-found__footer">
        <span>Ошибка 404</span>
        <span className="not-found__footer-line" />
        <span>Маршрут не найден</span>
      </footer>
    </main>
  );
}
