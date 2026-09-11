////////////////////////////////////////////////////////
//
// Поле телефона с маской +7 (9XX) XXX XX-XX
//
////////////////////////////////////////////////////////

import { useLayoutEffect, useRef, type KeyboardEvent } from "react";
import {
  caretAfterMobileDigits,
  countMobileDigitsBefore,
  formatRuMobileMask,
  RU_PHONE_MASK,
  RU_PHONE_PREFIX,
} from "../../helpers/ruPhoneMask";
import { Field } from "./Field";

interface Props {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}

/** Не даёт стереть префикс +7 (9 и форматирует ввод по маске */
export function PhoneField({ id, label, value, error, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const caretRef = useRef<number | null>(null);
  const display = value || RU_PHONE_PREFIX;

  useLayoutEffect(() => {
    const input = inputRef.current;
    const caret = caretRef.current;
    if (!input || caret === null) {
      return;
    }
    input.setSelectionRange(caret, caret);
    caretRef.current = null;
  }, [display]);

  /** Если каретка заехала в префикс — возвращает её к первой свободной позиции */
  function keepCaretOutOfPrefix() {
    const input = inputRef.current;
    if (!input) {
      return;
    }
    const min = RU_PHONE_PREFIX.length;
    const start = input.selectionStart ?? min;
    const end = input.selectionEnd ?? min;
    if (start < min || end < min) {
      input.setSelectionRange(Math.max(min, start), Math.max(min, end));
    }
  }

  /** Backspace не трогает +7 (9; полное выделение сбрасывает к префиксу */
  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const start = input.selectionStart ?? 0;
    const end = input.selectionEnd ?? 0;
    const selectedAll = start === 0 && end === input.value.length;

    if (event.key === "Backspace" && selectedAll) {
      event.preventDefault();
      caretRef.current = RU_PHONE_PREFIX.length;
      onChange(RU_PHONE_PREFIX);
      return;
    }

    if (event.key === "Backspace" && start === end && start <= RU_PHONE_PREFIX.length) {
      event.preventDefault();
      return;
    }

    if (event.key === "Delete" && start < RU_PHONE_PREFIX.length) {
      event.preventDefault();
    }

    if (event.key === "Home" || (event.key === "ArrowLeft" && start <= RU_PHONE_PREFIX.length)) {
      event.preventDefault();
      input.setSelectionRange(RU_PHONE_PREFIX.length, RU_PHONE_PREFIX.length);
    }
  }

  return (
    <Field
      ref={inputRef}
      id={id}
      label={label}
      value={display}
      error={error}
      type="tel"
      name="phone"
      autoComplete="tel"
      inputMode="tel"
      maxLength={18}
      placeholder={RU_PHONE_MASK}
      required
      aria-required="true"
      onFocus={() => {
        if (!value.startsWith(RU_PHONE_PREFIX)) {
          caretRef.current = formatRuMobileMask(value || RU_PHONE_PREFIX).length;
          onChange(formatRuMobileMask(value || RU_PHONE_PREFIX));
          return;
        }
        requestAnimationFrame(keepCaretOutOfPrefix);
      }}
      onClick={keepCaretOutOfPrefix}
      onKeyDown={onKeyDown}
      onChange={(event) => {
        const input = event.target;
        const caret = input.selectionStart ?? input.value.length;
        const digitsBefore = Math.max(1, countMobileDigitsBefore(input.value.slice(0, caret)));
        const next = formatRuMobileMask(input.value);
        caretRef.current = caretAfterMobileDigits(next, digitsBefore);
        onChange(next);
      }}
    />
  );
}
