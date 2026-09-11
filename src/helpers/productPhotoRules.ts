////////////////////////////////////////////////////////
//
// Ограничения загрузки фото товара
//
////////////////////////////////////////////////////////

/** Максимум файлов в одной заявке */
export const PRODUCT_PHOTO_MAX_COUNT = 5;

/** Максимальный размер одного файла, байт */
export const PRODUCT_PHOTO_MAX_BYTES = 10 * 1024 * 1024;

/** Допустимые MIME и расширения */
export const PRODUCT_PHOTO_ACCEPT =
  "image/jpeg,image/png,image/webp,image/heic,image/heif,.jpg,.jpeg,.png,.webp,.heic,.heif";

const allowedMime = new Set(["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"]);
const allowedExt = new Set(["jpg", "jpeg", "png", "webp", "heic", "heif"]);

/** Проверяет, что файл — допустимое фото */
export function isAllowedProductPhoto(file: File): boolean {
  if (allowedMime.has(file.type)) {
    return true;
  }
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  return allowedExt.has(ext);
}
