////////////////////////////////////////////////////////
//
// Контакты и юридические данные CARGO 575
//
////////////////////////////////////////////////////////

export const site = {
  name: "CARGO 575",
  legalName: "CARGO 575",
  domain: "https://575cargo.ru",
  url: "https://575cargo.ru",
  phoneDisplay: "8 (800) 300-57-58",
  phoneHref: "tel:+78003005758",
  email: "gocargo575@yandex.ru",
  address: "г. Красноярск, ул. Мичурина, 2Ж",
  hours: "Пн–Пт 09:00–18:00",
  telegramHref: "https://t.me/gocargo575",
  telegramGroupHref: "https://t.me/cargoship575",
  whatsappHref: "https://wa.me/message/TJLIWABWBSXTP1",
  maxHref: "https://max.ru/u/f9LHodD0cOJe7oWm89NxYpe7GHSP5OdSp1KPuRoqGJLmEOznB6ba2DIK7Cw",
  wechatHref: "https://u.wechat.com/kGcGqguw2mtv3r_l3l-bAto?s=4",
  legal: {
    entrepreneur: "ИП ЗОТОВ ИВАН ВЛАДИМИРОВИЧ",
    account: "40802810023260001962",
    ogrnip: "319246800138804",
    inn: "246113569495",
    bik: "0045004774",
  },
  // Локально Vite проксирует /api на chinatoway.ru; в сборке — прямой URL
  leadApiUrl: import.meta.env.DEV
    ? "/api/stanki-lead.php"
    : "https://chinatoway.ru/api/stanki-lead.php",
  productLeadApiUrl: import.meta.env.DEV
    ? "/api/product-lead.php"
    : "https://chinatoway.ru/api/product-lead.php",
} as const;

/** Реквизиты одной строкой для мелкого текста в подвале */
export const legalLine = [
  site.legal.entrepreneur,
  `РС ${site.legal.account}`,
  `ОГРНИП ${site.legal.ogrnip}`,
  `ИНН ${site.legal.inn}`,
  `БИК ${site.legal.bik}`,
].join(" · ");
