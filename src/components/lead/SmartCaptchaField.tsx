////////////////////////////////////////////////////////
//
// Невидимая Яндекс SmartCaptcha: без чекбокса «Я не робот»
//
////////////////////////////////////////////////////////

import { InvisibleSmartCaptcha } from "@yandex/smart-captcha";
import { smartCaptchaSitekey } from "../../config/smartCaptcha";
import "./SmartCaptchaField.css";

interface Props {
  /** Сбрасывает виджет после отправки */
  resetKey: number;
  /** Запускает проверку при отправке формы */
  visible: boolean;
  error?: string;
  onToken: (token: string) => void;
  onExpired: () => void;
  /** Пользователь закрыл задание / проверка скрылась без токена */
  onHidden?: () => void;
}

/** Фоновая капча: всплывает только при подозрении, иначе проходит тихо */
export function SmartCaptchaField({ resetKey, visible, error, onToken, onExpired, onHidden }: Props) {
  return (
    <div className={`smart-captcha-field is-invisible${error ? " has-error" : ""}`} aria-hidden={!error}>
      <InvisibleSmartCaptcha
        key={resetKey}
        sitekey={smartCaptchaSitekey}
        language="ru"
        theme="light"
        visible={visible}
        hideShield
        onSuccess={onToken}
        onTokenExpired={onExpired}
        onNetworkError={onExpired}
        onChallengeHidden={onHidden}
      />
      {error ? <p className="smart-captcha-error">{error}</p> : null}
    </div>
  );
}
