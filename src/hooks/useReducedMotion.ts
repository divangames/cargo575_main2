////////////////////////////////////////////////////////
//
// Учёт prefers-reduced-motion
//
////////////////////////////////////////////////////////

import { useEffect, useState } from "react";

/** Возвращает true, если пользователь просит меньше анимации */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return reduced;
}
