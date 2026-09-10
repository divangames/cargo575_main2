////////////////////////////////////////////////////////
//
// Выбор канала связи: звонок, Telegram, WhatsApp, MAX
//
////////////////////////////////////////////////////////

import { contactChannels } from "../../config/contactChannels";
import { ContactChannelIcon } from "../../helpers/contactChannelIcon";
import type { LeadContactChannel } from "../../types/lead";
import "./ContactChannelPicker.css";

interface Props {
  name: string;
  value: LeadContactChannel;
  onChange: (value: LeadContactChannel) => void;
}

/** Четыре крупные иконки, как клиент хочет получить ответ */
export function ContactChannelPicker({ name, value, onChange }: Props) {
  return (
    <fieldset className="lead-contact">
      <legend>Как с Вами связаться</legend>
      <div className="lead-contact-grid" role="radiogroup" aria-label="Как с Вами связаться">
        {contactChannels.map((item) => {
          const selected = value === item.id;
          return (
            <label key={item.id} className={`lead-contact-option lead-contact-${item.id}${selected ? " is-on" : ""}`}>
              <input
                type="radio"
                name={name}
                value={item.id}
                checked={selected}
                onChange={() => onChange(item.id)}
              />
              <span className="lead-contact-icon" aria-hidden="true">
                <ContactChannelIcon id={item.id} />
              </span>
              <span className="lead-contact-name">{item.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
