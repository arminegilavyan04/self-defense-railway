const express = require('express');
const path = require('path');
const db = require('./db'); // Assuming db.js is set up correctly
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../frontend_temp')));

// Root route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend_temp/index.html'));
});

// API route to get data from the database
app.get('/api/data', (req, res) => {
  db.query('SELECT * FROM usersDashboard', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Your other routes...

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
