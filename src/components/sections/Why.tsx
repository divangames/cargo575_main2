////////////////////////////////////////////////////////
//
// Почему CARGO 575
//
////////////////////////////////////////////////////////

import { stats } from "../../config/content";
import { assetUrl } from "../../helpers/assetUrl";
import { useInView } from "../../hooks/useInView";
import { Reveal } from "../ui/Reveal";
import { WhyStat } from "./WhyStat";
import "./Why.css";

/** Масштаб компании цифрами */
export function Why() {
  const { ref, visible } = useInView<HTMLUListElement>();

  return (
    <section className="block why" id="about">
      <div className="wrap-wide why-grid">
        <Reveal className="why-copy">
          <div className="section-head">
            <p className="eyebrow">Компания</p>
            <h2 className="section-title">Почему бизнес доверяет доставку CARGO 575</h2>
            <p className="section-lead">
              Большая компания с людьми и инфраструктурой по обе стороны границы. Не посредник из
              мессенджера.
            </p>
          </div>
        </Reveal>
        <div className="why-map-wrap">
          <img
            className="why-map"
            src={assetUrl("/images/map.gif")}
            alt="Карта офисов CARGO 575 в Китае и России"
            width="1000"
            height="810"
            loading="lazy"
            decoding="async"
          />
        </div>
        <ul className="why-stats" ref={ref}>
          {stats.map((item, index) => (
            <WhyStat key={item.label} item={item} active={visible} delay={index * 90} />
          ))}
        </ul>
      </div>
    </section>
  );
}
