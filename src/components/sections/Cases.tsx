////////////////////////////////////////////////////////
//
// Примеры доставок: портретные фото-досье
//
////////////////////////////////////////////////////////

import { useState } from "react";
import { cases } from "../../config/cases";
import { useLeadModal } from "../../hooks/useLeadModal";
import { Button } from "../ui/Button";
import { PhotoLightbox } from "../ui/PhotoLightbox";
import { Reveal } from "../ui/Reveal";
import "./Cases.css";

/** Кейсы с вертикальными кадрами проверки груза */
export function Cases() {
  const { openLead } = useLeadModal();
  const [open, setOpen] = useState<{ n: string; index: number } | null>(null);
  const opened = cases.find((item) => item.n === open?.n);
  const visibleCases = cases.filter((item) => !item.hidden);

  return (
    <section className="block cases" id="reviews">
      <div className="wrap">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">Практика</p>
            <h2 className="section-title">Примеры реальных доставок из Китая</h2>
            <p className="section-lead">
              Стоимость партии публикуем после согласования. Здесь — структура реальной операции.
            </p>
          </div>
        </Reveal>
        <div className="case-track">
          {visibleCases.map((item) => {
            const cover = item.images[0];
            const extra = item.images.length;

            return (
              <article className="case-card" key={item.n}>
                <div className="case-photo">
                  {cover ? (
                    <button
                      type="button"
                      className="case-photo-btn"
                      onClick={() => setOpen({ n: item.n, index: 0 })}
                      aria-label={
                        extra > 1 ? `Открыть фотоотчёт: ${extra} фото` : `Открыть фото: ${cover.alt}`
                      }
                    >
                      <img
                        src={cover.src}
                        alt={cover.alt}
                        width={900}
                        height={1200}
                        loading="lazy"
                        decoding="async"
                      />
                    </button>
                  ) : null}
                  <span className="case-num">{item.n}</span>
                  {extra > 1 ? (
                    <span className="case-shots">{extra} фото</span>
                  ) : null}
                  <span className="case-cat">{item.category}</span>
                </div>
                <div className="case-body">
                  <h3>{item.route}</h3>
                  <ul className="case-stats">
                    <li>{item.weight}</li>
                    <li>{item.volume}</li>
                    <li>{item.days}</li>
                    <li>{item.mode}</li>
                  </ul>
                  <p>{item.note}</p>
                  <p className="case-rate">{item.rate}</p>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => openLead("case", { cargo: item.category })}
                  >
                    Рассчитать похожий груз
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
      {opened && open ? (
        <PhotoLightbox
          items={opened.images}
          index={open.index}
          onIndexChange={(index) => setOpen({ n: opened.n, index })}
          onClose={() => setOpen(null)}
        />
      ) : null}
    </section>
  );
}
