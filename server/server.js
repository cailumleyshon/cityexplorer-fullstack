// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // load environment variables from a .env file

const app = express();
const PORT = process.env.PORT || 8081;

// middleware
app.use(cors());

// routes
app.get('/', (request, response) => {
  response.send('Testing 123');
});

// start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const data = require("./data/weather.json");

app.get("/weather", (request, response) => {
  const lat = request.query.lat;
  const lon = request.query.lon;
  const searchQuery = request.query.searchQuery;
  
});