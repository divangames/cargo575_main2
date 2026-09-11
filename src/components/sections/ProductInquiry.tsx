////////////////////////////////////////////////////////
//
// Блок «Есть только ссылка или фото товара?»
//
////////////////////////////////////////////////////////

import { ProductLeadForm } from "../lead/ProductLeadForm";
import { Reveal } from "../ui/Reveal";
import "./ProductInquiry.css";

/** Форма расчёта, когда нет точных параметров груза */
export function ProductInquiry() {
  return (
    <section className="block product-inquiry" id="product-inquiry">
      <div className="wrap product-inquiry-grid">
        <Reveal>
          <div className="section-head">
            <h2 className="section-title product-inquiry-title">Есть только ссылка или фото товара?</h2>
            <p className="section-lead">
              Не знаете вес и объём груза? Пришлите ссылку или фото товара. Мы сами оценим параметры и
              подберём подходящий вариант доставки.
            </p>
            <div className="product-inquiry-calc">
              <p className="product-inquiry-calc-label">Рассчитаем:</p>
              <ul>
                <li>стоимость доставки</li>
                <li>примерный срок</li>
                <li>подходящий способ перевозки</li>
              </ul>
            </div>
          </div>
        </Reveal>
        <div className="product-inquiry-card">
          <ProductLeadForm />
        </div>
      </div>
    </section>
  );
}
