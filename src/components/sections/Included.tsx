////////////////////////////////////////////////////////
//
// Что входит в стоимость: та же пин-сцена, что у процесса
//
////////////////////////////////////////////////////////

import { includedItems } from "../../config/content";
import { RoutePinScene } from "../ui/RoutePinScene";

/** Состав тарифа на маршруте Китай → Россия */
export function Included() {
  return (
    <RoutePinScene
      id="included"
      eyebrow="Прозрачность"
      title="Что входит в стоимость карго доставки"
      items={includedItems}
      surface="white"
    />
  );
}
