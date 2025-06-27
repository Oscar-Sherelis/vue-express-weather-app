<template>
  <div class="app">
    <h1>Weather App</h1>

    <input v-model="city" placeholder="Enter city name" />
    <button @click="getWeather">Get Weather</button>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="weather">
      <h2>{{ weather.city }}</h2>
      <p>Temperature: {{ weather.temperature }}°C</p>
      <p>Condition: {{ weather.condition }}</p>
      <p>Humidity: {{ weather.humidity }}%</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const city = ref('')
const weather = ref(null)
const error = ref(null)

const getWeather = async () => {
  error.value = null
  weather.value = null

  if (!city.value.trim()) {
    error.value = 'Please enter a city name.'
    return
  }

  try {
    const response = await axios.get(`/api/weather?city=${city.value}`)
    console.log('my response ', response)
    weather.value = response.data
    console.log('my response2 ', response.data)
  } catch (err) {
    error.value = err.response?.data?.error || 'Something went wrong.'
    console.log('erroras ', error)
  }
}
</script>

<style>
.app {
  font-family: sans-serif;
  max-width: 400px;
  margin: 2rem auto;
  padding: 1rem;
}
input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
}
button {
  padding: 0.5rem 1rem;
}
.error {
  color: red;
}
</style>
