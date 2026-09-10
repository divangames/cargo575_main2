////////////////////////////////////////////////////////
//
// Шапка: стеклянная капсула, десктоп-навигация, телефон и бургер на мобильном
//
////////////////////////////////////////////////////////

import { List, X } from "@phosphor-icons/react";
import { useEffect, useId, useState } from "react";
import { navItems } from "../../config/content";
import { site } from "../../config/site";
import { assetUrl } from "../../helpers/assetUrl";
import { scrollToId } from "../../helpers/scrollToId";
import { useActiveSection } from "../../hooks/useActiveSection";
import { useLeadModal } from "../../hooks/useLeadModal";
import "./Header.css";

const NAV_HREFS = navItems.map((item) => item.href);

/** Фиксированная навигация: на десктопе капсула, на телефоне логотип, номер и бургер */
export function Header() {
  const { openLead } = useLeadModal();
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(NAV_HREFS);
  const menuId = useId();

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1080px)");
    const closeOnDesktop = () => {
      if (media.matches) setMenuOpen(false);
    };

    media.addEventListener("change", closeOnDesktop);
    return () => media.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /** Закрывает меню и скроллит к разделу */
  const goTo = (href: string) => {
    setMenuOpen(false);
    scrollToId(href);
  };

  return (
    <header className={`header${menuOpen ? " is-open" : ""}`}>
      <div className="header-bar">
        <a className="logo" href="#top" aria-label="CARGO 575 — наверх" onClick={() => setMenuOpen(false)}>
          <img src={assetUrl("/logo.svg")} alt="CARGO 575" width={140} height={69} />
        </a>
        <nav className="header-nav" aria-label="Разделы сайта">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={active === item.href ? "is-active" : undefined}
              onClick={(event) => {
                event.preventDefault();
                goTo(item.href);
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
        <div className="header-mobile-tools">
          <a className="header-phone" href={site.phoneHref}>
            {site.phoneDisplay}
          </a>
          <button
            type="button"
            className="header-burger"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X weight="bold" size={22} /> : <List weight="bold" size={22} />}
          </button>
        </div>
      </div>
      <nav
        className="header-sheet"
        id={menuId}
        aria-label="Мобильное меню"
        aria-hidden={!menuOpen}
        inert={!menuOpen ? true : undefined}
      >
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={active === item.href ? "is-active" : undefined}
            onClick={(event) => {
              event.preventDefault();
              goTo(item.href);
            }}
          >
            {item.label}
          </a>
        ))}
        <div className="header-sheet-actions">
          <a className="header-phone" href={site.phoneHref}>
            {site.phoneDisplay}
          </a>
          <button
            type="button"
            className="header-cta"
            onClick={() => {
              setMenuOpen(false);
              openLead("header");
            }}
          >
            Рассчитать
          </button>
        </div>
      </nav>
    </header>
  );
}
