const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Create a MySQL connection
// const connection = mysql.createConnection({
//   host: 'autorack.proxy.rlwy.net', // Replace with MYSQL_PUBLIC_URL host
//   port: 21126,                      // Replace with MYSQL_PUBLIC_URL port
//   user: 'root',                     // Your database user
//   password: 'atKnmJDyCLypyJkacCiHFqSihHRwqBCF', // Your database password
//   database: 'railway',              // Your database name
// });

const connection = mysql.createConnection({
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLUPORT,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
  });

// Connect to the database
connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// API route to create an item
app.post('/api/items', (req, res) => {
  const { name } = req.body;
  connection.query('INSERT INTO items (name) VALUES (?)', [name], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId, name });
  });
});

// API route to get all items
app.get('/api/items', (req, res) => {
  connection.query('SELECT * FROM items', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Health check route
app.get('/health', (req, res) => {
  res.send('Server is running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
