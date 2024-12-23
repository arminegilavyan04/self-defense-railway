const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db'); 


const router = express.Router();


router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

 
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Please provide all required fields.' });
  }

  try {
    
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) {
        console.error('Error checking email:', err);
        return res.status(500).json({ error: 'Error checking email in the database.' });
      }

      if (results.length > 0) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      
      const hashedPassword = await bcrypt.hash(password, 10);

      db.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword],
        (err, results) => {
          if (err) {
            console.error('Error inserting user:', err);
            return res.status(500).json({ error: 'Error inserting user into the database.' });
          }

          res.status(201).json({
            id: results.insertId,
            username,
            email,
          });
        }
      );
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Server error during signup' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Please provide both email and password' });
  }

  try {
    
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) {
        console.error('Error querying the database:', err);
        return res.status(500).json({ error: 'Database error during login.' });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const user = results[0];

      
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

     
      res.json({
        message: 'Login successful',
        user: { id: user.id, username: user.username, email: user.email },
      });
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

module.exports = router;
