const express = require('express');
const path = require('path');
const db = require('./db'); // Your database connection
const authRoutes = require('./routes/auth'); // Import authentication routes
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON bodies
app.use(express.json());

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, 'frontend')));

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Use the authentication routes for handling login and signup
app.use('/api', authRoutes);

// Listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
