////////////////////////////////////////////////////////
//
// Офисы и склады: города и два вертикальных ролика
//
////////////////////////////////////////////////////////

import { useCallback, useState } from "react";
import { chinaOffices, russiaOffices } from "../../config/content";
import type { ChinaOffice } from "../../types/office";
import { Reveal } from "../ui/Reveal";
import { VideoLightbox } from "../ui/VideoLightbox";
import { OfficeVideoCard } from "./OfficeVideoCard";
import "./Offices.css";

const chinaVideos = chinaOffices.filter((item) => item.video);

/** Физическое присутствие в Китае и России */
export function Offices() {
  const [active, setActive] = useState<ChinaOffice | null>(null);

  const closePlayer = useCallback(() => setActive(null), []);

  return (
    <section className="block offices" id="offices">
      <div className="wrap-wide off-layout">
        <Reveal className="off-copy">
          <div className="section-head">
            <p className="eyebrow">Инфраструктура</p>
            <h2 className="section-title">
              Мы действительно
              <br /> находимся
              <br /> в Китае
            </h2>
            <p className="section-lead">
              Сотрудники CARGO 575 принимают, проверяют и сопровождают грузы на месте.
            </p>
          </div>
          <div className="off-tags" aria-label="Офисы в Китае">
            {chinaOffices.map((item) => (
              <span key={item.city}>{item.city}</span>
            ))}
          </div>
          <p className="off-ru-title">14 офисов в России</p>
          <div className="off-tags" aria-label="Офисы в России">
            {russiaOffices.map((city) => (
              <span key={city}>{city}</span>
            ))}
          </div>
        </Reveal>
        <div className="off-videos">
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
