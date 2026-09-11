////////////////////////////////////////////////////////
//
// Маска российского мобильного: +7 (9XX) XXX XX-XX
// Префикс +7 (9 уже стоит в поле, 8 и +7 вводить не нужно
//
////////////////////////////////////////////////////////

/** Начальное значение поля: код страны и первая цифра мобильного */
export const RU_PHONE_PREFIX = "+7 (9";

/** Шаблон для подсказки и проверки полноты номера */
export const RU_PHONE_MASK = "+7 (9XX) XXX XX-XX";

////////////////////////////////////////////////////////
//
// Разбор цифр
//
////////////////////////////////////////////////////////

/** Достаёт до 10 цифр мобильного (всегда начинается с 9) */
export function parseRuMobileDigits(raw: string): string {
  const digits = raw.replace(/\D/g, "");

  if (digits.length >= 11) {
    const tail11 = digits.slice(-11);
    if (/^[78]9\d{9}$/.test(tail11)) {
      return tail11.slice(1);
    }
    const tail10 = digits.slice(-10);
    if (/^9\d{9}$/.test(tail10)) {
      return tail10;
    }
  }

  let rest = digits.startsWith("7") ? digits.slice(1) : digits;
  if (rest.startsWith("8") && rest.charAt(1) === "9") {
    rest = rest.slice(1);
  }
  if (!rest.startsWith("9")) {
    rest = `9${rest}`;
  }
  return rest.slice(0, 10);
}

////////////////////////////////////////////////////////
//
// Форматирование и каретка
//
////////////////////////////////////////////////////////

/** Собирает отображаемую маску из сырого ввода */
export function formatRuMobileMask(raw: string): string {
  const digits = parseRuMobileDigits(raw);
  const code = digits.slice(0, 3);
  const partA = digits.slice(3, 6);
  const partB = digits.slice(6, 8);
  const partC = digits.slice(8, 10);

  if (code.length < 3) {
    return `+7 (${code}`;
  }

  let result = `+7 (${code})`;
  if (partA) {
    result += ` ${partA}`;
  }
  if (partB) {
    result += ` ${partB}`;
  }
  if (partC) {
    result += `-${partC}`;
  }
  return result;
}

/** Сколько цифр номера (без семёрки страны) стоит до позиции */
export function countMobileDigitsBefore(value: string): number {
  const digits = value.replace(/\D/g, "");
  if (digits.startsWith("7") || (digits.startsWith("8") && digits.length > 1)) {
    return Math.min(10, Math.max(0, digits.length - 1));
  }
  return Math.min(10, digits.length);
}

/** Ставит каретку сразу после N-й цифры мобильного в отформатированной строке */
export function caretAfterMobileDigits(formatted: string, count: number): number {
  let skippedCountry = false;
  let seen = 0;
  for (let index = 0; index < formatted.length; index += 1) {
    const char = formatted[index];
    if (char < "0" || char > "9") {
      continue;
    }
    if (!skippedCountry) {
      skippedCountry = true;
      continue;
    }
    seen += 1;
    if (seen >= count) {
      return index + 1;
    }
  }
  return formatted.length;
}

/** Номер введён целиком по маске */
export function isRuMobileComplete(raw: string): boolean {
  return /^\+7 \(9\d{2}\) \d{3} \d{2}-\d{2}$/.test(raw.trim());
}
