////////////////////////////////////////////////////////
//
// Подвал: услуги, офисы, реквизиты, политика
//
////////////////////////////////////////////////////////

import { useState } from "react";
import { chinaOffices, russiaOffices } from "../../config/content";
import { site } from "../../config/site";
import { assetUrl } from "../../helpers/assetUrl";
import { Modal } from "../ui/Modal";
import "./Footer.css";

/** Подвал лендинга */
export function Footer() {
  const [privacy, setPrivacy] = useState(false);

  return (
    <footer className="footer" id="contacts">
      <div className="wrap-wide footer-grid">
        <div>
          <img src={assetUrl("/logo.svg")} alt="CARGO 575" width={150} height={74} />
          <p>Карго доставка коммерческих грузов из Китая в любой город России.</p>
          <a href={site.phoneHref}>{site.phoneDisplay}</a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <p>{site.address}</p>
          <p>{site.hours}</p>
          <div className="footer-messengers">
            <a href={site.whatsappHref} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          </div>
        </div>
        <div>
          <h2>Услуги</h2>
          <a href="#calc">Расчёт карго</a>
          <a href="#tariffs">Авто и авиа</a>
          <a href="#vykup">Выкуп и оплата в юанях</a>
          <a href="#included">Что входит в стоимость</a>
        </div>
        <div>
          <h2>Офисы в Китае</h2>
          {chinaOffices.map((item) => (
            <span key={item.city}>{item.city}</span>
          ))}
        </div>
        <div>
          <h2>Офисы в России</h2>
          <div className="footer-cities">
            {russiaOffices.map((city) => (
              <span key={city}>{city}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="wrap-wide footer-bottom">
        <small>© {new Date().getFullYear()} {site.legalName}. Все права защищены.</small>
        <button type="button" onClick={() => setPrivacy(true)}>
          Политика конфиденциальности
        </button>
        <small>Отправляя заявку, вы соглашаетесь на обработку персональных данных.</small>
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
  );
}
