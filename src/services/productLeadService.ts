////////////////////////////////////////////////////////
//
// Отправка заявки «Ссылка или фото» с файлами
//
////////////////////////////////////////////////////////

import { site } from "../config/site";
import { formatProductLeadTelegram } from "../helpers/formatProductLeadTelegram";
import { getLeadTracking } from "../helpers/leadTracking";
import type { ProductLeadValues } from "../types/productLead";

/** Отправляет текст, фото и токен SmartCaptcha на product-lead.php */
export async function submitProductLead(values: ProductLeadValues, smartToken: string, requestId: string): Promise<void> {
  const formData = new FormData();
  formData.append("text", formatProductLeadTelegram(values));
  formData.append("smartToken", smartToken);
  formData.append("lead", JSON.stringify({
    type: "product",
    requestId,
    ...getLeadTracking(),
    formTitle: "Есть только ссылка или фото товара?",
    kind: values.kind,
    productLink: values.kind === "link" ? values.productLink : "",
    photoNames: values.kind === "photo" ? values.photos.map((file) => file.name).join(", ") : "",
    weight: values.kind === "params" ? values.weight : "",
    cargo: values.kind === "params" ? values.cargo : "",
    contact: values.contact,
    contactChannel: values.contactChannel,
  }));
  if (values.kind === "photo") {
    for (const file of values.photos) {
      formData.append("photos[]", file, file.name);
    }
  }

  const response = await fetch(site.productLeadApiUrl, {
    method: "POST",
    body: formData,
  });

  if (response.status === 403) {
    throw new Error("CAPTCHA_FAILED");
  }

  if (!response.ok) {
    throw new Error("Product lead API error");
  }

  const data = (await response.json()) as { ok?: boolean };
  if (!data.ok) {
    throw new Error("Product lead rejected");
  }
}
