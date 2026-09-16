////////////////////////////////////////////////////////
//
// Пин-сцена: блок стоит на экране, прогресс идёт от скролла
//
////////////////////////////////////////////////////////

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

export type PinPhase = "before" | "active" | "after";

/** Доля трека на маршрут; дальше — плавное подтягивание низа */
const JOURNEY_END = 0.78;

/** Длительность подтягивания следующего блока */
const RELEASE_MS = 1400;

/** Дополнительно: жест вниз ускоряет подтягивание */
const RELEASE_GESTURE_PX = 900;

function easeInOutCubic(t: number) {
  const x = Math.min(1, Math.max(0, t));
  return x < 0.5 ? 4 * x * x * x : 1 - ((-2 * x + 2) ** 3) / 2;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/**
 * Прогресс 0…1 только вперёд.
 * После «России» следующий блок плавно подтягивается к карточкам — без резкого скачка.
 */
export function useScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const maxRaw = useRef(0);
  const releaseAmount = useRef(0);
  const lockedRange = useRef(0);
  const releaseStartH = useRef(0);
  const releaseEndH = useRef(0);
  const releaseStartNext = useRef(0);
  const releaseEndNext = useRef(0);
  const finishSceneTop = useRef<number | null>(null);
  const releasingRef = useRef(false);
  const doneRef = useRef(false);
  const touchY = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<PinPhase>("before");
  const [done, setDone] = useState(false);
  const [releasing, setReleasing] = useState(false);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (!done) return;
    const node = ref.current;
    const targetTop = finishSceneTop.current;
    if (!node || targetTop == null) return;

    node.style.height = "";
    const scene = node.querySelector(".process-scene");
    if (!scene) return;

    const delta = scene.getBoundingClientRect().top - targetTop;
    finishSceneTop.current = null;
    if (Math.abs(delta) > 0.5) {
      const root = document.scrollingElement as HTMLElement | null;
      if (root) root.scrollTop += delta;
      else document.documentElement.scrollTop += delta;
    }
  }, [done]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (reduced) {
      doneRef.current = true;
      setProgress(1);
      setPhase("after");
      setDone(true);
      node.style.height = "";
      return;
    }

    let frame = 0;
    let releaseFrame = 0;
    let alive = true;

    const lockRange = () => {
      if (lockedRange.current > 0) return;
      lockedRange.current = Math.max(node.offsetHeight - window.innerHeight, 1);
    };

    /** Кадр подтягивания: высота и позиция следующего блока синхронно */
    const applyPullFrame = () => {
      // Линейно — равномерное «потихоньку», без рывка в середине
      const p = Math.min(1, Math.max(0, releaseAmount.current));
      const height = lerp(releaseStartH.current, releaseEndH.current, easeInOutCubic(p));
      node.style.height = `${height}px`;

      const next = node.parentElement?.nextElementSibling as HTMLElement | null;
      if (!next) return releaseAmount.current;

      const desired = lerp(releaseStartNext.current, releaseEndNext.current, p);
      void node.offsetHeight;
      const nextDoc = next.getBoundingClientRect().top + window.scrollY;
      const top = Math.max(0, nextDoc - desired);
      // window.scrollTo + scroll-behavior:smooth в проекте даёт сбой — пишем в scrollTop
      const root = document.scrollingElement as HTMLElement | null;
      if (root) root.scrollTop = top;
      else document.documentElement.scrollTop = top;
      return releaseAmount.current;
    };

    const finishJourney = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      releasingRef.current = false;
      releaseAmount.current = 1;
      applyPullFrame();

      const scene = node.querySelector(".process-scene");
      finishSceneTop.current = scene?.getBoundingClientRect().top ?? 0;

      document.documentElement.style.overflowAnchor = "";
      document.documentElement.style.scrollBehavior = "";
      const next = node.parentElement?.nextElementSibling as HTMLElement | null;
      if (next) next.style.overflowAnchor = "";

      setReleasing(false);
      setProgress(1);
      setPhase("after");
      setDone(true);
    };

    const beginRelease = () => {
      if (releasingRef.current || doneRef.current) return;

      const next = node.parentElement?.nextElementSibling as HTMLElement | null;
      const scene = node.querySelector(".process-scene") as HTMLElement | null;
      const wrap = scene?.querySelector(".wrap") as HTMLElement | null;
      const viewport = window.innerHeight;
      const startH = node.offsetHeight;
      const sceneStyle = scene ? getComputedStyle(scene) : null;
      const padY = sceneStyle
        ? (parseFloat(sceneStyle.paddingTop) || 0) + (parseFloat(sceneStyle.paddingBottom) || 0)
        : 0;
      const sceneH = Math.max(
        Math.round((wrap?.getBoundingClientRect().height ?? 0) + padY),
        Math.round(viewport * 0.55),
      );

      releaseStartH.current = startH;
      releaseEndH.current = sceneH;
      releaseStartNext.current = next?.getBoundingClientRect().top ?? viewport + 200;
      releaseEndNext.current = Math.min(viewport - 16, sceneH + 8);
      releaseAmount.current = 0;
      releasingRef.current = true;

      // Иначе браузер сам «якорит» скролл и рвёт подтягивание
      document.documentElement.style.overflowAnchor = "none";
      document.documentElement.style.scrollBehavior = "auto";
      if (next) next.style.overflowAnchor = "none";

      setReleasing(true);
      setProgress(1);
      setPhase("active");

      const startedAt = performance.now();

      const tick = (now: number) => {
        if (!alive || doneRef.current) return;

        const timed = (now - startedAt) / RELEASE_MS;
        releaseAmount.current = Math.min(1, Math.max(releaseAmount.current, timed));
        applyPullFrame();

        if (releaseAmount.current >= 0.998) {
          finishJourney();
          return;
        }
        releaseFrame = requestAnimationFrame(tick);
      };

      releaseFrame = requestAnimationFrame(tick);
    };

    const addReleaseDelta = (deltaY: number) => {
      if (!releasingRef.current || doneRef.current) return;
      if (deltaY <= 0) return;
      releaseAmount.current = Math.min(1, releaseAmount.current + deltaY / RELEASE_GESTURE_PX);
    };

    const measure = () => {
      if (!alive || doneRef.current || releasingRef.current) return;

      const rect = node.getBoundingClientRect();
      let nextPhase: PinPhase = "before";
      let nextProgress = Math.min(1, maxRaw.current / JOURNEY_END);

      if (rect.top > 1) {
        nextPhase = "before";
        nextProgress = Math.min(1, maxRaw.current / JOURNEY_END);
        node.style.height = "";
      } else {
        lockRange();
        const raw = Math.min(1, Math.max(0, -rect.top / lockedRange.current));
        maxRaw.current = Math.max(maxRaw.current, raw);

        if (maxRaw.current >= JOURNEY_END) {
          beginRelease();
          return;
        }

        nextPhase = "active";
        nextProgress = maxRaw.current / JOURNEY_END;
        node.style.height = "";
      }

      setProgress((prev) => (Math.abs(prev - nextProgress) < 0.002 ? prev : nextProgress));
      setPhase((prev) => (prev === nextPhase ? prev : nextPhase));
    };

    const onScroll = () => {
      if (releasingRef.current) return;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        measure();
      });
    };

    const onWheel = (event: WheelEvent) => {
      if (!releasingRef.current || doneRef.current) return;
      event.preventDefault();
      event.stopPropagation();
      addReleaseDelta(event.deltaY);
    };

    const onTouchStart = (event: TouchEvent) => {
      if (!releasingRef.current) return;
      touchY.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!releasingRef.current || doneRef.current) return;
      const y = event.touches[0]?.clientY;
      if (y == null || touchY.current == null) return;
      const delta = touchY.current - y;
      touchY.current = y;
      if (delta > 0) {
        event.preventDefault();
        addReleaseDelta(delta);
      }
    };

    const onTouchEnd = () => {
      touchY.current = null;
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      alive = false;
      cancelAnimationFrame(frame);
      cancelAnimationFrame(releaseFrame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("wheel", onWheel, true);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      node.style.height = "";
    };
  }, [reduced]);

  useEffect(() => {
    if (!done || reduced) return;
    const node = ref.current;
    if (!node) return;

    let frame = 0;
    let alive = true;

    const measure = () => {
      if (!alive) return;
      const nextPhase: PinPhase = node.getBoundingClientRect().top > 1 ? "before" : "after";
      setPhase((prev) => (prev === nextPhase ? prev : nextPhase));
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
      alive = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [done, reduced]);

  return { ref, progress, phase, done, releasing, reduced };
}
