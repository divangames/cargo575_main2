////////////////////////////////////////////////////////
//
// Анимация числа от нуля до цели
//
////////////////////////////////////////////////////////

import { useEffect, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

interface Options {
  duration?: number;
  delay?: number;
}

/** Плавно наращивает целое число, если блок виден */
export function useCountUp(target: number, active: boolean, options: Options = {}) {
  const duration = options.duration ?? 1400;
  const delay = options.delay ?? 0;
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    if (reduced) {
      setValue(target);
      return;
    }

    let frame = 0;
    let start = 0;
    const wait = window.setTimeout(() => {
      start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - (1 - t) ** 3;
        setValue(Math.round(target * eased));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, delay);

    return () => {
      window.clearTimeout(wait);
      cancelAnimationFrame(frame);
    };
  }, [active, delay, duration, reduced, target]);

  return value;
}
