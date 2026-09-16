////////////////////////////////////////////////////////
//
// Пин-сцена маршрута: грузовик едет, карточки открываются
//
////////////////////////////////////////////////////////

import type { CSSProperties } from "react";
import { assetUrl } from "../../helpers/assetUrl";
import { useScrollProgress } from "../../hooks/useScrollProgress";
import "./RoutePinScene.css";

export interface RoutePinItem {
  n: string;
  title: string;
  text: string;
}

interface Props {
  id: string;
  eyebrow: string;
  title: string;
  items: readonly RoutePinItem[];
  surface?: "paper" | "white";
}

interface RouteStyle extends CSSProperties {
  "--proc-progress": number;
  "--pin-steps": number;
}

const FIRST_STEP = 0.04;
const LAST_STEP = 0.97;

/** Позиция этапа на маршруте; последняя карточка открывается почти у отпуска экрана. */
function stepPoint(index: number, total: number) {
  if (total <= 1) return 0;
  return FIRST_STEP + (index / (total - 1)) * (LAST_STEP - FIRST_STEP);
}

function isStepOpen(index: number, progress: number, total: number, reduced: boolean) {
  return reduced || progress >= stepPoint(index, total);
}

/** Один текущий этап связывает положение машины с карточкой. */
function currentStepIndex(progress: number, total: number, reduced: boolean) {
  if (reduced || total === 0) return -1;

  let current = 0;
  for (let index = 1; index < total; index += 1) {
    if (progress < stepPoint(index, total)) break;
    current = index;
  }
  return current;
}

/** Общий блок: экран стоит, грузовик едет Китай → Россия, затем страница едет дальше */
export function RoutePinScene({ id, eyebrow, title, items, surface = "paper" }: Props) {
  const { ref, progress, phase, reduced } = useScrollProgress();
  const currentStep = currentStepIndex(progress, items.length, reduced);

  return (
    <section className={`process${reduced ? " is-static" : ""}${surface === "white" ? " is-white" : ""}`} id={id}>
      <div
        className="process-pin"
        ref={ref}
        style={{ "--proc-progress": progress, "--pin-steps": items.length } as RouteStyle}
      >
        <div className={`process-scene is-${phase}`}>
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">{eyebrow}</p>
              <h2 className="section-title">{title}</h2>
            </div>

            <div className="proc-route" aria-hidden="true">
              <div className="proc-rail">
                <span className="proc-rail-fill" />
                <div className="proc-truck-shift">
                  <img
                    className="proc-truck"
                    src={assetUrl("/assets/car.svg?v=2")}
                    alt=""
                    width="114"
                    height="47"
                    decoding="async"
                  />
                </div>
              </div>
              <div className="proc-ends">
                <span>Китай</span>
                <span>Россия</span>
              </div>
            </div>

            <ol className="proc-list">
              {items.map((item, index) => {
                const isCurrent = index === currentStep;
                const isOpen = isStepOpen(index, progress, items.length, reduced);

                return (
                  <li
                    key={item.n}
                    className={`${isOpen ? "is-on" : ""}${isCurrent ? " is-current" : ""}`}
                    aria-current={isCurrent ? "step" : undefined}
                  >
                    <b>{item.n}</b>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
