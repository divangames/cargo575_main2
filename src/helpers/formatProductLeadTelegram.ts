////////////////////////////////////////////////////////
//
// Текст заявки «Ссылка или фото» для Telegram
//
////////////////////////////////////////////////////////

import { getContactChannel } from "../config/contactChannels";
import { productInputKindLabel } from "./validateProductLead";
import type { ProductLeadValues } from "../types/productLead";

/** Экранирует пользовательский ввод для parse_mode HTML */
function escapeHtml(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

/** Строка поля; пустые значения не попадают в сообщение */
function line(label: string, value: string): string {
  const trimmed = value.trim();
  if (!trimmed) {
    return "";
  }
  return `<b>${label}:</b> ${escapeHtml(trimmed)}`;
}

/** Собирает HTML-сообщение для api/product-lead.php */
export function formatProductLeadTelegram(values: ProductLeadValues): string {
  const channel = getContactChannel(values.contactChannel);
  const kindLabel = productInputKindLabel(values.kind);

  const detailLines: string[] = [];
  switch (values.kind) {
    case "link":
      detailLines.push(line("Ссылка", values.productLink));
      break;
    case "photo":
      detailLines.push(`<b>Фото:</b> ${values.photos.length} файл(ов)`);
      break;
    case "params":
      detailLines.push(line("Вес, кг", values.weight));
      detailLines.push(line("Что везём", values.cargo));
      break;
    default: {
      const neverKind: never = values.kind;
      return neverKind;
    }
  }

  return [
    "<b>Новая заявка — CARGO 575</b>",
    line("Форма", "Есть только ссылка или фото товара?"),
    line("Тип", kindLabel),
    ...detailLines,
    line("Способ связи", channel.notifyChannel),
    line(channel.notifyPhone, values.contact),
  ]
    .filter(Boolean)
    .join("\n");
}
