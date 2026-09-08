////////////////////////////////////////////////////////
//
// Этапы доставки: линия Китай → Россия и грузовик
//
////////////////////////////////////////////////////////

import type { CSSProperties } from "react";
import { steps } from "../../config/content";
import { assetUrl } from "../../helpers/assetUrl";
import { useScrollProgress } from "../../hooks/useScrollProgress";
import "./Process.css";

interface RouteStyle extends CSSProperties {
  "--proc-progress": number;
}

/** Карточки равномерно открываются на пине; последняя — почти у отпуска экрана */
function isStepOpen(index: number, progress: number, total: number, reduced: boolean) {
  if (reduced || total <= 1) return true;
  const first = 0.04;
  const last = 0.97;
  const point = first + (index / (total - 1)) * (last - first);
  return progress >= point;
}

/** Маршрут Китай → Россия: экран стоит, грузовик едет, затем страница едет дальше */
export function Process() {
  const { ref, progress, phase, reduced } = useScrollProgress();

  return (
    <section className={`process${reduced ? " is-static" : ""}`} id="process">
      <div className="process-pin" ref={ref} style={{ "--proc-progress": progress } as RouteStyle}>
        <div className={`process-scene is-${phase}`}>
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">Процесс</p>
              <h2 className="section-title">Как проходит доставка груза из Китая</h2>
            </div>

            <div className="proc-route" aria-hidden="true">
              <div className="proc-rail">
                <span className="proc-rail-fill" />
                <div className="proc-truck-shift">
                  <img className="proc-truck" src={assetUrl("/assets/car.svg?v=2")} alt="" width="114" height="47" decoding="async" />
                </div>
              </div>
              <div className="proc-ends">
                <span>Китай</span>
                <span>Россия</span>
              </div>
            </div>

            <ol className="proc-list">
              {steps.map((item, index) => (
                <li key={item.n} className={isStepOpen(index, progress, steps.length, reduced) ? "is-on" : ""}>
                  <b>{item.n}</b>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
