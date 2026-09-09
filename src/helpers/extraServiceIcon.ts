////////////////////////////////////////////////////////
//
// Иконка услуги в цепочке «Китай под ключ»
//
////////////////////////////////////////////////////////

import {
  FactoryIcon,
  HandshakeIcon,
  MagnifyingGlassIcon,
  PackageIcon,
  SealCheckIcon,
  ShoppingBagOpenIcon,
  StackIcon,
  TagIcon,
  TruckIcon,
  WalletIcon,
  type Icon,
} from "@phosphor-icons/react";
import type { extraServices } from "../config/content";

type ExtraService = (typeof extraServices)[number];

/** Подбирает иконку по названию услуги в Китае */
export function extraServiceIcon(label: ExtraService): Icon {
  switch (label) {
    case "Поиск поставщика / производителя":
      return MagnifyingGlassIcon;
    case "Проверка фабрики":
      return FactoryIcon;
    case "Переговоры с поставщиком":
      return HandshakeIcon;
    case "Выкуп товара":
      return ShoppingBagOpenIcon;
    case "Оплата поставщику в юанях":
      return WalletIcon;
    case "Проверка товара":
      return SealCheckIcon;
    case "Консолидация":
      return StackIcon;
    case "Упаковка":
      return PackageIcon;
    case "Маркировка":
      return TagIcon;
    case "Доставка в Россию":
      return TruckIcon;
    default: {
      const exhaustive: never = label;
      throw new Error(`Неизвестная услуга: ${exhaustive}`);
    }
  }
}
