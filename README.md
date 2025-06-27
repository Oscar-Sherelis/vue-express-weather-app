# 🌦️ Full Stack Weather App

A simple full-stack weather application that lets users search for the current weather in any city.

- ✅ Built with **Vue.js** (frontend) and **Node.js + Express** (backend)
- 🔒 API key is secured via backend `.env` file
- 🔬 Includes automated backend tests with **Jest**
- ☁️ Fetches live data from the **OpenWeatherMap API**
https://openweathermap.org/current

---

## 🧱 Tech Stack

| Layer     | Stack        |
|-----------|--------------|
| Frontend  | Vue 3 (Vite) |
| Backend   | Node.js + Express |
| Testing   | Jest + Supertest |
| API       | OpenWeatherMap |
| Dev Tools | dotenv, axios, cors, joi, validator |

---

## 📁 Project Structure
```text
vue-express-weather-app/
├── client/             # Vue 3 frontend
├── server/             # Express backend
│   ├── routes/         # Route handlers
│   ├── tests/          # Jest test files
│   ├── .env.example    # API key template
│   └── index.js        # Entry point