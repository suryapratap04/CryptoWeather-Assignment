# 🌐 CryptoWeather Nexus

A modern, multi-page, real-time dashboard that combines global **weather**, **cryptocurrency**, and **news** data — built using **Next.js 13+**, **Redux**, **Tailwind CSS**, and **WebSockets**.

Live Demo 🔗: [https://crypto-weather-nexus.vercel.app](https://crypto-weather-nexus.vercel.app)

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [API Integrations](#-api-integrations)
- [Pages & Routing](#-pages--routing)
- [State Management](#-state-management)
- [Real-Time Data](#-real-time-data)
- [Challenges & Learnings](#-challenges--learnings)
- [Setup & Installation](#-setup--installation)
- [Future Improvements](#-future-improvements)
- [License](#-license)

---

## 📖 Overview

**CryptoWeather Nexus** is a responsive and interactive dashboard that provides:
- Live cryptocurrency data
- Real-time weather conditions for global cities
- Top crypto-related news
- WebSocket-based price alerts and weather simulations

It is designed with scalability, user experience, and real-time performance in mind.

---

## 🚀 Features

### 🔢 Dashboard Sections:
- **Weather Panel**: Live data for 3 cities (New York, London, Tokyo)
- **Crypto Panel**: Real-time prices and 24h stats for Bitcoin, Ethereum, and Solana
- **News Panel**: Latest top 5 crypto news headlines

### 🧭 Multi-Page Navigation:
- `/crypto/[id]`: Detailed crypto metrics with historical chart
- `/weather/[city]`: Weather trends with chart visualization
- `/news/[id]`: News article reader with meta info

### ⚡ Real-Time System:
- WebSocket integration for live BTC/ETH price tracking
- Simulated weather alerts pushed via Redux and displayed as toast notifications

### 🌟 Additional Features:
- Favorites section for quick access to saved cities/cryptos
- Error boundaries & loading states
- Responsive and mobile-first layout
- Dark-friendly design with clear UI interactions

---

## 🛠️ Tech Stack

| Layer        | Tech                       |
|--------------|----------------------------|
| Frontend     | React, Next.js 13+ App Router |
| Styling      | Tailwind CSS               |
| State Mgmt   | Redux Toolkit + Thunk      |
| APIs         | OpenWeatherMap, CoinCap, CryptoPanic |
| Real-Time    | CoinCap WebSocket          |
| UI Alerts    | React Hot Toast            |
| Hosting      | Vercel                     |

---

## 🏗️ Architecture

- **Next.js App Router (v13+)**
- Page-based routing (`/app`)
- Server-side data fetching with `async` page components
- Modular component design (city card, crypto tile, toast alert, etc.)
- Global state managed via Redux slices

---

## 🔌 API Integrations

| Data Type     | API Used                      |
|---------------|-------------------------------|
| Weather       | [OpenWeatherMap](https://openweathermap.org/api) |
| Crypto Stats  | [CoinCap REST + WebSocket](https://docs.coincap.io/) |
| News Headlines| [CryptoPanic API](https://cryptopanic.com/developers/api/) |

---

## 📂 Pages & Routing

| Route                  | Description                               |
|------------------------|-------------------------------------------|
| `/dashboard`           | Main page showing weather, crypto, news   |
| `/crypto/[id]`         | Detailed crypto view (e.g. BTC, ETH)      |
| `/weather/[city]`      | Historical weather info                   |
| `/news/[id]`           | News article detail page                  |

All dynamic pages support deep linking and prefetching.

---

## 🧠 State Management

- Global store using **Redux Toolkit**
- Async actions powered by **Redux Thunk**
- State slices:
  - `weatherSlice`
  - `cryptoSlice`
  - `newsSlice`
  - `alertsSlice`
  - `favoritesSlice`

---

## 🔔 Real-Time Data

- **WebSocket**:
  - CoinCap WebSocket for BTC and ETH
  - Real-time price change triggers alert

- **Simulated Alerts**:
  - Random dispatches simulate extreme weather
  - Toasts show alert type: `weather_alert` or `price_alert`

---

## ❗ Challenges & Learnings

| Challenge | Solution |
|----------|----------|
| Handling async dynamic routes | Used `async` pages with proper destructuring of `params` |
| Managing API failures gracefully | Implemented fallback UIs and retry logic |
| WebSocket setup in Next.js | Used `useEffect` for managing client-only sockets |
| Styling toast notifications responsively | Customized toast positions and responsiveness with Tailwind |

---

## ⚙️ Setup & Installation

```bash
# 1. Clone the repo
git clone https://github.com/suryapratap04/CryptoWeather-Assignment.git

# 2. Install dependencies
cd CryptoWeather-Assignment
npm install

# 3. Add .env file with the following:
NEXT_PUBLIC_WEATHER_API_KEY=your_openweather_api_key
NEXT_PUBLIC_CRYPTO_NEWS_API_KEY=your_news_api_key

# 4. Run the app
npm run dev

# 5. Build for production
npm run build
