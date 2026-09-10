////////////////////////////////////////////////////////
//
// Виджет отзывов YourFB
//
////////////////////////////////////////////////////////

import { useEffect, useRef } from "react";
import "./YourFbReviews.css";

const WIDGET_SRC = "https://space.yourfb.ru/widget.js";
const WIDGET_KEY = "QAShbWb8KdqDOcaOcP8ZSrROHcpUo-fo";

/** Монтирует контейнер и подгружает скрипт виджета один раз */
export function YourFbReviews() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${WIDGET_SRC}"]`);
    if (existing) {
      existing.remove();
    }

    const script = document.createElement("script");
    script.src = WIDGET_SRC;
    script.async = true;
    script.dataset.widgetKey = WIDGET_KEY;
    host.insertAdjacentElement("afterend", script);

    return () => {
      script.remove();
      host.replaceChildren();
    };
  }, []);

  return <div id="yourfb-reviews" ref={hostRef} className="yourfb-reviews" />;
}
