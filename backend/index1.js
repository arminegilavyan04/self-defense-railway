const express = require('express');
const path = require('path');
const db = require('./db'); // Your database connection file
const bcrypt = require('bcryptjs');; // For password hashing
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, 'frontend')));

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Sign Up route
app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    db.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword],
      (err, results) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, username });
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Login route
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Find user by username
  db.query('SELECT * FROM users WHERE username = ?', [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = results[0];

    // Compare the provided password with the hashed password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful', user: { id: user.id, email: user.email } });
  });
});

// Other routes can be added here...

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
