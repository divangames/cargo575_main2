////////////////////////////////////////////////////////
//
// Подсветка пункта меню по видимому разделу
//
////////////////////////////////////////////////////////

import { useEffect, useState } from "react";

/** Следит, какой якорь сейчас в центре экрана */
export function useActiveSection(hrefs: readonly string[]) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const nodes = hrefs
      .map((href) => document.getElementById(href.replace("#", "")))
      .filter((node): node is HTMLElement => Boolean(node));

    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActive(`#${visible.target.id}`);
        }
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0.1, 0.25, 0.5] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [hrefs]);

  return active;
}
