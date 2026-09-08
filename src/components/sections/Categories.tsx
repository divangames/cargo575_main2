////////////////////////////////////////////////////////
//
// Категории товаров
//
////////////////////////////////////////////////////////

import { categories } from "../../config/content";
import { useLeadModal } from "../../hooks/useLeadModal";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import "./Categories.css";

/** Сетка категорий груза с 3D-иконками */
export function Categories() {
  const { openLead } = useLeadModal();

  return (
    <section className="block" id="uslugi">
      <div className="wrap">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">Грузы</p>
            <h2 className="section-title">Доставляем коммерческие грузы разных категорий</h2>
          </div>
        </Reveal>
        <div className="cat-grid">
          {categories.map((item) => (
            <button
              type="button"
              className="cat-card"
              key={item.name}
              onClick={() => openLead("category", { cargo: item.name })}
            >
              <span className="cat-icon" aria-hidden="true">
                <img src={item.icon} alt="" loading="lazy" decoding="async" />
              </span>
              <span className="cat-name">{item.name}</span>
            </button>
          ))}
        </div>
        <div className="cat-foot">
          <p>
            Не нашли свой товар? Есть ограничения — уточните у логиста. Не пишем «доставляем
            абсолютно всё».
          </p>
          <Button type="button" onClick={() => openLead("category")}>
            Уточнить возможность доставки
          </Button>
        </div>
      </div>
    </section>
  );
}
