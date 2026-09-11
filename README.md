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
- маскот: `assets/mascote` → `public/mascote`
- кадры проверок груза для кейсов: `assets/check` → `public/images/check`
- фото мобильного hero: `assets/images/HERO.webp` → `public/images/hero/HERO.webp`
- фото офисов в Китае: `assets/images/china` → `public/images/china` (карусель в блоке «Компания»)
- аватар специалиста: `assets/images/ava.jpg` → `public/images/ava.jpg` (финальный блок и подвал)

## Структура

- `src/components/layout` — шапка (капсула; на мобильном — телефон и бургер), подвал, sticky CTA, кнопка «наверх»
- `src/components/sections` — блоки лендинга по ТЗ; сравнение карго и белой схемы — таблица-развилка в `Compare.tsx`
- `src/components/lead` — формы расчёта; успех — оверлей с галочкой по центру экрана; нижний блок — имя и способ связи; с тарифов ещё приоритет пакета
- `src/config` — контент и контакты
- `src/hooks` / `helpers` / `services` — логика заявки, скролл-анимации маршрута и автопроигрывание видео складов
- `src/components/ui/RoutePinScene.tsx` — пин-сцена с грузовиком в блоке «что входит в стоимость»
- `src/components/ui/VideoLightbox.tsx` — плеер склада: модалка, полный экран на телефоне, свайп вниз для закрытия
- `src/components/ui/PhotoLightbox.tsx` — полноэкранный просмотр фото из карусели Китая
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

Заявки с форм уходят в Telegram через PHP-прокси `https://chinatoway.ru/api/stanki-lead.php` (скрипты в папке `api/`). На GitHub Pages PHP не выполняется, поэтому используется уже работающий хост. Токен бота хранится только в `api/config.php` на сервере (в репозиторий не коммитится; образец — `api/config.example.php`).

## Коммерческие ориентиры

Цифры тарифов: эконом от 20 дней / 1 $/кг, оптимальный от 12 дней / 2 $/кг, авиа-экспресс 3–5 дней / от 30 $/кг, минимум от 2 кг. Срок не фиксируем. Точный расчёт индивидуальный.
