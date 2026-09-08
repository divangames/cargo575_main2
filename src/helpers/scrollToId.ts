////////////////////////////////////////////////////////
//
// Плавный скролл к якорю
//
////////////////////////////////////////////////////////

/** Прокручивает страницу к элементу с учётом липкой шапки */
export function scrollToId(id: string) {
  const node = document.getElementById(id.replace("#", ""));
  if (!node) return;
  const header = document.querySelector(".header");
  const offset = (header instanceof HTMLElement ? header.offsetHeight : 76) + 12;
  const top = node.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}
