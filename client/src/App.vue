<template>
  <div class="app">
    <h1>Weather App</h1>

    <input class="city-input" v-model="city" placeholder="Enter city name" />
    <button @click="getWeather">Get Weather</button>

    <div v-if="error" class="error">{{ error }}</div>

    <WeatherCard v-if="weather" :weather="weather" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import WeatherCard from "./components/WeatherCard.vue";

const city = ref("");
const weather = ref(null);
const error = ref(null);

const getWeather = async () => {
  error.value = null;
  weather.value = null;

  if (!city.value.trim()) {
    error.value = "Please enter a city name.";
    return;
  }

  try {
    const response = await axios.get(`/api/weather?city=${city.value}`);
    weather.value = response.data;
  } catch (err) {
    error.value = err.response?.data?.error || "Something went wrong.";
  }
};
</script>

<style scoped>
.app {
  font-family: sans-serif;
  max-width: 400px;
  margin: 2rem auto;
  padding: 1rem;
}
.city-input {
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
}
button {
  padding: 0.5rem 1rem;
}
.error {
  color: red;
}
</style>
