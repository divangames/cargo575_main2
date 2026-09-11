////////////////////////////////////////////////////////
//
// Состояние формы расчёта
//
////////////////////////////////////////////////////////

import { useCallback, useState } from "react";
import { validateLead } from "../helpers/validateLead";
import { getLeadMetrikaGoal } from "../helpers/leadMetrikaGoal";
import { submitLead } from "../services/leadService";
import { reachMetrikaGoal } from "../services/metrikaService";
import type { FieldErrors, FormStatus, LeadFormMode, LeadPayload, LeadSource } from "../types/lead";

const empty: Omit<LeadPayload, "source" | "formTitle"> = {
  cargo: "",
  weight: "",
  volume: "",
  fromCity: "",
  toCity: "",
  name: "",
  contact: "",
  contactChannel: "telegram",
  priority: "optimal",
};

interface Options {
  source: LeadSource;
  mode: LeadFormMode;
  formTitle: string;
  preset?: Partial<LeadPayload>;
}

/** Управляет полями, ошибками и отправкой заявки */
export function useLeadForm({ source, mode, formTitle, preset }: Options) {
  const [values, setValues] = useState<LeadPayload>({ ...empty, ...preset, source, formTitle });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  const setField = useCallback(<K extends keyof LeadPayload>(key: K, value: LeadPayload[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }, []);

  const submit = useCallback(async () => {
    const nextErrors = validateLead(values, mode);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      await submitLead({ ...values, source, formTitle });
      const goalId = getLeadMetrikaGoal(formTitle);
      if (goalId) {
        reachMetrikaGoal(goalId);
      }
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }, [formTitle, mode, source, values]);

  const reset = useCallback(() => {
    setValues({ ...empty, ...preset, source, formTitle });
    setErrors({});
    setStatus("idle");
  }, [formTitle, preset, source]);

  return { values, errors, status, setField, submit, reset };
}
