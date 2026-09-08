////////////////////////////////////////////////////////
//
// Панель плеера: пауза, перемотка, звук
//
////////////////////////////////////////////////////////

import { Pause, Play, SpeakerHigh, SpeakerSlash } from "@phosphor-icons/react";
import { formatMediaTime } from "../../helpers/formatMediaTime";

interface Props {
  playing: boolean;
  muted: boolean;
  volume: number;
  current: number;
  duration: number;
  onTogglePlay: () => void;
  onSeek: (value: number) => void;
  onToggleMute: () => void;
  onVolume: (value: number) => void;
}

/** Нижняя панель управления роликом */
export function VideoPlayerBar({
  playing,
  muted,
  volume,
  current,
  duration,
  onTogglePlay,
  onSeek,
  onToggleMute,
  onVolume,
}: Props) {
  const safeDuration = duration > 0 ? duration : 0;

  return (
    <div className="vlb-bar">
      <button type="button" className="vlb-ctrl" onClick={onTogglePlay} aria-label={playing ? "Пауза" : "Воспроизвести"}>
        {playing ? <Pause size={22} weight="fill" /> : <Play size={22} weight="fill" />}
      </button>
      <span className="vlb-time">{formatMediaTime(current)}</span>
      <label className="vlb-seek">
        <span className="sr-only">Перемотка</span>
        <input
          type="range"
          min={0}
          max={safeDuration || 0}
          step={0.1}
          value={Math.min(current, safeDuration)}
          onChange={(event) => onSeek(Number(event.target.value))}
        />
      </label>
      <span className="vlb-time">{formatMediaTime(safeDuration)}</span>
      <button type="button" className="vlb-ctrl" onClick={onToggleMute} aria-label={muted || volume === 0 ? "Включить звук" : "Выключить звук"}>
        {muted || volume === 0 ? <SpeakerSlash size={22} weight="fill" /> : <SpeakerHigh size={22} weight="fill" />}
      </button>
      <label className="vlb-vol">
        <span className="sr-only">Громкость</span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={muted ? 0 : volume}
          onChange={(event) => onVolume(Number(event.target.value))}
        />
      </label>
    </div>
  );
}
