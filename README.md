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
```
## ⚙️ Setup Instructions

### Clone the Repository

```bash
git clone https://github.com/your-username/vue-express-weather-app.git
cd vue-express-weather-app
```

### Backend
```bash
cd server
npm install
```
#### Add Environment Variables
```bash
# Create the .env file
touch .env
```
```text
# .env
OPENWEATHER_API_KEY=your_api_key_here
```
#### Run the Backend
```bash
npm run dev
```

### Frontend
```bash
cd client
npm install
npm run dev
```

## Run Tests (Backend)
```bash
cd server
npm test
```