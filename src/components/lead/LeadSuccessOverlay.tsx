////////////////////////////////////////////////////////
//
// Центрированный экран: заявка ушла
//
////////////////////////////////////////////////////////

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./LeadSuccessOverlay.css";

/** Автозакрытие, чтобы не держать человека на заглушке */
export const LEAD_SUCCESS_AUTO_CLOSE_MS = 3000;

interface Props {
  title: string;
  text: string;
  onClose: () => void;
}

/** Зелёная галочка, кнопка «Окей» и таймер на 3 секунды */
export function LeadSuccessOverlay({ title, text, onClose }: Props) {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const okRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    okRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => onCloseRef.current(), LEAD_SUCCESS_AUTO_CLOSE_MS);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCloseRef.current();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return createPortal(
    <div className="lead-success" role="presentation">
      <button type="button" className="lead-success-backdrop" aria-label="Закрыть" onClick={onClose} />
      <div
        className="lead-success-card"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="lead-success-title"
        aria-describedby="lead-success-text"
      >
        <span className="lead-success-halo" aria-hidden="true">
          <svg className="lead-success-mark" viewBox="0 0 64 64" fill="none">
            <circle className="lead-success-pulse" cx="32" cy="32" r="30" />
            <circle className="lead-success-fill" cx="32" cy="32" r="26" />
            <circle className="lead-success-ring" cx="32" cy="32" r="26" />
            <path className="lead-success-check" d="M20 33.2 28.2 41.2 44.4 24.4" />
          </svg>
        </span>
        <h2 id="lead-success-title">{title}</h2>
        <p id="lead-success-text">{text}</p>
        <button ref={okRef} type="button" className="lead-success-ok" onClick={onClose}>
          Окей
        </button>
        <span className="lead-success-timer" aria-hidden="true" />
      </div>
    </div>,
    document.body,
  );
}
