////////////////////////////////////////////////////////
//
// Иконки каналов связи в форме заявки
//
////////////////////////////////////////////////////////

import { PhoneCallIcon, TelegramLogoIcon, WhatsappLogoIcon } from "@phosphor-icons/react";
import { assetUrl } from "./assetUrl";
import type { LeadContactChannel } from "../types/lead";

/** Иконка звонка, Telegram, WhatsApp или MAX */
export function ContactChannelIcon({ id }: { id: LeadContactChannel }) {
  switch (id) {
    case "call":
      return <PhoneCallIcon weight="fill" size={22} aria-hidden />;
    case "telegram":
      return <TelegramLogoIcon weight="fill" size={22} aria-hidden />;
    case "whatsapp":
      return <WhatsappLogoIcon weight="fill" size={22} aria-hidden />;
    case "max":
      return <img src={assetUrl("/social/max.svg")} alt="" width={22} height={22} />;
    default: {
      const neverChannel: never = id;
      return neverChannel;
    }
  }
}
