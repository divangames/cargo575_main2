////////////////////////////////////////////////////////
//
// Активность элемента только внутри viewport
//
////////////////////////////////////////////////////////

import { useEffect, useRef, useState } from "react";

/** Возвращает true, пока элемент виден на экране и вкладка активна. */
export function useViewportActive<T extends HTMLElement>(threshold = 0.12, rootMargin = "0px") {
  const ref = useRef<T>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let intersecting = false;
    const apply = () => setActive(intersecting && !document.hidden);
    const observer = new IntersectionObserver(
      ([entry]) => {
        intersecting = entry.isIntersecting;
        apply();
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    document.addEventListener("visibilitychange", apply);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", apply);
    };
  }, [rootMargin, threshold]);

  return { ref, active };
}
