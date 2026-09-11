////////////////////////////////////////////////////////
//
// Бесконечная карусель фото из Китая: свайп и просмотр
//
////////////////////////////////////////////////////////

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type PointerEvent } from "react";
import { chinaPhotos } from "../../config/content";
import { PhotoLightbox } from "../ui/PhotoLightbox";
import "./ChinaPhotoCarousel.css";

const LOOP = 3;
/** Медленный уезд ленты влево, пикселей в секунду */
const CRUISE_PX_PER_SEC = 16;

/** Сдвигает индекс в среднюю копию ленты, чтобы скролл не упирался в край */
function wrapIndex(index: number, count: number) {
  const start = count;
  const end = count * 2;
  if (index < start) return index + count;
  if (index >= end) return index - count;
  return index;
}

/** Лента фото: свайп, автосдвиг влево, тап открывает кадр */
export function ChinaPhotoCarousel() {
  const count = chinaPhotos.length;
  const slides = Array.from({ length: count * LOOP }, (_, index) => chinaPhotos[index % count]);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(count);
  const [shift, setShift] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [step, setStep] = useState(240);
  const [openId, setOpenId] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);
  const drag = useRef<{
    pointer: number;
    x: number;
    y: number;
    locked: "x" | "y" | null;
    from: number;
    photoId: string | null;
  } | null>(null);
  const swiped = useRef(false);
  const cruise = useRef(0);
  const indexRef = useRef(index);
  const stepRef = useRef(step);
  const shiftRef = useRef(shift);
  const animateRef = useRef(animate);
  animateRef.current = animate;

  /** Рисует сдвиг ленты без лишнего рендера React */
  const paint = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const x = -(indexRef.current * stepRef.current) + shiftRef.current + cruise.current;
    track.style.transform = `translate3d(${x}px, 0, 0)`;
  }, []);

  useLayoutEffect(() => {
    indexRef.current = index;
    stepRef.current = step;
    shiftRef.current = shift;
    paint();
  }, [index, step, shift, paint]);

  /** Ширина карточки плюс промежуток — шаг ленты */
  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    const card = viewport?.querySelector<HTMLElement>(".china-card");
    if (!viewport || !card) return;
    const styles = getComputedStyle(viewport);
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 12;
    setStep(card.getBoundingClientRect().width + gap);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  /** После анимации прыжок на среднюю копию без вспышки */
  const settle = useCallback(() => {
    setIndex((current) => {
      const next = wrapIndex(current, count);
      if (next !== current) {
        setAnimate(false);
        window.requestAnimationFrame(() => setAnimate(true));
      }
      return next;
    });
  }, [count]);

  /** Сброс жеста без открытия фото */
  const resetDrag = useCallback(() => {
    drag.current = null;
    setShift(0);
    setAnimate(true);
  }, []);

  /** Начинаем жест: запоминаем карточку под пальцем */
  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const photoId = (event.target as HTMLElement).closest<HTMLElement>("[data-photo]")?.dataset.photo ?? null;
    swiped.current = false;
    cruise.current = 0;
    drag.current = {
      pointer: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      locked: null,
      from: 0,
      photoId,
    };
  };

  /** Горизонтальный жест двигает ленту, вертикальный отдаём странице */
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const state = drag.current;
    if (!state || state.pointer !== event.pointerId) return;
    const dx = event.clientX - state.x;
    const dy = event.clientY - state.y;
    if (!state.locked) {
      if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
      state.locked = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      if (state.locked === "x") {
        swiped.current = true;
        event.currentTarget.setPointerCapture(event.pointerId);
      }
    }
    if (state.locked !== "x") return;
    event.preventDefault();
    state.from = dx;
    setAnimate(false);
    setShift(dx);
  };

  /** Отпускание: либо шаг ленты, либо открытие фото */
  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const state = drag.current;
    if (!state || state.pointer !== event.pointerId) return;
    drag.current = null;
    if (state.locked === "x") {
      const go = Math.abs(state.from) > step * 0.22 ? (state.from < 0 ? 1 : -1) : 0;
      setShift(0);
      setAnimate(true);
      if (go) setIndex((current) => current + go);
      return;
    }
    if (state.photoId && !swiped.current) {
      setOpenId(state.photoId);
    }
  };

  /** Браузер забрал жест (скролл страницы) — ленту не трогаем */
  const onPointerCancel = () => {
    if (!drag.current) return;
    resetDrag();
  };

  /** Тап по карточке: открыть, если это не свайп */
  const onCardClick = (photoId: string) => {
    if (swiped.current) return;
    setOpenId(photoId);
  };

  /** Медленный уезд влево, пока лента в кадре и нет жеста */
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    let visible = false;
    let frame = 0;
    let last = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.2 },
    );
    observer.observe(viewport);

    const tick = (now: number) => {
      frame = window.requestAnimationFrame(tick);
      if (!last) {
        last = now;
        return;
      }
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const paused = !motion.matches || !visible || hovering || Boolean(openId) || Boolean(drag.current);
      if (paused) return;
      if (animateRef.current) {
        animateRef.current = false;
        setAnimate(false);
      }
      cruise.current -= CRUISE_PX_PER_SEC * dt;
      const cardStep = stepRef.current;
      if (cardStep > 0 && cruise.current <= -cardStep) {
        cruise.current += cardStep;
        setIndex((current) => wrapIndex(current + 1, count));
      }
      paint();
    };

    frame = window.requestAnimationFrame(tick);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [count, hovering, openId, paint]);

  const openedIndex = chinaPhotos.findIndex((item) => item.id === openId);

  return (
    <div className="china-carousel">
      <div
        className="china-viewport"
        ref={viewportRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") setHovering(true);
        }}
        onPointerLeave={() => setHovering(false)}
        onTransitionEnd={(event) => {
          if (event.propertyName === "transform") settle();
        }}
      >
        <div className={`china-track${animate ? " is-soft" : ""}`} ref={trackRef}>
          {slides.map((item, slideIndex) => (
            <button
              key={`${item.id}-${slideIndex}`}
              type="button"
              className="china-card"
              data-photo={item.id}
              aria-label={`Открыть фото ${item.id}`}
              onClick={() => onCardClick(item.id)}
            >
              <img src={item.src} alt="" loading="lazy" decoding="async" draggable={false} />
            </button>
          ))}
        </div>
      </div>
      {openId && openedIndex >= 0 ? (
        <PhotoLightbox
          items={chinaPhotos.map((photo) => ({ src: photo.src, alt: photo.alt }))}
          index={openedIndex}
          onIndexChange={(next) => setOpenId(chinaPhotos[next]?.id ?? null)}
          onClose={() => setOpenId(null)}
        />
      ) : null}
    </div>
  );
}
