const mysql = require('mysql2');
require('dotenv').config();

const dbUrl = process.env.MYSQL_PUBLIC_URL || process.env.MYSQL_URL;

if (!dbUrl) {
  console.error('No MySQL URL found in environment variables.');
  process.exit(1); 
}

const db = mysql.createConnection(dbUrl);

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to MySQL database.');
});

module.exports = db;
