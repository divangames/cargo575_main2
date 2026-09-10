////////////////////////////////////////////////////////
//
// Каналы связи в короткой форме заявки
//
////////////////////////////////////////////////////////

import type { LeadContactChannel } from "../types/lead";

export interface ContactChannelOption {
  id: LeadContactChannel;
  label: string;
  phoneLabel: string;
  notifyChannel: string;
  notifyPhone: string;
}

export const contactChannels: ContactChannelOption[] = [
  {
    id: "call",
    label: "Позвонить",
    phoneLabel: "Номер телефона",
    notifyChannel: "Звонок",
    notifyPhone: "Номер телефона",
  },
  {
    id: "telegram",
    label: "Telegram",
    phoneLabel: "Номер телефона от Telegram",
    notifyChannel: "Telegram",
    notifyPhone: "Номер телефона в Telegram",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    phoneLabel: "Номер телефона WhatsApp",
    notifyChannel: "WhatsApp",
    notifyPhone: "Номер телефона WhatsApp",
  },
  {
    id: "max",
    label: "MAX",
    phoneLabel: "Номер телефона MAX",
    notifyChannel: "MAX",
    notifyPhone: "Номер телефона MAX",
  },
];

/** Возвращает подписи выбранного канала */
export function getContactChannel(id: LeadContactChannel): ContactChannelOption {
  switch (id) {
    case "call":
      return contactChannels[0];
    case "telegram":
      return contactChannels[1];
    case "whatsapp":
      return contactChannels[2];
    case "max":
      return contactChannels[3];
    default: {
      const neverChannel: never = id;
      return neverChannel;
    }
  }
}
