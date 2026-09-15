////////////////////////////////////////////////////////
//
// Типы карточек реальных доставок
//
////////////////////////////////////////////////////////

/** Один кадр проверки или выдачи груза */
export interface CasePhoto {
  src: string;
  alt: string;
}

/** Кейс: маршрут, цифры и фотоотчёт */
export interface CaseItem {
  n: string;
  category: string;
  route: string;
  weight: string;
  volume: string;
  days: string;
  mode: string;
  rate: string;
  note: string;
  images: CasePhoto[];
}
