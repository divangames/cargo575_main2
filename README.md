# CARGO 575 — лендинг карго-доставки

Конверсионная посадочная страница «Карго доставка из Китая в Россию» для рекламного и органического трафика. Главное действие — заявка на расчёт стоимости.

## Стек

- React 19
- TypeScript
- Vite 7
- Phosphor Icons
- фирменные цвета из `assets/colors.txt`
- шрифт Montserrat из `assets/fonts`
- фото, маскот, видео складов и иконки категорий из `assets`
- кадры проверок груза для кейсов: `assets/check` → `public/images/check`

## Структура

- `src/components/layout` — шапка, подвал, sticky CTA
- `src/components/sections` — блоки лендинга по ТЗ
- `src/components/lead` — формы расчёта
- `src/config` — контент и контакты
- `src/hooks` / `helpers` / `services` — логика заявки, скролл-анимации процесса и автопроигрывание видео складов
- `src/components/ui/VideoLightbox.tsx` — плеер склада: модалка, полный экран на телефоне, свайп вниз для закрытия
- `public` — логотип, шрифты, изображения, видео

## Запуск

1. `install.bat` или `npm install`
2. `start.bat` / `dev.bat` или `npm run dev`
3. Откройте http://localhost:5175

## Сборка

`build.bat` или `npm run build` — результат в `dist`.

Предпросмотр: `preview.bat` или `npm run preview`.

## Деплой

Продакшен: соберите проект и загрузите содержимое `dist` на хостинг домена 575cargo.ru. `deploy.bat` собирает проект локально.

Превью на GitHub Pages: https://divangames.github.io/cargo575_main2/  
Репозиторий: https://github.com/divangames/cargo575_main2  
Сборка для Pages идёт workflow «GitHub Pages» при push в `main`.

Заявки пока пишутся в `localStorage` (`cargo575-leads`). Подключите CRM / почту в `src/services/leadService.ts`.

## Коммерческие ориентиры

Цифры «от 1 $/кг», «от 12 дней», «от 20 кг», офисы и контакты взяты с 575cargo.ru. Точный тариф всегда индивидуальный.
