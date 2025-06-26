const express = require('express');
const axios = require('axios');
const Joi = require('joi');

const router = express.Router();

const schema = Joi.object({
  city: Joi.string().min(1).required()
});

router.get('/', async (req, res) => {
  const { city } = req.query;

  const { error } = schema.validate({ city });
  if (error) {
    return res.status(400).json({ error: 'Invalid city name.' });
  }

  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const response = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        params: {
          q: city,
          appid: apiKey
        }
      }
    );

    const { name, main, weather } = response.data;
    return res.json({
      city: name,
      temperature: main.temp,
      condition: weather[0].main,
      humidity: main.humidity
    });

  } catch (err) {
    if (err.response && err.response.status === 404) {
      return res.status(404).json({ error: 'City not found.' });
    }
    console.error(err.message);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
