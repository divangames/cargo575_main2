////////////////////////////////////////////////////////
//
// Состояние формы расчёта
//
////////////////////////////////////////////////////////

import { useCallback, useState } from "react";
import { validateLead } from "../helpers/validateLead";
import { submitLead } from "../services/leadService";
import type { FieldErrors, FormStatus, LeadFormMode, LeadPayload, LeadSource } from "../types/lead";

const empty: Omit<LeadPayload, "source"> = {
  cargo: "",
  weight: "",
  volume: "",
  fromCity: "",
  toCity: "",
  name: "",
  contact: "",
  contactChannel: "call",
  priority: "optimal",
};

interface Options {
  source: LeadSource;
  mode: LeadFormMode;
  preset?: Partial<LeadPayload>;
}

/** Управляет полями, ошибками и отправкой заявки */
export function useLeadForm({ source, mode, preset }: Options) {
  const [values, setValues] = useState<LeadPayload>({ ...empty, ...preset, source });
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
      await submitLead({ ...values, source });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }, [mode, source, values]);

  const reset = useCallback(() => {
    setValues({ ...empty, ...preset, source });
    setErrors({});
    setStatus("idle");
  }, [preset, source]);

  return { values, errors, status, setField, submit, reset };
}
