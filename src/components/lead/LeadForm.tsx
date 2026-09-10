////////////////////////////////////////////////////////
//
// Форма расчёта доставки
//
////////////////////////////////////////////////////////

import { useEffect } from "react";
import { cargoCategories, priorities } from "../../config/content";
import { getContactChannel } from "../../config/contactChannels";
import { useLeadForm } from "../../hooks/useLeadForm";
import type { LeadFormMode, LeadPayload, LeadSource } from "../../types/lead";
import { Button } from "../ui/Button";
import { Field, SelectField } from "../ui/Field";
import { ContactChannelPicker } from "./ContactChannelPicker";
import { LeadSuccessOverlay } from "./LeadSuccessOverlay";
import "./LeadForm.css";

interface Props {
  source: LeadSource;
  mode: LeadFormMode;
  cta: string;
  preset?: Partial<LeadPayload>;
  note?: string;
  onSuccessChange?: (success: boolean) => void;
  onDismiss?: () => void;
}

/** Текст после успешной отправки */
function successCopy(mode: LeadFormMode): string {
  switch (mode) {
    case "question":
      return "Специалист ответит удобным способом связи.";
    case "simple":
    case "tariff":
      return "Логист рассчитает варианты доставки и свяжется с вами.";
    default: {
      const exhaustive: never = mode;
      return exhaustive;
    }
  }
}

/** Подпись кнопки во время отправки */
function loadingCopy(mode: LeadFormMode): string {
  switch (mode) {
    case "question":
      return "Отправляем…";
    case "simple":
    case "tariff":
      return "Считаем…";
    default: {
      const exhaustive: never = mode;
      return exhaustive;
    }
  }
}

/** Короткая форма; вопрос — имя и связь, с тарифов ещё приоритет пакета */
export function LeadForm({ source, mode, cta, preset, note, onSuccessChange, onDismiss }: Props) {
  const { values, errors, status, setField, submit, reset } = useLeadForm({ source, mode, preset });
  const phoneMeta = getContactChannel(values.contactChannel);
  const showCargoFields = mode === "simple" || mode === "tariff";

  /** Сообщает модалке, что форму нужно спрятать под оверлеем */
  useEffect(() => {
    onSuccessChange?.(status === "success");
  }, [onSuccessChange, status]);

  /** Закрывает оверлей и возвращает форму к полям */
  function closeSuccess() {
    reset();
    onDismiss?.();
  }

  if (status === "success") {
    return (
      <>
        <div className="lead-ok-hold" aria-hidden="true" />
        <LeadSuccessOverlay title="Заявка отправлена" text={successCopy(mode)} onClose={closeSuccess} />
      </>
    );
  }

  return (
    <form
      className={`lead-form lead-${mode}`}
      onSubmit={(e) => {
        e.preventDefault();
        void submit();
      }}
      noValidate
    >
      {mode === "question" ? (
        <Field
          id={`${source}-name`}
          label="Имя"
          value={values.name}
          error={errors.name}
          autoComplete="name"
          required
          aria-required="true"
          onChange={(e) => setField("name", e.target.value)}
        />
      ) : null}
      {showCargoFields ? (
        <>
          <SelectField
            id={`${source}-cargo`}
            label="Что везём?"
            optional
            value={values.cargo}
            error={errors.cargo}
            onChange={(value) => setField("cargo", value)}
          >
            <option value="">Категория товара</option>
            {cargoCategories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </SelectField>
          <Field
            id={`${source}-weight`}
            label="Вес, кг"
            optional
            inputMode="decimal"
            value={values.weight}
            error={errors.weight}
            onChange={(e) => setField("weight", e.target.value)}
          />
          <Field
            id={`${source}-to`}
            label="Город доставки"
            optional
            value={values.toCity}
            error={errors.toCity}
            onChange={(e) => setField("toCity", e.target.value)}
          />
        </>
      ) : null}
      {mode === "tariff" ? (
        <fieldset className="lead-prio">
          <legend>Приоритет</legend>
          <div className="lead-prio-grid">
            {priorities.map((item) => (
              <label key={item.id} className={values.priority === item.id ? "is-on" : ""}>
                <input
                  type="radio"
                  name={`${source}-prio`}
                  checked={values.priority === item.id}
                  onChange={() => setField("priority", item.id)}
                />
                <b>{item.label}</b>
                <span>{item.hint}</span>
              </label>
            ))}
          </div>
        </fieldset>
      ) : null}
      <ContactChannelPicker
        name={`${source}-channel`}
        value={values.contactChannel}
        onChange={(channel) => setField("contactChannel", channel)}
      />
      <Field
        id={`${source}-contact`}
        label={phoneMeta.phoneLabel}
        value={values.contact}
        error={errors.contact}
        autoComplete="tel"
        inputMode="tel"
        required
        aria-required="true"
        onChange={(e) => setField("contact", e.target.value)}
      />
      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? loadingCopy(mode) : cta}
      </Button>
      {note ? <p className="lead-note">{note}</p> : null}
    </form>
  );
}
