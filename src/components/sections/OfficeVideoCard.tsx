////////////////////////////////////////////////////////
//
// Превью склада: беззвучный loop и вход в плеер
//
////////////////////////////////////////////////////////

import { Play } from "@phosphor-icons/react";
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
  const { videoRef, wrapRef } = useVideoAutoplay({ frozen, reduced });

  return (
    <div className="off-card" ref={wrapRef}>
      <video
        ref={videoRef}
        poster={office.image}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src={encodeURI(office.video)} type="video/mp4" />
      </video>
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
