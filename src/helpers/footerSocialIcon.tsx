////////////////////////////////////////////////////////
//
// Иконки мессенджеров в подвале
//
////////////////////////////////////////////////////////

import { TelegramLogoIcon, WhatsappLogoIcon } from "@phosphor-icons/react";
import { assetUrl } from "./assetUrl";

export type FooterCircleSocial = "telegram" | "max" | "whatsapp";
export type FooterPillSocial = "wechat" | "telegram-group";

/** Круглая иконка Telegram / MAX / WhatsApp */
export function FooterCircleIcon({ id }: { id: FooterCircleSocial }) {
  switch (id) {
    case "telegram":
      return <TelegramLogoIcon weight="fill" size={22} aria-hidden />;
    case "max":
      return <img src={assetUrl("/social/max.svg")} alt="" width={22} height={22} />;
    case "whatsapp":
      return <WhatsappLogoIcon weight="fill" size={22} aria-hidden />;
    default: {
      const exhaustive: never = id;
      throw new Error(`Неизвестная сеть: ${exhaustive}`);
    }
  }
}

/** Иконка на широкой кнопке WeChat или группы */
export function FooterPillIcon({ id }: { id: FooterPillSocial }) {
  switch (id) {
    case "wechat":
      return <img src={assetUrl("/social/wechat.svg")} alt="" width={22} height={22} />;
    case "telegram-group":
      return <TelegramLogoIcon weight="fill" size={22} aria-hidden />;
    default: {
      const exhaustive: never = id;
      throw new Error(`Неизвестная кнопка сети: ${exhaustive}`);
    }
  }
}
