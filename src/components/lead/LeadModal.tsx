////////////////////////////////////////////////////////
//
// Модалка расчёта из CTA по странице
//
////////////////////////////////////////////////////////

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
  return (
    <Modal open={open} title="Рассчитать стоимость доставки" onClose={onClose}>
      <LeadForm
        key={`${source}-${preset?.cargo ?? ""}-${open ? "1" : "0"}`}
        source={source}
        mode="full"
        cta="Получить расчет доставки"
        preset={preset}
        note="Логист подберёт несколько вариантов по цене и сроку."
      />
    </Modal>
  );
}
