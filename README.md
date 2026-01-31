# TravelTrucks (Frontend)

Frontend частина веб-додатку для оренди кемперів компанії **TravelTrucks**.  
Проєкт реалізований за ТЗ: Home → Catalog → Camper Details (галерея, фічі/відгуки, форма бронювання).

## Demo

- Live: (додай посилання на Vercel/Netlify)
- Repo: (додай посилання на GitHub, якщо потрібно)

## Tech stack

- Vite + React
- Redux Toolkit + React Redux
- React Router
- Axios
- CSS Modules
- react-hot-toast (нотифікації)
- react-helmet-async (head/meta)

## API

Base URL:
`https://66b1f8e71ca8ad33d4f5f63e.mockapi.io`

Endpoints:

- `GET /campers`
- `GET /campers/:id`

> Примітка: для стабільної роботи фільтрів реалізована **клієнтська фільтрація** після отримання даних з API.

## Figma (макет)

`https://www.figma.com/design/6vTbzaB3EPgOreQz2jOJJe/Campers?node-id=0-1`

## Features (по ТЗ)

- Routes: `/`, `/catalog`, `/catalog/:id`
- Home: кнопка **View Now** веде на Catalog
- Catalog:
  - фільтрація: location (text), body type (one), features (multiple)
  - при **Apply** результати скидаються і відображаються знову з урахуванням фільтрів
  - **Favorites**: додати/видалити, збереження в `localStorage`
  - ціна: у даних одним числом, в UI — формат **`8000,00`**
  - **Show more** відкриває сторінку деталей у новій вкладці
  - **Load more** збільшує кількість карток з урахуванням фільтрів
- Camper details:
  - галерея фото
  - вкладки **Features / Reviews**
  - відгуки зі зірковим рейтингом (5 зірок)
  - форма бронювання + успішна нотифікація
- Loader на асинхронних запитах
- Оформлений `head` (title), без помилок в консолі

Архітектурний статус

API → EQUIPMENT → matcher → filters / badges / features

## Local setup

1. Install dependencies:

npm install

2. Run in development:

npm run dev

3. Build for production:

npm run build

4. Preview production build:

npm run preview

Scripts

npm run dev — старт dev-сервера

npm run build — білд

npm run preview — превʼю білда

npm run lint — ESLint (якщо підключений)

Project structure (коротко)

src/api — axios instance + запити до API

src/redux — slices (campers / filters / favorites) + store

src/components — UI компоненти (Card, Filters, Lists, Form тощо)

src/pages — сторінки (Home, Catalog, Details, NotFound)

src/routes.jsx — маршрутизація (Layout + nested routes)

Notes

Favorites зберігаються в localStorage і залишаються після перезавантаження сторінки.

Якщо URL не існує — показується сторінка 404 Not Found.
