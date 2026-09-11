////////////////////////////////////////////////////////
//
// Поле формы
//
////////////////////////////////////////////////////////

import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import "./Field.css";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
}

/** Подписанное поле ввода */
export const Field = forwardRef<HTMLInputElement, Props>(function Field(
  { label, error, hint, optional, id, ...rest },
  ref,
) {
  const fieldId = id ?? rest.name;
  return (
    <label className={`field ${error ? "is-invalid" : ""}`} htmlFor={fieldId}>
      <span className="field-label">
        {label}
        {optional ? <em>необязательно</em> : null}
      </span>
      <input ref={ref} id={fieldId} aria-invalid={Boolean(error)} {...rest} />
      {error ? <span className="field-error">{error}</span> : hint ? <span className="field-hint">{hint}</span> : null}
    </label>
  );
});

interface SelectProps {
  label: string;
  value: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
  onChange: (value: string) => void;
  id?: string;
}

/** Выпадающий список категории */
export function SelectField({ label, value, error, optional, children, onChange, id }: SelectProps) {
  return (
    <label className={`field ${error ? "is-invalid" : ""}`} htmlFor={id}>
      <span className="field-label">
        {label}
        {optional ? <em>необязательно</em> : null}
      </span>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} aria-invalid={Boolean(error)}>
        {children}
      </select>
      {error ? <span className="field-error">{error}</span> : null}
    </label>
  );
}
