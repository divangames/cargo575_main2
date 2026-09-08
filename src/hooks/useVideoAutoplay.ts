////////////////////////////////////////////////////////
//
// Автопроигрывание превью, пока ролик в кадре
//
////////////////////////////////////////////////////////

import { useEffect, useRef } from "react";

interface Options {
  frozen: boolean;
  reduced: boolean;
}

/** Запускает беззвучный loop только во viewport и не в модалке */
export function useVideoAutoplay({ frozen, reduced }: Options) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inViewRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    const wrap = wrapRef.current;
    if (!video || !wrap) return;

    const apply = () => {
      if (frozen || reduced || !inViewRef.current) {
        video.pause();
        return;
      }
      void video.play().catch(() => undefined);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
        apply();
      },
      { threshold: 0.35 },
    );

    observer.observe(wrap);
    apply();

    return () => observer.disconnect();
  }, [frozen, reduced]);

  return { videoRef, wrapRef };
}
