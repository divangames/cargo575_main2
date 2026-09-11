////////////////////////////////////////////////////////
//
// Подвал: контакты, мессенджеры, офисы, реквизиты
//
////////////////////////////////////////////////////////

import { useState } from "react";
import {
  ClockIcon,
  EnvelopeSimpleIcon,
  MapPinIcon,
  PhoneIcon,
} from "@phosphor-icons/react";
import { chinaOffices, russiaOffices } from "../../config/content";
import { legalLine, site } from "../../config/site";
import { assetUrl } from "../../helpers/assetUrl";
import { Modal } from "../ui/Modal";
import { SocialLinks } from "./SocialLinks";
import "./Footer.css";

/** Якорные ссылки блока услуг */
const serviceLinks = [
  { href: "#calc", label: "Расчёт карго" },
  { href: "#tariffs", label: "Авто и авиа" },
  { href: "#vykup", label: "Выкуп и оплата в юанях" },
  { href: "#included", label: "Что входит в стоимость" },
] as const;

/** Подвал лендинга: маршрут Китай — Россия, мессенджеры и реквизиты */
export function Footer() {
  const [privacy, setPrivacy] = useState(false);

  return (
    <div className="footer-shell">
      <footer className="footer" id="contacts">
      <div className="footer-stripe" aria-hidden />
      <div className="wrap-wide footer-inner">
        <div className="footer-board">
          <div className="footer-brand">
            <img
              className="footer-logo"
              src={assetUrl("/logo.svg")}
              alt="CARGO 575"
              width={150}
              height={74}
            />
            <p className="footer-lead">
              Карго доставка коммерческих грузов из Китая в любой город России.
            </p>
            <p className="footer-route" aria-hidden>
              <span>Китай</span>
              <span className="footer-route-line" />
              <span>Россия</span>
            </p>
            <ul className="footer-meta">
              <li>
                <span className="footer-icon" aria-hidden>
                  <PhoneIcon weight="bold" size={18} />
                </span>
                <a href={site.phoneHref}>{site.phoneDisplay}</a>
              </li>
              <li>
                <span className="footer-icon" aria-hidden>
                  <EnvelopeSimpleIcon weight="bold" size={18} />
                </span>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <span className="footer-icon" aria-hidden>
                  <MapPinIcon weight="bold" size={18} />
                </span>
                <span>{site.address}</span>
              </li>
              <li>
                <span className="footer-icon" aria-hidden>
                  <ClockIcon weight="bold" size={18} />
                </span>
                <span>{site.hours}</span>
              </li>
            </ul>
            <img
              className="footer-mascot"
              src={assetUrl("/mascote/cat_footer.webp")}
              alt=""
              width={320}
              height={320}
              decoding="async"
            />
            <div className="footer-socials">
              <SocialLinks />
            </div>
          </div>

          <div className="footer-aside">
            <nav className="footer-col" aria-label="Услуги">
              <h2>Услуги</h2>
              <div className="footer-chips">
                {serviceLinks.map((item) => (
                  <a key={item.href} className="footer-chip" href={item.href}>
                    {item.label}
                  </a>
                ))}
              </div>
            </nav>
            <div className="footer-col">
              <h2>Офисы в Китае</h2>
              <div className="footer-chips">
                {chinaOffices.map((item) => (
                  <a key={item.city} className="footer-chip" href="#offices">
                    {item.city}
                  </a>
                ))}
              </div>
            </div>
            <div className="footer-col">
              <h2>Представители в городах</h2>
              <div className="footer-chips is-dense">
                {russiaOffices.map((city) => (
                  <span key={city} className="footer-chip">
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <img
          className="footer-office"
          src={assetUrl("/images/office.jpg")}
          alt="Офис CARGO 575"
          width={960}
          height={540}
          loading="lazy"
          decoding="async"
        />

        <div className="footer-bottom">
          <small>
            © {new Date().getFullYear()} {site.legalName}. Все права защищены.
          </small>
          <p className="footer-legal">{legalLine}</p>
          <button type="button" onClick={() => setPrivacy(true)}>
            Политика конфиденциальности
          </button>
          <small>Отправляя заявку, вы соглашаетесь на обработку персональных данных.</small>
        </div>
      </div>
      <Modal open={privacy} title="Политика конфиденциальности" onClose={() => setPrivacy(false)}>
        <div className="privacy">
          <p>
            Сайт собирает имя и контакт из форм расчёта, чтобы логист связался с вами. Данные не
            передаются третьим лицам, кроме подрядчиков, необходимых для оказания услуги.
          </p>
          <p>
            Используя сайт, вы соглашаетесь на обработку указанных данных. Отозвать согласие можно
            письмом на {site.email}.
          </p>
        </div>
      </Modal>
    </footer>
    </div>
  );
}
