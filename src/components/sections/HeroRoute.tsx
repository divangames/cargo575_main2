import { VectorJourney } from "./VectorJourney";
import { useEffect, useRef, useState } from "react";

const stages = [
  { title: "Всё начинается в Китае", text: "Принимаем и объединяем партии на складе.", label: "Приём груза", country: "КИТАЙ" },
  { title: "Километры под контролем", text: "Ваш груз едет в Россию по согласованному маршруту.", label: "В пути", country: "КИТАЙ → РОССИЯ" },
  { title: "Ближе к вашему бизнесу", text: "Доставляем в любой город России.", label: "Получение", country: "РОССИЯ" },
];

/** Иллюстрация этапов доставки. Автовоспроизведение только на больших экранах. */
export function HeroRoute() {
  const root = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [motionAllowed, setMotionAllowed] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 900px) and (prefers-reduced-motion: no-preference)");
    const update = () => setMotionAllowed(media.matches);
    update();
    media.addEventListener("change", update);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .15 });
    if (root.current) observer.observe(root.current);
    const onVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      media.removeEventListener("change", update);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const playing = motionAllowed && visible && pageVisible && !paused && !focused;
  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => setStage((current) => (current + 1) % stages.length), 9000);
    return () => window.clearTimeout(timer);
  }, [stage, playing]);

  return (
    <div ref={root} className={`freight-scene ${playing ? "is-playing" : "is-still"}`} data-stage={stage}
      onFocusCapture={(event) => { if (event.target.matches(":focus-visible")) setFocused(true); }}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
      >
      <div className="freight-topline"><span><i /> МЕЖДУНАРОДНАЯ АВТОДОСТАВКА</span><span>575 / ROAD FREIGHT</span></div>
      <div className="freight-visual"><VectorJourney stage={stage} playing={playing}/></div>
      <div className="freight-console">
        <div className="freight-console-header"><span>ВАШ ГРУЗ. НАШ МАРШРУТ.</span>
          <button className="freight-play" type="button" onClick={() => { setPaused((value) => !value); setFocused(false); }} aria-label={paused ? "Включить анимацию маршрута" : "Приостановить анимацию маршрута"} aria-pressed={paused} title={paused ? "Включить анимацию" : "Приостановить анимацию"}><span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span></button>
        </div>
        <div className="freight-caption" aria-live={playing ? "off" : "polite"} aria-atomic="true">
          <div className="freight-caption-text" key={stage}><span>{stages[stage].country}</span><h2>{stages[stage].title}</h2><p>{stages[stage].text}</p></div>
          <span className="freight-step-number" aria-hidden="true">0{stage + 1}<small>/03</small></span>
        </div>
        <div className="freight-stages" aria-label="Этапы доставки">
          {stages.map((item, index) => <button key={item.label} type="button" aria-pressed={index === stage} className={index === stage ? "is-active" : ""} onClick={() => { setStage(index); setFocused(false); }}><span className="freight-stage-line"><i key={`${stage}-${playing}`} /></span><span><small>0{index + 1}</small>{item.label}<b aria-hidden="true">↗</b></span></button>)}
        </div>
      </div>
    </div>
  );
}




