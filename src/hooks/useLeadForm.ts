////////////////////////////////////////////////////////
//
// Состояние формы расчёта
//
////////////////////////////////////////////////////////

import { useCallback, useState } from "react";
import { formatRuMobileMask, RU_PHONE_PREFIX } from "../helpers/ruPhoneMask";
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
  contact: RU_PHONE_PREFIX,
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
  const [values, setValues] = useState<LeadPayload>({
    ...empty,
    ...preset,
    source,
    formTitle,
    contact: formatRuMobileMask(preset?.contact || RU_PHONE_PREFIX),
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [submitError, setSubmitError] = useState("");

  const setField = useCallback(<K extends keyof LeadPayload>(key: K, value: LeadPayload[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    setSubmitError("");
  }, []);

  const submit = useCallback(async () => {
    const nextErrors = validateLead(values, mode);
    setErrors(nextErrors);
    setSubmitError("");
    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      await submitLead({ ...values, source, formTitle });
      reachMetrikaGoal(getLeadMetrikaGoal(source, mode));
      setStatus("success");
    } catch {
      setStatus("error");
      setSubmitError("Не удалось отправить заявку. Попробуйте ещё раз или позвоните 8 (800) 300-57-58.");
    }
  }, [formTitle, mode, source, values]);

  const reset = useCallback(() => {
    setValues({
      ...empty,
      ...preset,
      source,
      formTitle,
      contact: formatRuMobileMask(preset?.contact || RU_PHONE_PREFIX),
    });
    setErrors({});
    setSubmitError("");
    setStatus("idle");
  }, [formTitle, preset, source]);

  return { values, errors, status, submitError, setField, submit, reset };
}
