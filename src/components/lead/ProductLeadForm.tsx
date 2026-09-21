////////////////////////////////////////////////////////
//
// Форма «Ссылка или фото товара»
//
////////////////////////////////////////////////////////

import { useCallback, useRef, useState } from "react";
import { cargoCategories } from "../../config/content";
import { getContactChannel } from "../../config/contactChannels";
import { metrikaGoals } from "../../config/metrika";
import { RU_PHONE_PREFIX } from "../../helpers/ruPhoneMask";
import { validateProductLead } from "../../helpers/validateProductLead";
import { submitProductLead } from "../../services/productLeadService";
import { reachMetrikaGoal } from "../../services/metrikaService";
import type {
  ProductInputKind,
  ProductLeadErrors,
  ProductLeadStatus,
  ProductLeadValues,
} from "../../types/productLead";
import { Button } from "../ui/Button";
import { Field, SelectField } from "../ui/Field";
import { PhoneField } from "../ui/PhoneField";
import { ContactChannelPicker } from "./ContactChannelPicker";
import { LeadSuccessOverlay } from "./LeadSuccessOverlay";
import { ProductInputPicker } from "./ProductInputPicker";
import { ProductPhotoUpload } from "./ProductPhotoUpload";
import { SmartCaptchaField } from "./SmartCaptchaField";
import "./ProductLeadForm.css";

const emptyValues: ProductLeadValues = {
  kind: "link",
  productLink: "",
  photos: [],
  weight: "",
  cargo: "",
  contact: RU_PHONE_PREFIX,
  contactChannel: "telegram",
};

/** Открытая форма расчёта по ссылке, фото или параметрам груза */
export function ProductLeadForm() {
  const requestId = useRef(crypto.randomUUID());
  const [values, setValues] = useState<ProductLeadValues>(emptyValues);
  const [errors, setErrors] = useState<ProductLeadErrors>({});
  const [status, setStatus] = useState<ProductLeadStatus>("idle");
  const [submitError, setSubmitError] = useState("");
  const [smartToken, setSmartToken] = useState("");
  const [captchaReset, setCaptchaReset] = useState(0);
  const [captchaVisible, setCaptchaVisible] = useState(false);
  const [captchaError, setCaptchaError] = useState("");
  const phoneMeta = getContactChannel(values.contactChannel);

  const setField = useCallback(<K extends keyof ProductLeadValues>(key: K, value: ProductLeadValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    setSubmitError("");
  }, []);

  /** Меняет тип ввода и сбрасывает ошибки связанных полей */
  function setKind(kind: ProductInputKind) {
    setValues((prev) => ({ ...prev, kind }));
    setErrors({});
  }

  /** Сбрасывает невидимую капчу */
  function resetCaptcha() {
    setSmartToken("");
    setCaptchaVisible(false);
    setCaptchaError("");
    setCaptchaReset((prev) => prev + 1);
  }

  /** Отправка после токена капчи */
  async function sendWithToken(token: string) {
    setSmartToken(token);
    setCaptchaVisible(false);
    setCaptchaError("");
    setStatus("loading");
    try {
      await submitProductLead(values, token, requestId.current);
      reachMetrikaGoal(metrikaGoals.leadLinkOrPhoto);
      setStatus("success");
      resetCaptcha();
    } catch (error) {
      setStatus("error");
      resetCaptcha();
      const captchaFailed = error instanceof Error && error.message === "CAPTCHA_FAILED";
      setSubmitError(
        captchaFailed
          ? "Защита от спама не пропустила заявку. Попробуйте отправить ещё раз."
          : "Не удалось отправить заявку. Попробуйте ещё раз или позвоните 8 (800) 300-57-58.",
      );
    }
  }

  /** Валидация и запуск невидимой капчи / отправка */
  function submit() {
    const nextErrors = validateProductLead(values);
    setErrors(nextErrors);
    setSubmitError("");
    setCaptchaError("");
    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      return;
    }
    if (smartToken.trim()) {
      void sendWithToken(smartToken);
      return;
    }
    setCaptchaVisible(true);
  }

  /** Возвращает форму к начальному состоянию */
  function reset() {
    requestId.current = crypto.randomUUID();
    setValues(emptyValues);
    setErrors({});
    setSubmitError("");
    resetCaptcha();
    setStatus("idle");
  }

  return (
    <>
      {status === "success" ? (
        <LeadSuccessOverlay
          title="Заявка отправлена"
          text="Логист оценит товар и подберёт варианты доставки."
          onClose={reset}
        />
      ) : null}
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
      <PhoneField
        id="product-contact"
        label={phoneMeta.phoneLabel}
        value={values.contact}
        error={errors.contact}
        onChange={(contact) => setField("contact", contact)}
      />
      <SmartCaptchaField
        resetKey={captchaReset}
        visible={captchaVisible}
        error={captchaError}
        onToken={(token) => {
          void sendWithToken(token);
        }}
        onExpired={() => {
          setSmartToken("");
          setCaptchaVisible(false);
        }}
        onHidden={() => {
          setCaptchaVisible(false);
        }}
      />
      <Button type="submit" disabled={status === "loading" || status === "success" || captchaVisible}>
        {status === "loading" || captchaVisible ? "Отправляем…" : "Получить расчёт"}
      </Button>
      {submitError ? <p className="lead-submit-error">{submitError}</p> : null}
    </form>
    </>
  );
}
