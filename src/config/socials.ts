////////////////////////////////////////////////////////
//
// Ссылки на мессенджеры и соцсети
//
////////////////////////////////////////////////////////

import { site } from "./site";
import type { FooterCircleSocial, FooterPillSocial } from "../helpers/footerSocialIcon";

/** Круглые кнопки мессенджеров */
export const circleSocials: { id: FooterCircleSocial; href: string; label: string }[] = [
  { id: "telegram", href: site.telegramHref, label: "Telegram" },
  { id: "max", href: site.maxHref, label: "MAX" },
  { id: "whatsapp", href: site.whatsappHref, label: "WhatsApp" },
];

/** Широкие кнопки WeChat и группы */
export const pillSocials: { id: FooterPillSocial; href: string; label: string }[] = [
  { id: "wechat", href: site.wechatHref, label: "WeChat" },
  { id: "telegram-group", href: site.telegramGroupHref, label: "Группа" },
];
