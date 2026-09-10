////////////////////////////////////////////////////////
//
// Полноэкранный просмотр фото: затемнение и крестик как у форм
//
////////////////////////////////////////////////////////

import { useEffect } from "react";
import "./PhotoLightbox.css";

interface Props {
  src: string;
  alt: string;
  onClose: () => void;
}

/** Фото на весь экран поверх затемнённого фона */
export function PhotoLightbox({ src, alt, onClose }: Props) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="photo-lb" role="presentation">
      <button className="photo-lb-backdrop" type="button" aria-label="Закрыть" onClick={onClose} />
      <div className="photo-lb-panel" role="dialog" aria-modal="true" aria-label={alt}>
        <button type="button" className="photo-lb-x" onClick={onClose} aria-label="Закрыть">
          ×
        </button>
        <img src={src} alt={alt} />
      </div>
    </div>
  );
}
