////////////////////////////////////////////////////////
//
// Пин-сцена: блок стоит на экране, прогресс идёт от скролла
//
////////////////////////////////////////////////////////

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

export type PinPhase = "before" | "active" | "after";

/** Пока трек в зоне экрана — сцена зафиксирована, прогресс 0…1 */
export function useScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<PinPhase>("before");
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (reduced) {
      setProgress(1);
      setPhase("after");
      return;
    }

    let frame = 0;
    let alive = true;

    const measure = () => {
      if (!alive) return;
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight;
      const range = Math.max(node.offsetHeight - viewport, 1);

      let nextProgress = 0;
      let nextPhase: PinPhase = "before";

      if (rect.top > 1) {
        nextPhase = "before";
        nextProgress = 0;
      } else if (rect.bottom <= viewport + 1) {
        nextPhase = "after";
        nextProgress = 1;
      } else {
        nextPhase = "active";
        nextProgress = Math.min(1, Math.max(0, -rect.top / range));
      }

      setProgress((prev) => (Math.abs(prev - nextProgress) < 0.002 ? prev : nextProgress));
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
    window.addEventListener("resize", onScroll);
    return () => {
      alive = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced]);

  return { ref, progress, phase, reduced };
}
