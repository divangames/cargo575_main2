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

    const visibleSections = new Map<HTMLElement, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleSections.set(entry.target as HTMLElement, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        const visible = [...visibleSections.entries()]
          .filter(([, ratio]) => ratio > 0)
          .sort(([, ratioA], [, ratioB]) => ratioB - ratioA)[0]?.[0];

        setActive(visible?.id ? `#${visible.id}` : "");
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0, 0.1, 0.25, 0.5] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [hrefs]);

  return active;
}
