// index.js
const express = require('express');
const path = require('path');
const db = require('./db'); // Your database connection
const authRoutes = require('./routes/auth'); // Import the auth routes
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Parse incoming JSON requests

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, 'frontend')));

// Serve the main HTML file (e.g., index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Use the authentication routes (login, signup)
app.use('/api', authRoutes);  // All requests to /api/signup or /api/login will be handled by auth.js

// You can add other routes as needed (e.g., user profile)
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
