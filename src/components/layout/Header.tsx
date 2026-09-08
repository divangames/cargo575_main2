////////////////////////////////////////////////////////
//
// Шапка: логотип, меню всегда на виду, расчёт
//
////////////////////////////////////////////////////////

import { navItems } from "../../config/content";
import { site } from "../../config/site";
import { assetUrl } from "../../helpers/assetUrl";
import { scrollToId } from "../../helpers/scrollToId";
import { useLeadModal } from "../../hooks/useLeadModal";
import "./Header.css";

/** Фиксированная шапка: пункты меню не прячутся в бургер */
export function Header() {
  const { openLead } = useLeadModal();

  return (
    <header className="header">
      <div className="header-bar">
        <a className="logo" href="#top" aria-label="CARGO 575 — наверх">
          <img src={assetUrl("/logo.svg")} alt="CARGO 575" width={140} height={69} />
        </a>
        <nav className="header-nav" aria-label="Разделы сайта">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToId(item.href);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a className="header-phone" href={site.phoneHref}>
            {site.phoneDisplay}
          </a>
          <button type="button" className="header-cta" onClick={() => openLead("header")}>
            Рассчитать
          </button>
        </div>
      </div>
    </header>
  );
}
