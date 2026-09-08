////////////////////////////////////////////////////////
//
// Свайп вниз закрывает полноэкранный плеер
//
////////////////////////////////////////////////////////

import { useCallback, useRef, useState, type TouchEvent } from "react";

const CLOSE_PX = 88;
const CONTROLS_ZONE = 110;

/** Смещение панели и закрытие жестом вниз на телефоне */
export function useSwipeDownClose(onClose: () => void, enabled: boolean) {
  const [offset, setOffset] = useState(0);
  const offsetRef = useRef(0);
  const startY = useRef<number | null>(null);
  const locked = useRef(false);

  const onTouchStart = useCallback(
    (event: TouchEvent<HTMLElement>) => {
      if (!enabled) return;
      const point = event.touches[0];
      const box = event.currentTarget.getBoundingClientRect();
      const target = event.target as HTMLElement;

      if (target.closest(".vlb-x, .vlb-bar, input")) {
        locked.current = true;
        return;
      }

      if (point.clientY > box.bottom - CONTROLS_ZONE) {
        locked.current = true;
        return;
      }

      locked.current = false;
      startY.current = point.clientY;
    },
    [enabled],
  );

  const onTouchMove = useCallback(
    (event: TouchEvent<HTMLElement>) => {
      if (!enabled || locked.current || startY.current === null) return;
      const delta = Math.max(0, event.touches[0].clientY - startY.current);
      offsetRef.current = delta;
      setOffset(delta);
    },
    [enabled],
  );

  const onTouchEnd = useCallback(() => {
    if (!enabled) return;
    const shouldClose = offsetRef.current > CLOSE_PX;
    startY.current = null;
    locked.current = false;
    offsetRef.current = 0;
    setOffset(0);
    if (shouldClose) onClose();
  }, [enabled, onClose]);

  return { offset, onTouchStart, onTouchMove, onTouchEnd };
}
