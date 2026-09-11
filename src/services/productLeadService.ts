////////////////////////////////////////////////////////
//
// Отправка заявки «Ссылка или фото» с файлами
//
////////////////////////////////////////////////////////

import { site } from "../config/site";
import { formatProductLeadTelegram } from "../helpers/formatProductLeadTelegram";
import type { ProductLeadValues } from "../types/productLead";

/** Отправляет текст и фото на product-lead.php → Telegram */
export async function submitProductLead(values: ProductLeadValues): Promise<void> {
  const formData = new FormData();
  formData.append("text", formatProductLeadTelegram(values));
  if (values.kind === "photo") {
    for (const file of values.photos) {
      formData.append("photos[]", file, file.name);
    }
  }

  const response = await fetch(site.productLeadApiUrl, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Product lead API error");
  }

  const data = (await response.json()) as { ok?: boolean };
  if (!data.ok) {
    throw new Error("Product lead rejected");
  }
}
