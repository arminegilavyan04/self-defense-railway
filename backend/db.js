const mysql = require('mysql2');
require('dotenv').config();

// Ensure the MySQL URL is being picked up from the environment
const dbUrl = process.env.MYSQL_PUBLIC_URL || process.env.MYSQL_URL;

if (!dbUrl) {
  console.error('No MySQL URL found in environment variables.');
  process.exit(1); // Exit if DB URL is missing
}

// Create the MySQL connection
const db = mysql.createConnection(dbUrl);

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to MySQL database.');
});

module.exports = db;
