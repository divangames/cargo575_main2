////////////////////////////////////////////////////////
//
// Кнопки мессенджеров: Telegram, MAX, WhatsApp, WeChat, группа
//
////////////////////////////////////////////////////////

import { circleSocials, pillSocials } from "../../config/socials";
import { FooterCircleIcon, FooterPillIcon } from "../../helpers/footerSocialIcon";
import { reachMetrikaGoal } from "../../services/metrikaService";
import "./SocialLinks.css";

interface Props {
  className?: string;
}

/** Одинаковый набор ссылок для подвала и меню */
export function SocialLinks({ className = "" }: Props) {
  return (
    <div className={`social-links ${className}`.trim()}>
      <div className="social-row">
        {circleSocials.map((item) => (
          <a
            key={item.id}
            className="social-circle"
            href={item.href}
            target="_blank"
            rel="noreferrer"
            aria-label={item.label}
            onClick={() => reachMetrikaGoal(item.metrikaGoal)}
          >
            <FooterCircleIcon id={item.id} />
          </a>
        ))}
      </div>
      <div className="social-pills">
        {pillSocials.map((item) => (
          <a
            key={item.id}
            className="social-pill"
            href={item.href}
            target="_blank"
            rel="noreferrer"
            onClick={() => reachMetrikaGoal(item.metrikaGoal)}
          >
            <span>{item.label}</span>
            <FooterPillIcon id={item.id} />
          </a>
        ))}
      </div>
    </div>
  );
}
