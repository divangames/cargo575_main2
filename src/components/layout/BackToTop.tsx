////////////////////////////////////////////////////////
//
// Кнопка возврата к началу страницы
//
////////////////////////////////////////////////////////

import { ArrowUp } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import "./BackToTop.css";

const SHOW_AFTER_PX = 480;

/** Плавающая стрелка: появляется после ухода с первого экрана */
export function BackToTop() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      setVisible(window.scrollY > SHOW_AFTER_PX);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        measure();
      });
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /** Плавно поднимает страницу к hero */
  const goTop = () => {
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      className={`back-to-top${visible ? " is-visible" : ""}`}
      aria-label="Наверх"
      tabIndex={visible ? 0 : -1}
      onClick={goTop}
    >
      <span className="back-to-top-ring" aria-hidden="true" />
      <ArrowUp weight="bold" size={22} />
    </button>
  );
}
