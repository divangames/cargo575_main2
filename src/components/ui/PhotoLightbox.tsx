////////////////////////////////////////////////////////
//
// Полноэкранная галерея фото: листание, свайп и клавиатура
//
////////////////////////////////////////////////////////

import { useCallback, useEffect, useRef, type PointerEvent } from "react";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import "./PhotoLightbox.css";

export interface PhotoLightboxItem {
  src: string;
  alt: string;
}

interface Props {
  items: PhotoLightboxItem[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

/** Следующий или предыдущий кадр с зацикливанием */
function loopIndex(next: number, count: number): number {
  return (next + count) % count;
}

/** Полноэкранный просмотр с перелистыванием галереи */
export function PhotoLightbox({ items, index, onIndexChange, onClose }: Props) {
  const swipe = useRef<{ x: number; y: number; locked: "x" | "y" | null } | null>(null);
  const item = items[index];
  const count = items.length;
  const canNavigate = count > 1;

  const goPrev = useCallback(() => {
    if (!canNavigate) return;
    onIndexChange(loopIndex(index - 1, count));
  }, [canNavigate, count, index, onIndexChange]);

  const goNext = useCallback(() => {
    if (!canNavigate) return;
    onIndexChange(loopIndex(index + 1, count));
  }, [canNavigate, count, index, onIndexChange]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [goNext, goPrev, onClose]);

  /** Горизонтальный свайп переключает кадры на телефоне */
  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!canNavigate) return;
    swipe.current = { x: event.clientX, y: event.clientY, locked: null };
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const state = swipe.current;
    if (!state) return;
    const dx = event.clientX - state.x;
    const dy = event.clientY - state.y;
    if (!state.locked) {
      if (Math.abs(dx) < 12 && Math.abs(dy) < 12) return;
      state.locked = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
    }
    if (state.locked === "x") {
      event.preventDefault();
    }
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    const state = swipe.current;
    swipe.current = null;
    if (!state || state.locked !== "x") return;
    const dx = event.clientX - state.x;
    if (Math.abs(dx) < 48) return;
    if (dx < 0) goNext();
    else goPrev();
  }

  if (!item) {
    return null;
  }

  return (
    <div className="photo-lb" role="presentation">
      <button className="photo-lb-backdrop" type="button" aria-label="Закрыть" onClick={onClose} />
      <div
        className="photo-lb-panel"
        role="dialog"
        aria-modal="true"
        aria-label={item.alt}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          swipe.current = null;
        }}
      >
        <button type="button" className="photo-lb-x" onClick={onClose} aria-label="Закрыть">
          ×
        </button>
        {canNavigate ? (
          <>
            <button type="button" className="photo-lb-nav is-prev" aria-label="Предыдущее фото" onClick={goPrev}>
              <CaretLeftIcon weight="bold" size={22} aria-hidden />
            </button>
            <button type="button" className="photo-lb-nav is-next" aria-label="Следующее фото" onClick={goNext}>
              <CaretRightIcon weight="bold" size={22} aria-hidden />
            </button>
            <p className="photo-lb-counter" aria-live="polite">
              {index + 1} / {count}
            </p>
          </>
        ) : null}
        <img key={item.src} src={item.src} alt={item.alt} draggable={false} />
      </div>
    </div>
  );
}
