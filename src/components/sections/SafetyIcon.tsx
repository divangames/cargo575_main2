////////////////////////////////////////////////////////
//
// Иконки Phosphor для карточек контроля
//
////////////////////////////////////////////////////////

import {
  CameraIcon,
  FileTextIcon,
  HeadsetIcon,
  ShieldCheckIcon,
  UsersThreeIcon,
  WarehouseIcon,
} from "@phosphor-icons/react";
import type { SafetyIconId } from "../../types/safety";

interface Props {
  name: SafetyIconId;
}

/** Подбирает иконку по ключу карточки */
export function SafetyIcon({ name }: Props) {
  const props = { size: 26, weight: "duotone" as const, "aria-hidden": true };

  switch (name) {
    case "contract":
      return <FileTextIcon {...props} />;
    case "insurance":
      return <ShieldCheckIcon {...props} />;
    case "inspect":
      return <CameraIcon {...props} />;
    case "staff":
      return <UsersThreeIcon {...props} />;
    case "warehouse":
      return <WarehouseIcon {...props} />;
    case "manager":
      return <HeadsetIcon {...props} />;
    default: {
      const unused: never = name;
      throw new Error(`Неизвестная иконка контроля: ${String(unused)}`);
    }
  }
}
