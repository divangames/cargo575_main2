////////////////////////////////////////////////////////
//
// Компания: карта, фото Китая, города и ролики складов
//
////////////////////////////////////////////////////////

import { useCallback, useState } from "react";
import { chinaOffices, russiaOffices, stats } from "../../config/content";
import { assetUrl } from "../../helpers/assetUrl";
import { useInView } from "../../hooks/useInView";
import { useViewportActive } from "../../hooks/useViewportActive";
import type { ChinaOffice } from "../../types/office";
import { Reveal } from "../ui/Reveal";
import { VideoLightbox } from "../ui/VideoLightbox";
import { ChinaPhotoCarousel } from "./ChinaPhotoCarousel";
import { OfficeVideoCard } from "./OfficeVideoCard";
import { WhyStat } from "./WhyStat";
import "./Offices.css";
import "./Why.css";

const chinaVideos = chinaOffices.filter((item) => item.video);

/** Масштаб компании, фото присутствия и офисы */
export function Why() {
  const { ref, visible } = useInView<HTMLUListElement>();
  const { ref: mapRef, active: mapActive } = useViewportActive<HTMLDivElement>(0.08);
  const [active, setActive] = useState<ChinaOffice | null>(null);
  const closePlayer = useCallback(() => setActive(null), []);

  return (
    <section className="block why" id="about">
      <div className="wrap-wide why-grid">
        <Reveal className="why-copy">
          <div className="section-head">
            <p className="eyebrow">Компания</p>
            <h2 className="section-title why-title">
              <span className="why-title-line">Почему бизнес</span>
              <span className="why-title-line">доверяет доставку</span>
              <span className="why-title-line">CARGO 575</span>
            </h2>
            <p className="section-lead">
              Большая компания с людьми и инфраструктурой по обе стороны границы. Не посредник из
              мессенджера.
            </p>
          </div>
        </Reveal>
        <div className="why-map-wrap" ref={mapRef}>
          {mapActive ? (
            <img
              className="why-map"
              src={assetUrl("/images/map.gif")}
              alt="Карта офисов CARGO 575 в Китае и России"
              width="1000"
              height="810"
              loading="lazy"
              decoding="async"
            />
          ) : null}
        </div>
        <ul className="why-stats" ref={ref}>
          {stats.map((item, index) => (
            <WhyStat key={item.label} item={item} active={visible} delay={index * 90} />
          ))}
        </ul>
        <div className="why-carousel">
          <ChinaPhotoCarousel />
        </div>
        <div className="why-places" id="offices">
          <p className="off-ru-title">6 офисов в Китае</p>
          <div className="off-tags" aria-label="Офисы в Китае">
            {chinaOffices.map((item) => (
              <span key={item.city}>{item.city}</span>
            ))}
          </div>
          <p className="off-ru-title">Представители в городах России</p>
          <div className="off-tags" aria-label="Представители в городах России">
            {russiaOffices.map((city) => (
              <span key={city}>{city}</span>
            ))}
          </div>
        </div>
        <div className="why-videos off-videos">
          <p className="off-ru-title why-video-title">Видео из офисов</p>
          {chinaVideos.map((office) => (
            <OfficeVideoCard
              key={office.city}
              office={office}
              frozen={Boolean(active)}
              onOpen={() => setActive(office)}
            />
          ))}
        </div>
      </div>
      {active ? <VideoLightbox office={active} onClose={closePlayer} /> : null}
    </section>
  );
}
