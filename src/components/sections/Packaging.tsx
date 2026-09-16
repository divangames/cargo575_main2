////////////////////////////////////////////////////////
//
// Проверка и упаковка: процесс, варианты защиты и складские материалы
//
////////////////////////////////////////////////////////

import { Play } from "@phosphor-icons/react";
import { useCallback, useState } from "react";
import { assetUrl } from "../../helpers/assetUrl";
import type { ChinaOffice } from "../../types/office";
import { Reveal } from "../ui/Reveal";
import { VideoLightbox } from "../ui/VideoLightbox";
import "./Packaging.css";

const processSteps = [
  {
    number: "01",
    title: "Принимаем на складе",
    text: "Фиксируем каждое поступление и сверяем его с данными заказа.",
  },
  {
    number: "02",
    title: "Проверяем товар — доп. услуга",
    text: "Считаем позиции, проверяем модель, цвет, размер и видимые дефекты.",
  },
  {
    number: "03",
    title: "Подбираем упаковку",
    text: "Учитываем хрупкость, вес, габариты и способ перевозки партии.",
  },
  {
    number: "04",
    title: "Маркируем и снимаем отчёт",
    text: "Наносим код клиента, взвешиваем места и отправляем фото или видео.",
  },
] as const;

const packageTypes = [
  {
    title: "Коробка, усиленная коробка",
    text: "Укладка рядами, фиксация и защита от влаги.",
  },
  {
    title: "Влагостойкий мешок",
    text: "Для текстиля и мягких грузов.",
  },
  {
    title: "Паллетирование",
    text: "Для тяжёлых и сборных партий. Жёсткое основание, углы, дополнительная обрешётка (при необходимости), стрейч-плёнка.",
  },
  {
    title: "Обрешётка или деревянный ящик",
    text: "Для оборудования, мебели и хрупкого груза, которому нужна защита от ударов.",
  },
] as const;

const videos = [
  {
    src: "/proverka-upakovka/79a11ba575188f3a06ed67d609aaf333.mp4",
    poster: "/proverka-upakovka/posters/79a11ba575188f3a06ed67d609aaf333.jpg",
    title: "Жёсткая упаковка",
    text: "Собираем защитный каркас для крупной партии",
    wide: true,
  },
  {
    src: "/proverka-upakovka/7fbffe2b850c723c9138ebf9201575fa.mp4",
    poster: "/proverka-upakovka/posters/7fbffe2b850c723c9138ebf9201575fa.jpg",
    title: "Поштучная проверка",
    text: "Сверяем товар и наносим маркировку",
  },
  {
    src: "/proverka-upakovka/66603def922d439f9910ad0f39c75aff.mp4",
    poster: "/proverka-upakovka/posters/66603def922d439f9910ad0f39c75aff.jpg",
    title: "Защитный мешок",
    text: "Закрываем груз плотным внешним слоем",
  },
  {
    src: "/proverka-upakovka/c273718730f4dd37fe6ac17aa4d8309c.mp4",
    poster: "/proverka-upakovka/posters/c273718730f4dd37fe6ac17aa4d8309c.jpg",
    title: "Усиление лентой",
    text: "Фиксируем упаковку по всему периметру",
  },
  {
    src: "/proverka-upakovka/f6df45a614197073ceceb26ec57ac0dc.mp4",
    poster: "/proverka-upakovka/posters/f6df45a614197073ceceb26ec57ac0dc.jpg",
    title: "Паллетирование",
    text: "Защищаем углы и закрепляем груз на основании",
  },
  {
    src: "/proverka-upakovka/fe126bef3499c10023c0a6c0b3b08d4d.mp4",
    poster: "/proverka-upakovka/posters/fe126bef3499c10023c0a6c0b3b08d4d.jpg",
    title: "Готово к отправке",
    text: "Упакованные места ждут погрузки",
  },
] as const;

/** Показывает полный цикл складской проверки и варианты упаковки */
export function Packaging() {
  const [activeVideo, setActiveVideo] = useState<ChinaOffice | null>(null);
  const closeVideo = useCallback(() => setActiveVideo(null), []);

  return (
    <section className="block packaging" id="packaging">
      <div className="wrap-wide">
        <Reveal>
          <div className="packaging-intro">
            <div className="section-head">
              <p className="eyebrow">Складской контроль</p>
              <h2 className="section-title">Как мы проверяем и упаковываем груз</h2>
            </div>
            <p className="packaging-intro-note">
              Не отправляем товар вслепую. Сначала проверяем партию, затем выбираем защиту под её
              особенности — и показываем результат клиенту.
            </p>
          </div>
        </Reveal>

        <ol className="packaging-process" aria-label="Этапы проверки и упаковки">
          {processSteps.map((step) => (
            <li key={step.number}>
              <span className="packaging-step-number">{step.number}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="packaging-types-wrap">
          <div className="packaging-types-title">
            <p className="eyebrow">Виды упаковки</p>
            <h3>От обычного короба до жёсткой защиты</h3>
          </div>
          <div className="packaging-types">
            {packageTypes.map((item, index) => (
              <article key={item.title} className="packaging-type">
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="packaging-proof-head">
          <p className="eyebrow">Реальная работа склада</p>
          <p>Нажмите на видео, чтобы посмотреть процесс целиком</p>
        </div>

        <div className="packaging-media">
          {videos.map((video) => (
            <button
              type="button"
              key={video.src}
              className={`packaging-video${"wide" in video && video.wide ? " is-wide" : ""}`}
              onClick={() =>
                setActiveVideo({
                  city: video.title,
                  role: video.text,
                  video: assetUrl(video.src),
                  image: assetUrl(video.poster),
                })
              }
              aria-label={`Смотреть видео: ${video.title}`}
            >
              <img src={assetUrl(video.poster)} alt="" loading="lazy" decoding="async" />
              <span className="packaging-video-shade" aria-hidden="true" />
              <span className="packaging-play" aria-hidden="true">
                <Play size={24} weight="fill" />
              </span>
              <span className="packaging-video-copy">
                <strong>{video.title}</strong>
                <small>{video.text}</small>
              </span>
            </button>
          ))}
          <figure className="packaging-photo is-tall">
            <img
              src={assetUrl("/proverka-upakovka/packaging-bale.webp")}
              alt="Груз в защитном мешке, усиленном фирменной лентой CARGO 575"
              loading="lazy"
              decoding="async"
            />
            <figcaption>Защитный мешок и усиленная обмотка</figcaption>
          </figure>
          <figure className="packaging-photo is-wide">
            <img
              src={assetUrl("/proverka-upakovka/packaging-check.webp")}
              alt="Поштучная проверка и маркировка товара на складе"
              loading="lazy"
              decoding="async"
            />
            <figcaption>Поштучная проверка перед упаковкой</figcaption>
          </figure>
        </div>
      </div>
      {activeVideo ? <VideoLightbox office={activeVideo} onClose={closeVideo} /> : null}
    </section>
  );
}
