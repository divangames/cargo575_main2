////////////////////////////////////////////////////////
//
// FAQ
//
////////////////////////////////////////////////////////

import { faq } from "../../config/content";
import { Accordion } from "../ui/Accordion";
import { Reveal } from "../ui/Reveal";

/** Частые вопросы о карго */
export function Faq() {
  return (
    <section className="block" id="faq">
      <div className="wrap">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">FAQ</p>
            <h2 className="section-title">Частые вопросы о карго доставке из Китая</h2>
          </div>
        </Reveal>
        <Accordion items={faq} />
      </div>
    </section>
  );
}
