////////////////////////////////////////////////////////
//
// Модалка расчёта из CTA по странице
//
////////////////////////////////////////////////////////

import { useEffect, useState } from "react";
import { getLeadFormTitle } from "../../helpers/leadFormTitle";
import { LeadForm } from "./LeadForm";
import { Modal } from "../ui/Modal";
import type { LeadFormMode, LeadPayload, LeadSource } from "../../types/lead";

interface Props {
  open: boolean;
  source: LeadSource;
  preset?: Partial<LeadPayload>;
  onClose: () => void;
}

/** Режим формы в модалке по источнику CTA */
function leadModalMode(source: LeadSource): LeadFormMode {
  switch (source) {
    case "tariff":
      return "tariff";
    case "businessTour":
      return "question";
    case "hero":
    case "quick":
    case "case":
    case "category":
    case "safety":
    case "compare":
    case "extra":
    case "final":
    case "header":
      return "simple";
    default: {
      const neverSource: never = source;
      return neverSource;
    }
  }
}

/** Подпись кнопки отправки в модалке */
function leadModalCta(source: LeadSource): string {
  switch (source) {
    case "businessTour":
      return "Отправить";
    case "hero":
    case "quick":
    case "tariff":
    case "case":
    case "category":
    case "safety":
    case "compare":
    case "extra":
    case "final":
    case "header":
      return "Получить расчет доставки";
    default: {
      const neverSource: never = source;
      return neverSource;
    }
  }
}

/** Пояснение под кнопкой в модалке */
function leadModalNote(source: LeadSource): string | undefined {
  switch (source) {
    case "businessTour":
      return "Специалист свяжется и обсудит формат поездки в Китай.";
    case "hero":
    case "quick":
    case "tariff":
    case "case":
    case "category":
    case "safety":
    case "compare":
    case "extra":
    case "final":
    case "header":
      return "Логист подберёт несколько вариантов по цене и сроку.";
    default: {
      const neverSource: never = source;
      return neverSource;
    }
  }
}

/** Единая точка входа для кнопок «Рассчитать» */
export function LeadModal({ open, source, preset, onClose }: Props) {
  const [success, setSuccess] = useState(false);
  const mode = leadModalMode(source);
  const formTitle = getLeadFormTitle(source, mode);

  useEffect(() => {
    if (!open) setSuccess(false);
  }, [open]);

  return (
    <Modal open={open} title={formTitle} onClose={onClose} quiet={success}>
      <LeadForm
        key={`${source}-${preset?.cargo ?? ""}-${preset?.priority ?? ""}-${open ? "1" : "0"}`}
        source={source}
        mode={mode}
        formTitle={formTitle}
        channelLegend={source === "businessTour" ? "Как связаться?" : undefined}
        cta={leadModalCta(source)}
        preset={preset}
        note={leadModalNote(source)}
        onSuccessChange={setSuccess}
        onDismiss={onClose}
      />
    </Modal>
  );
}
