////////////////////////////////////////////////////////
//
// Яндекс SmartCaptcha: публичный ключ клиента
//
////////////////////////////////////////////////////////

/** Идентификатор капчи cargo575-rf в Yandex Cloud */
export const smartCaptchaId = "bpnnuq98l9atb6ue9q2q";

/** Ключ клиента для виджета (можно светить на фронте) */
export const smartCaptchaSitekey =
  import.meta.env.VITE_SMARTCAPTCHA_SITEKEY?.trim() ||
  "ysc1_DSwDlEeyTyCOIzEkbUWKzNOuU0QkOORCUze0bYgfcb3bc508";
