const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const weatherRouter = require('./routes/weather');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/weather', weatherRouter);

app.listen(PORT, () => {
});
