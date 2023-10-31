// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from a .env file

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());

// Routes
app.get('/', (request, response) => {
  response.send('Testing 123');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${port}`);
});