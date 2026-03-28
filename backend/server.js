const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

const authRoute = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json()); 

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// This middleware passes the database pool to your route files
app.use((req, res, next) => {
  req.pool = pool;
  next();
});

// API Routes
app.use('/api/user', authRoute);

// TEMPORARY SETUP ROUTE: Creates the Users table in your CISE database
app.get('/api/setup', async (req, res) => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Users (
          UserID INT AUTO_INCREMENT PRIMARY KEY,
          Name VARCHAR(255) NOT NULL,
          Email VARCHAR(255) NOT NULL UNIQUE,
          Password VARCHAR(255) NOT NULL,
          Role ENUM('Customer', 'Volunteer', 'Manager') DEFAULT 'Customer'
      )
    `);
    res.send('✅ Users table successfully created in the CISE Database!');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  try {
    const connection = await pool.getConnection();
    console.log('✅ Connected to CISE MySQL database!');
    connection.release();
  } catch (err) {
    console.error('❌ MySQL Connection Error:', err.message);
  }
});