const mysql = require('mysql2');
require('dotenv').config();

// Check the environment to use the right MySQL URL
const dbUrl = process.env.MYSQL_PUBLIC_URL || process.env.MYSQL_URL;  // Force fallback to the public URL

// Log the URL being used for the database connection
console.log('Using database connection URL:', dbUrl);

if (!dbUrl) {
  console.error('No MySQL URL found. Please check your environment variables.');
  process.exit(1);
}

// Create the MySQL connection
const db = mysql.createConnection(dbUrl);

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the MySQL database.');
});

module.exports = db;
