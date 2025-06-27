<template>
  <div>
    <img
      v-if="weatherIcon"
      class="wheater-icon"
      :src="weatherIcon"
      alt="Weather icon"
    />
    <h2>{{ weather.city }}</h2>
    <p>Temperature: {{ weather.temperature }}°C</p>
    <p>Humidity: {{ weather.humidity }}%</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";

interface Weather {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
}

const props = defineProps<{
  weather: Weather | null;
}>();

const weatherIcon = computed(() => {
  switch (props.weather.condition.toLowerCase()) {
    case "clear":
      return new URL("../assets/images/icons/sunny.svg", import.meta.url).href;
    case "clouds":
      return new URL("../assets/images/icons/cloudy.svg", import.meta.url).href;
    case "rain":
    case "drizzle":
      return new URL("../assets/images/icons/rainy.svg", import.meta.url).href;
    case "snow":
      return new URL("../assets/images/icons/snowy.svg", import.meta.url).href;
    case "thunderstorm":
      return new URL("../assets/images/icons/thunder.svg", import.meta.url).href;
    default:
      return "";
  }
});
</script>
<style scoped>
.wheater-icon {
  min-height: 200px;
}
</style>
