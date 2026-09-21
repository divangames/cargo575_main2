/** Адрес страницы и UTM-метки для существующих колонок CRM. */
export function getLeadTracking() {
  const params = new URLSearchParams(window.location.search);
  return {
    pageUrl: window.location.href,
    utmSource: params.get("utm_source") ?? "",
    utmMedium: params.get("utm_medium") ?? "",
    utmCampaign: params.get("utm_campaign") ?? "",
    utmContent: params.get("utm_content") ?? "",
    utmTerm: params.get("utm_term") ?? "",
  };
}
