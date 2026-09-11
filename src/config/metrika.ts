////////////////////////////////////////////////////////
//
// Идентификаторы целей Яндекс.Метрики
//
////////////////////////////////////////////////////////

/** Номер счётчика на сайте */
export const metrikaCounterId = 102098359;

/** Цели конверсий и кликов по мессенджерам */
export const metrikaGoals = {
  leadDelivery: "lid-cargo-delivery",
  leadHelpCargoOrWhite: "lid-cargo-help-cargo-or-white",
  leadBusinessTour: "lid-cargo-business-tour",
  leadQuestions: "lid-cargo-questions",
  leadLinkOrPhoto: "lid-cargo-link-or-photo",
  clickTelegram: "click-cargo-tg",
  clickTelegramGroup: "click-cargo-tg-group",
  clickMax: "click-cargo-max",
  clickWhatsapp: "click-cargo-wa",
  clickWechat: "click-cargo-wechat",
  clickTel: "click-cargo-tel",
} as const;

export type MetrikaGoalId = (typeof metrikaGoals)[keyof typeof metrikaGoals];
