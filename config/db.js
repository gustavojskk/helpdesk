// config/db.js
const mysql = require('mysql2');
const dotenv = require('dotenv');
const Buffer = require('buffer').Buffer;

dotenv.config();

const decodedPassword = Buffer.from(process.env.DB_PASSWORD_BASE64, 'base64').toString('utf-8');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: decodedPassword,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});

module.exports = connection;