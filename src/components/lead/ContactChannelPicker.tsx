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
  legend?: string;
  onChange: (value: LeadContactChannel) => void;
}

/** Четыре крупные иконки, как клиент хочет получить ответ */
export function ContactChannelPicker({ name, value, legend = "Как удобнее получить расчёт?", onChange }: Props) {
  return (
    <fieldset className="lead-contact">
      <legend>{legend}</legend>
      <div className="lead-contact-grid" role="radiogroup" aria-label={legend}>
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
