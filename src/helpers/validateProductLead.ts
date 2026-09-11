////////////////////////////////////////////////////////
//
// Валидация формы «Ссылка или фото товара»
//
////////////////////////////////////////////////////////

import { getContactChannel } from "../config/contactChannels";
import {
  isAllowedProductPhoto,
  PRODUCT_PHOTO_MAX_BYTES,
  PRODUCT_PHOTO_MAX_COUNT,
} from "./productPhotoRules";
import type { ProductInputKind, ProductLeadErrors, ProductLeadValues } from "../types/productLead";

/** Проверяет поля заявки по выбранному типу ввода */
export function validateProductLead(values: ProductLeadValues): ProductLeadErrors {
  const errors: ProductLeadErrors = {};

  switch (values.kind) {
    case "link":
      if (!values.productLink.trim()) {
        errors.productLink = "Вставьте ссылку на товар";
      }
      break;
    case "photo":
      if (values.photos.length === 0) {
        errors.photos = "Загрузите хотя бы одно фото";
      } else if (values.photos.length > PRODUCT_PHOTO_MAX_COUNT) {
        errors.photos = `Не больше ${PRODUCT_PHOTO_MAX_COUNT} фото`;
      } else {
        for (const file of values.photos) {
          if (!isAllowedProductPhoto(file)) {
            errors.photos = "Формат JPG, PNG, HEIC или WEBP";
            break;
          }
          if (file.size > PRODUCT_PHOTO_MAX_BYTES) {
            errors.photos = "Каждое фото — до 10 МБ";
            break;
          }
        }
      }
      break;
    case "params":
      if (!values.weight.trim()) {
        errors.weight = "Укажите вес";
      } else if (!/^\d+([.,]\d+)?$/.test(values.weight.trim())) {
        errors.weight = "Только число";
      }
      break;
    default: {
      const neverKind: never = values.kind;
      throw new Error(`Неизвестный тип ввода: ${neverKind}`);
    }
  }

  if (!values.contact.trim()) {
    errors.contact = `Укажите ${getContactChannel(values.contactChannel).phoneLabel.toLowerCase()}`;
  }

  return errors;
}

/** Подпись типа ввода для Telegram */
export function productInputKindLabel(kind: ProductInputKind): string {
  switch (kind) {
    case "link":
      return "Ссылка на товар";
    case "photo":
      return "Фото товара";
    case "params":
      return "Знаю параметры груза";
    default: {
      const neverKind: never = kind;
      return neverKind;
    }
  }
}
