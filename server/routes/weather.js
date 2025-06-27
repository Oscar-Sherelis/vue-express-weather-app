const express = require("express");
const axios = require("axios");
const Joi = require("joi");
const validator = require("validator");

const router = express.Router();

// Joi schema: basic validation + trim
const schema = Joi.object({
  city: Joi.string().trim().min(1).required(),
});

router.get("/", async (req, res) => {
  const { city } = req.query;

  const { error, value } = schema.validate({ city });
  if (error) {
    return res.status(400).json({ error: "Invalid city name." });
  }

  // Extra sanitization with validator
  let sanitizedCity = value.city;
  sanitizedCity = validator.escape(sanitizedCity); // Escape HTML special chars
  sanitizedCity = validator.stripLow(sanitizedCity); // Remove control chars
  sanitizedCity = validator.whitelist(sanitizedCity, "a-zA-Z\\s-"); // Allow only letters, spaces, hyphens

  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "API key is not configured." });
    }

    // Used 2.5, because version 3 requires latitude and longitude
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q: sanitizedCity,
          appid: apiKey,
          units: "metric", // Optional: returns temperature in °C
        },
      }
    );

    const { name, main, weather } = response.data;
    return res.json({
      city: name,
      temperature: main.temp,
      condition: weather[0].main,
      humidity: main.humidity,
    });
  } catch (err) {
    if (err.response && err.response.status === 404) {
      return res.status(404).json({ error: "City not found." });
    }
    return res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
