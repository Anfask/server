const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

// Set up middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: null,
  database: 'xm4v1cco_server',
  port: '3306'
});

// GET all feedbacks
app.get('/feedback', (req, res) => {
  const sql = 'SELECT * FROM feedback';
  pool.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

// POST a new feedback
app.post('/feedback', (req, res) => {
  const { name, email, institution, phone, message, star } = req.body;
  const sql = 'INSERT INTO feedback (name, email, institution, phone, message, star) VALUES (?, ?, ?, ?, ?, ?)';
  pool.query(sql, [name, email, institution, phone, message, star], (err, result) => {
    if (err) {
      throw err;
    }
    res.send('Feedback added successfully');
  });
});

pool.getConnection((err, connection) => {
    if (err) {
      throw err;
    }
    console.log(`Connected to MySQL database`);
  });

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
