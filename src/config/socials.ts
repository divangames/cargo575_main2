////////////////////////////////////////////////////////
//
// Ссылки на мессенджеры и соцсети
//
////////////////////////////////////////////////////////

import { site } from "./site";
import { metrikaGoals } from "./metrika";
import type { FooterCircleSocial, FooterPillSocial } from "../helpers/footerSocialIcon";

/** Круглые кнопки мессенджеров */
export const circleSocials: {
  id: FooterCircleSocial;
  href: string;
  label: string;
  metrikaGoal: (typeof metrikaGoals)[keyof typeof metrikaGoals];
}[] = [
  { id: "telegram", href: site.telegramHref, label: "Telegram", metrikaGoal: metrikaGoals.clickTelegram },
  { id: "max", href: site.maxHref, label: "MAX", metrikaGoal: metrikaGoals.clickMax },
  { id: "whatsapp", href: site.whatsappHref, label: "WhatsApp", metrikaGoal: metrikaGoals.clickWhatsapp },
];

/** Широкие кнопки WeChat и группы */
export const pillSocials: {
  id: FooterPillSocial;
  href: string;
  label: string;
  metrikaGoal: (typeof metrikaGoals)[keyof typeof metrikaGoals];
}[] = [
  { id: "wechat", href: site.wechatHref, label: "WeChat", metrikaGoal: metrikaGoals.clickWechat },
  { id: "telegram-group", href: site.telegramGroupHref, label: "Группа", metrikaGoal: metrikaGoals.clickTelegramGroup },
];
