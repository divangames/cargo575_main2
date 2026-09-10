////////////////////////////////////////////////////////
//
// Модалка расчёта из CTA по странице
//
////////////////////////////////////////////////////////

import { useEffect, useState } from "react";
import { LeadForm } from "./LeadForm";
import { Modal } from "../ui/Modal";
import type { LeadPayload, LeadSource } from "../../types/lead";

interface Props {
  open: boolean;
  source: LeadSource;
  preset?: Partial<LeadPayload>;
  onClose: () => void;
}

/** Единая точка входа для кнопок «Рассчитать» */
export function LeadModal({ open, source, preset, onClose }: Props) {
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!open) setSuccess(false);
  }, [open]);

  return (
    <Modal open={open} title="Рассчитать стоимость доставки" onClose={onClose} quiet={success}>
      <LeadForm
        key={`${source}-${preset?.cargo ?? ""}-${preset?.priority ?? ""}-${open ? "1" : "0"}`}
        source={source}
        mode={source === "tariff" ? "tariff" : "simple"}
        cta="Получить расчет доставки"
        preset={preset}
        note="Логист подберёт несколько вариантов по цене и сроку."
        onSuccessChange={setSuccess}
        onDismiss={onClose}
      />
    </Modal>
  );
}
