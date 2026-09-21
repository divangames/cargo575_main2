////////////////////////////////////////////////////////
//
// Состояние формы расчёта
//
////////////////////////////////////////////////////////

import { useCallback, useRef, useState } from "react";
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
  const requestId = useRef(crypto.randomUUID());
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

  /** Проверяет поля без отправки; true — можно запускать капчу/submit */
  const validateFields = useCallback(() => {
    const nextErrors = validateLead(values, mode);
    setErrors(nextErrors);
    setSubmitError("");
    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      return false;
    }
    return true;
  }, [mode, values]);

  /** Отправляет заявку; smartToken — одноразовый ответ SmartCaptcha */
  const submit = useCallback(
    async (smartToken: string) => {
      if (!validateFields()) return false;
      if (!smartToken.trim()) {
        setStatus("error");
        setSubmitError("Не удалось пройти защиту от спама. Попробуйте ещё раз.");
        return false;
      }
      setStatus("loading");
      try {
        await submitLead({ ...values, source, formTitle }, smartToken, requestId.current);
        reachMetrikaGoal(getLeadMetrikaGoal(source, mode));
        setStatus("success");
        return true;
      } catch (error) {
        setStatus("error");
        const captchaFailed = error instanceof Error && error.message === "CAPTCHA_FAILED";
        setSubmitError(
          captchaFailed
            ? "Защита от спама не пропустила заявку. Попробуйте отправить ещё раз."
            : "Не удалось отправить заявку. Попробуйте ещё раз или позвоните 8 (800) 300-57-58.",
        );
        return false;
      }
    },
    [formTitle, mode, source, validateFields, values],
  );

  const reset = useCallback(() => {
    requestId.current = crypto.randomUUID();
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

  return { values, errors, status, submitError, setField, validateFields, submit, reset };
}
