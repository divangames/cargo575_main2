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
- иконки MAX и WeChat: `assets/social` → `public/social`
- маскот: `assets/mascote` → `public/mascote`; на десктопной 404 вместо кота — та же векторная фура, что в hero (`VectorTruck`)
- кадры проверок груза для кейсов: `assets/check` → `public/images/check` (копируются при `npm run dev` / `build`; серия `16-01`… — один кейс)
- фото мобильного hero: `assets/images/HERO.webp` → `public/images/hero/HERO.webp`; на телефоне кнопка на фото открывает видео офиса в Гуанчжоу
- на десктопе в hero справа — то же фото; анимированная фура остаётся на мобильном и на странице 404
- фото офисов в Китае: `assets/images/china` → `public/images/china` (карусель в блоке «Компания»)
- аватар специалиста: `assets/images/ava.jpg` → `public/images/ava.jpg` (финальный блок и подвал)

## Структура

- `src/components/layout` — шапка (капсула; на мобильном — телефон и бургер), подвал, sticky CTA, кнопка «наверх»
- `src/components/sections` — блоки лендинга по ТЗ; сравнение карго и белой схемы — таблица-развилка в `Compare.tsx`
- `src/components/lead` — формы расчёта; блок «Ссылка или фото» с загрузкой до 5 фото; успех — оверлей с галочкой по центру экрана
- `src/config` — контент и контакты; кейсы — `src/config/cases.ts`
- `src/hooks` / `helpers` / `services` — логика заявки, маска телефона `+7 (9XX) XXX XX-XX`, скролл-анимации маршрута и автопроигрывание видео складов
- `src/components/ui/RoutePinScene.tsx` — пин-сцена с грузовиком в блоке «что входит в стоимость»
- `src/components/ui/VideoLightbox.tsx` — плеер склада: модалка, полный экран на телефоне, свайп вниз для закрытия
- `src/components/ui/PhotoLightbox.tsx` — полноэкранная галерея (офис в Китае и фотоотчёты кейсов)
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

Локальный помощник: `site-actions.bat`  
- `site-actions.bat pages` — только redeploy Pages  
- `site-actions.bat push` — сборка, безопасный commit и push  
- `site-actions.bat all` — push и ожидание Pages  

Сообщение коммита пишется в UTF-8 через `tools/write-commit-msg.ps1`.  
Для русского текста из PowerShell:

```powershell
$env:CARGO575_COMMIT_MSG = "Обновить сайт"
.\site-actions.bat push
```

Заявки с форм уходят в Telegram через PHP-прокси на chinatoway.ru: `stanki-lead.php` (текст) и `product-lead.php` (текст + фото). Скрипты в папке `api/`. На GitHub Pages PHP не выполняется, поэтому используется уже работающий хост. Токен бота и **ключ сервера SmartCaptcha** хранятся только в `api/config.php` на сервере (в репозиторий не коммитится; образец — `api/config.example.php`). На формах — невидимая Яндекс SmartCaptcha (`InvisibleSmartCaptcha`, ключ клиента в `src/config/smartCaptcha.ts`).

### Запись заявок в Google Sheets

Обе формы также записывают строку в существующий лист `gid=0` таблицы [CRM Карго 575](https://docs.google.com/spreadsheets/d/1MPH7bXoWtsMDLYh3V_-SfaFvdsH9yDnSwnXC4hMH54k/edit?gid=0). PHP отправляет данные в уже существующий Apps Script с полями `secret`, `time`, `name`, `phone`, `email`, `extra`, `ymClientId`, `formName`, `pageUrl` и UTM. Скрипт сохраняет их в колонки A–N. Детали заявки и ID идут в колонку E; имена загруженных файлов записываются туда же, сами фото по-прежнему отправляются в Telegram.

Для подключения:

1. Убедитесь, что существующий Apps Script развёрнут как веб-приложение и у вас есть URL `.../exec`.
2. На PHP-хосте в `api/config.php` укажите `sheets_webhook` (URL) и `sheets_secret` (значение `SHEETS_SECRET` из скрипта). Загрузите обновлённые `stanki-lead.php`, `product-lead.php` и новый `google-sheets.php` рядом с действующим `smartcaptcha.php`.
3. Загрузите новую сборку сайта. Перед отправкой посетителю показывается успех только после подтверждения записи в таблицу и отправки в Telegram. Если запись в таблицу не настроена или не удалась, API вернёт ошибку.

Существующий Apps Script не проверяет ID заявки на повторы: при повторной отправке после ошибки Telegram возможны одинаковые строки. Поле `ymClientId` пока передаётся пустым.

## Коммерческие ориентиры

Цифры тарифов: эконом от 20 дней / 1 $/кг, оптимальный от 12 дней / 2 $/кг, авиа-экспресс 3–5 дней / от 30 $/кг. Коммерческие партии для авто принимаются от 20 кг; партии меньшего веса можно рассмотреть для авиа, где минимум от 2 кг, например образцы. Срок не фиксируем. Точный расчёт индивидуальный.
