////////////////////////////////////////////////////////
//
// Форма «Ссылка или фото товара»
//
////////////////////////////////////////////////////////

import { useCallback, useState } from "react";
import { cargoCategories } from "../../config/content";
import { getContactChannel } from "../../config/contactChannels";
import { validateProductLead } from "../../helpers/validateProductLead";
import { submitProductLead } from "../../services/productLeadService";
import type {
  ProductInputKind,
  ProductLeadErrors,
  ProductLeadStatus,
  ProductLeadValues,
} from "../../types/productLead";
import { Button } from "../ui/Button";
import { Field, SelectField } from "../ui/Field";
import { ContactChannelPicker } from "./ContactChannelPicker";
import { LeadSuccessOverlay } from "./LeadSuccessOverlay";
import { ProductInputPicker } from "./ProductInputPicker";
import { ProductPhotoUpload } from "./ProductPhotoUpload";
import "./ProductLeadForm.css";

const emptyValues: ProductLeadValues = {
  kind: "link",
  productLink: "",
  photos: [],
  weight: "",
  cargo: "",
  contact: "",
  contactChannel: "telegram",
};

/** Открытая форма расчёта по ссылке, фото или параметрам груза */
export function ProductLeadForm() {
  const [values, setValues] = useState<ProductLeadValues>(emptyValues);
  const [errors, setErrors] = useState<ProductLeadErrors>({});
  const [status, setStatus] = useState<ProductLeadStatus>("idle");
  const phoneMeta = getContactChannel(values.contactChannel);

  const setField = useCallback(<K extends keyof ProductLeadValues>(key: K, value: ProductLeadValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }, []);

  /** Меняет тип ввода и сбрасывает ошибки связанных полей */
  function setKind(kind: ProductInputKind) {
    setValues((prev) => ({ ...prev, kind }));
    setErrors({});
  }

  /** Отправляет заявку в Telegram */
  async function submit() {
    const nextErrors = validateProductLead(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      await submitProductLead(values);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  /** Возвращает форму к начальному состоянию */
  function reset() {
    setValues(emptyValues);
    setErrors({});
    setStatus("idle");
  }

  if (status === "success") {
    return (
      <>
        <div className="product-form-ok-hold" aria-hidden="true" />
        <LeadSuccessOverlay
          title="Заявка отправлена"
          text="Логист оценит товар и подберёт варианты доставки."
          onClose={reset}
        />
      </>
    );
  }

  return (
    <form
      className="product-lead-form"
      onSubmit={(event) => {
        event.preventDefault();
        void submit();
      }}
      noValidate
    >
      <ProductInputPicker value={values.kind} onChange={setKind} />

      {values.kind === "link" ? (
        <Field
          id="product-link"
          label="Ссылка на товар"
          hint="Вставьте ссылку с 1688, Taobao, Alibaba или другого сайта"
          value={values.productLink}
          error={errors.productLink}
          inputMode="url"
          autoComplete="url"
          onChange={(event) => setField("productLink", event.target.value)}
        />
      ) : null}

      {values.kind === "photo" ? (
        <ProductPhotoUpload
          files={values.photos}
          error={errors.photos}
          onChange={(photos) => setField("photos", photos)}
        />
      ) : null}

      {values.kind === "params" ? (
        <div className="product-lead-row">
          <Field
            id="product-weight"
            label="Вес, кг"
            value={values.weight}
            error={errors.weight}
            inputMode="decimal"
            onChange={(event) => setField("weight", event.target.value)}
          />
          <SelectField
            id="product-cargo"
            label="Что везём?"
            optional
            value={values.cargo}
            error={errors.cargo}
            onChange={(cargo) => setField("cargo", cargo)}
          >
            <option value="">Категория товара</option>
            {cargoCategories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </SelectField>
        </div>
      ) : null}

      <ContactChannelPicker
        name="product-channel"
        value={values.contactChannel}
        legend="Куда отправить расчет?"
        onChange={(channel) => setField("contactChannel", channel)}
      />
      <Field
        id="product-contact"
        label={phoneMeta.phoneLabel}
        value={values.contact}
        error={errors.contact}
        autoComplete="tel"
        inputMode="tel"
        required
        aria-required="true"
        onChange={(event) => setField("contact", event.target.value)}
      />
      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Отправляем…" : "Получить расчёт"}
      </Button>
    </form>
  );
}
