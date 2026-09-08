////////////////////////////////////////////////////////
//
// Форма расчёта доставки
//
////////////////////////////////////////////////////////

import { cargoCategories, priorities } from "../../config/content";
import { useLeadForm } from "../../hooks/useLeadForm";
import type { LeadPayload, LeadSource } from "../../types/lead";
import { Button } from "../ui/Button";
import { Field, SelectField } from "../ui/Field";
import "./LeadForm.css";

interface Props {
  source: LeadSource;
  mode: "hero" | "full";
  cta: string;
  preset?: Partial<LeadPayload>;
  note?: string;
}

/** Конверсионная форма с состояниями idle / error / loading / success */
export function LeadForm({ source, mode, cta, preset, note }: Props) {
  const { values, errors, status, setField, submit } = useLeadForm({ source, mode, preset });

  if (status === "success") {
    return (
      <div className="lead-ok" role="status">
        <b>Заявка отправлена.</b>
        <p>Логист рассчитает варианты доставки и свяжется с вами.</p>
      </div>
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
      <SelectField
        id={`${source}-cargo`}
        label="Что везём?"
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
      <div className="lead-row">
        <Field
          id={`${source}-weight`}
          label="Вес, кг"
          inputMode="decimal"
          value={values.weight}
          error={errors.weight}
          onChange={(e) => setField("weight", e.target.value)}
        />
        <Field
          id={`${source}-volume`}
          label="Объём, м³"
          optional
          inputMode="decimal"
          value={values.volume}
          error={errors.volume}
          onChange={(e) => setField("volume", e.target.value)}
        />
      </div>
      {mode === "full" ? (
        <Field
          id={`${source}-from`}
          label="Город отправления в Китае"
          optional
          value={values.fromCity}
          onChange={(e) => setField("fromCity", e.target.value)}
        />
      ) : null}
      <Field
        id={`${source}-to`}
        label="Город доставки"
        value={values.toCity}
        error={errors.toCity}
        onChange={(e) => setField("toCity", e.target.value)}
      />
      {mode === "full" ? (
        <>
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
          <Field
            id={`${source}-name`}
            label="Имя"
            value={values.name}
            error={errors.name}
            onChange={(e) => setField("name", e.target.value)}
          />
        </>
      ) : null}
      <Field
        id={`${source}-contact`}
        label="Телефон / Telegram"
        value={values.contact}
        error={errors.contact}
        autoComplete="tel"
        onChange={(e) => setField("contact", e.target.value)}
      />
      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Считаем…" : cta}
      </Button>
      {note ? <p className="lead-note">{note}</p> : null}
    </form>
  );
}
