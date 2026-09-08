////////////////////////////////////////////////////////
//
// Полноэкранный плеер склада с жестом закрытия
//
////////////////////////////////////////////////////////

import { X } from "@phosphor-icons/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSwipeDownClose } from "../../hooks/useSwipeDownClose";
import type { ChinaOffice } from "../../types/office";
import { VideoPlayerBar } from "./VideoPlayerBar";
import "./VideoLightbox.css";

interface Props {
  office: ChinaOffice;
  onClose: () => void;
}

/** Модалка: на десктопе окно, на телефоне весь экран */
export function VideoLightbox({ office, onClose }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { offset, onTouchStart, onTouchMove, onTouchEnd } = useSwipeDownClose(onClose, true);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === " ") {
        event.preventDefault();
        const video = videoRef.current;
        if (!video) return;
        if (video.paused) void video.play();
        else video.pause();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  /** Пауза или продолжение по кнопке и по кадру */
  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play();
    else video.pause();
  }, []);

  /** Перемотка ползунком */
  const onSeek = useCallback((value: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = value;
    setCurrent(value);
  }, []);

  /** Вкл/выкл звук */
  const onToggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }, []);

  /** Громкость */
  const onVolume = useCallback((value: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.volume = value;
    video.muted = value === 0;
    setVolume(value);
    setMuted(value === 0);
  }, []);

  return (
    <div className="vlb-root" role="presentation">
      <button className="vlb-backdrop" type="button" aria-label="Закрыть видео" onClick={onClose} />
      <div
        className="vlb-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="vlb-title"
        style={{ transform: offset ? `translateY(${offset}px)` : undefined }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <p id="vlb-title" className="vlb-title">
          {office.city}
          <span>{office.role}</span>
        </p>
        <button type="button" className="vlb-x" onClick={onClose} aria-label="Закрыть">
          <X size={22} weight="bold" />
        </button>
        <div className="vlb-frame">
          <video
            ref={videoRef}
            className="vlb-video"
            poster={office.image}
            autoPlay
            playsInline
            onClick={togglePlay}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onTimeUpdate={(event) => setCurrent(event.currentTarget.currentTime)}
            onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
            onDurationChange={(event) => setDuration(event.currentTarget.duration)}
          >
            <source src={encodeURI(office.video)} type="video/mp4" />
          </video>
        </div>
        <VideoPlayerBar
          playing={playing}
          muted={muted}
          volume={volume}
          current={current}
          duration={duration}
          onTogglePlay={togglePlay}
          onSeek={onSeek}
          onToggleMute={onToggleMute}
          onVolume={onVolume}
        />
      </div>
    </div>
  );
}
