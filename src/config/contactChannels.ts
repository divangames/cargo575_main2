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
  {
    id: "call",
    label: "Позвонить",
    phoneLabel: "Номер телефона",
    notifyChannel: "Звонок",
    notifyPhone: "Номер телефона",
  },
];

const contactChannelById = Object.fromEntries(contactChannels.map((item) => [item.id, item])) as Record<
  LeadContactChannel,
  ContactChannelOption
>;

/** Возвращает подписи выбранного канала */
export function getContactChannel(id: LeadContactChannel): ContactChannelOption {
  return contactChannelById[id];
}
