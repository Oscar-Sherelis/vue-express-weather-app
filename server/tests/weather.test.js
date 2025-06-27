const request = require('supertest');
const express = require('express');
const weatherRouter = require('../routes/weather');

jest.mock('axios');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use('/api/weather', weatherRouter);

describe('GET /api/weather', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return weather data for a valid city', async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        name: 'London',
        main: { temp: 20, humidity: 60 },
        weather: [{ main: 'Clouds' }]
      }
    });

    const res = await request(app).get('/api/weather?city=London');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      city: 'London',
      temperature: 20,
      condition: 'Clouds',
      humidity: 60
    });
  });

  it('should return 400 for empty city input', async () => {
    const res = await request(app).get('/api/weather?city=');

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', 'Invalid city name.');
  });

  it('should return 404 if city is not found', async () => {
    axios.get.mockRejectedValueOnce({
      response: { status: 404 }
    });

    const res = await request(app).get('/api/weather?city=NowhereCity');

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error', 'City not found.');
  });
});
