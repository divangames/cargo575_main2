////////////////////////////////////////////////////////
//
// Дополнительные услуги в Китае
//
////////////////////////////////////////////////////////

import { extraScenes, extraServices } from "../../config/content";
import { assetUrl } from "../../helpers/assetUrl";
import { extraServiceIcon } from "../../helpers/extraServiceIcon";
import { useLeadModal } from "../../hooks/useLeadModal";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import "./Extra.css";

type ExtraSceneId = (typeof extraScenes)[number]["id"];

/** Класс акцента карточки по сценарию */
function extraSceneTone(id: ExtraSceneId): string {
  switch (id) {
    case "logistics":
      return "is-logistics";
    case "turnkey":
      return "is-turnkey";
    default: {
      const exhaustive: never = id;
      throw new Error(`Неизвестный сценарий: ${exhaustive}`);
    }
  }
}

/** Развилка: уже купили / нужна закупка */
export function Extra() {
  const { openLead } = useLeadModal();

  return (
    <section className="block extra" id="vykup">
      <div className="wrap">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">Китай под ключ</p>
            <h2 className="section-title">Нужно больше, чем просто доставка?</h2>
            <p className="section-lead">
              Можем взять на себя работу с поставщиком и подготовку товара в Китае.
            </p>
          </div>
        </Reveal>

        <div className="extra-fork">
          {extraScenes.map((scene) => (
            <article key={scene.id} className={`extra-scene ${extraSceneTone(scene.id)}`}>
              <div className="extra-media">
                <img
                  src={assetUrl(scene.image)}
                  alt={scene.alt}
                  width={960}
                  height={600}
                  loading="lazy"
                  decoding="async"
                />
                <span className="extra-badge">{scene.badge}</span>
              </div>
              <div className="extra-body">
                <p className="extra-kicker">{scene.kicker}</p>
                <h3>{scene.title}</h3>
                <p>{scene.text}</p>
                <Button
                  type="button"
                  variant={scene.variant}
                  onClick={() => openLead("extra")}
                >
                  {scene.cta}
                </Button>
              </div>
            </article>
          ))}
        </div>

        <div className="extra-chain">
          <p className="extra-chain-label">Что можем взять на себя</p>
          <ul className="extra-list">
            {extraServices.map((item) => {
              const Icon = extraServiceIcon(item);

              return (
                <li key={item}>
                  <span className="extra-chip-icon" aria-hidden>
                    <Icon weight="bold" size={16} />
                  </span>
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
