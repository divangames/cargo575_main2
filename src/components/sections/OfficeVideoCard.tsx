////////////////////////////////////////////////////////
//
// Превью склада: беззвучный loop и вход в плеер
//
////////////////////////////////////////////////////////

import { Play } from "@phosphor-icons/react";
import { useState } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useVideoAutoplay } from "../../hooks/useVideoAutoplay";
import type { ChinaOffice } from "../../types/office";

interface Props {
  office: ChinaOffice;
  frozen: boolean;
  onOpen: () => void;
}

/** Вертикальная карточка с автопроигрыванием без звука */
export function OfficeVideoCard({ office, frozen, onOpen }: Props) {
  const reduced = useReducedMotion();
  const [videoReady, setVideoReady] = useState(false);
  const { videoRef, wrapRef, inView } = useVideoAutoplay({ frozen, reduced });

  return (
    <div className={`off-card${inView ? " is-in-view" : ""}`} ref={wrapRef}>
      <video
        ref={videoRef}
        className={videoReady ? "is-ready" : undefined}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        onLoadedData={() => setVideoReady(true)}
        onCanPlay={() => setVideoReady(true)}
      >
        <source src={encodeURI(office.video)} type="video/mp4" />
      </video>
      {!videoReady && (
        <div className="off-video-loader" role="status" aria-live="polite">
          <span className="off-video-spinner" aria-hidden="true" />
          <span>Видео грузится</span>
        </div>
      )}
      <div className="off-card-label" aria-hidden="true">
        <strong>{office.city}</strong>
        <span>{office.role}</span>
      </div>
      <button
        type="button"
        className="off-play"
        onClick={onOpen}
        aria-label={`Смотреть видео: ${office.city}, ${office.role}`}
      >
        <span>
          <Play size={28} weight="fill" />
        </span>
      </button>
    </div>
  );
}
