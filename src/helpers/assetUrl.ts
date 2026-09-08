////////////////////////////////////////////////////////
//
// URL файлов из public с учётом base (GitHub Pages)
//
////////////////////////////////////////////////////////

/**
 * Собирает путь к статике. Пустая строка остаётся пустой.
 */
export function assetUrl(path: string): string {
  if (!path) {
    return "";
  }

  const normalized = path.replace(/^\/+/, "");
  return `${import.meta.env.BASE_URL}${normalized}`;
}
