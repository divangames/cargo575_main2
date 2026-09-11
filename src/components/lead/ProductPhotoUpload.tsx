////////////////////////////////////////////////////////
//
// Загрузка до 5 фото товара
//
////////////////////////////////////////////////////////

import { useId, useRef } from "react";
import {
  PRODUCT_PHOTO_ACCEPT,
  PRODUCT_PHOTO_MAX_COUNT,
} from "../../helpers/productPhotoRules";
import { Button } from "../ui/Button";
import "./ProductPhotoUpload.css";

interface Props {
  files: File[];
  error?: string;
  onChange: (files: File[]) => void;
}

/** Форматирует размер файла для списка */
function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} КБ`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} МБ`;
}

/** Поле выбора и список прикреплённых фото */
export function ProductPhotoUpload({ files, error, onChange }: Props) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  /** Добавляет новые файлы с учётом лимита */
  function addFiles(next: FileList | null) {
    if (!next?.length) return;
    const merged = [...files];
    for (const file of Array.from(next)) {
      if (merged.length >= PRODUCT_PHOTO_MAX_COUNT) break;
      merged.push(file);
    }
    onChange(merged);
  }

  /** Удаляет файл из списка */
  function removeAt(index: number) {
    onChange(files.filter((_, i) => i !== index));
  }

  return (
    <div className={`product-upload${error ? " is-invalid" : ""}`}>
      <span className="product-upload-label">Фото товара</span>
      <input
        ref={inputRef}
        id={inputId}
        className="product-upload-input"
        type="file"
        accept={PRODUCT_PHOTO_ACCEPT}
        multiple
        onChange={(event) => {
          addFiles(event.target.files);
          event.target.value = "";
        }}
      />
      <Button
        type="button"
        variant="secondary"
        className="product-upload-btn"
        disabled={files.length >= PRODUCT_PHOTO_MAX_COUNT}
        onClick={() => inputRef.current?.click()}
      >
        {files.length ? "Добавить ещё фото" : "Выбрать фото"}
      </Button>
      <p className="product-upload-hint">
        JPG, PNG, HEIC, WEBP до 10 МБ
        <br />
        Можно загрузить до 5-ти фото
      </p>
      {files.length ? (
        <ul className="product-upload-list">
          {files.map((file, index) => (
            <li key={`${file.name}-${file.size}-${index}`}>
              <span>{file.name}</span>
              <small>{formatSize(file.size)}</small>
              <button type="button" aria-label={`Удалить ${file.name}`} onClick={() => removeAt(index)}>
                ×
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      {error ? <span className="product-upload-error">{error}</span> : null}
    </div>
  );
}
