const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// MySQL database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sahil',
  database: 'quiz'
});

app.use(cors({
  origin: 'http://localhost:3001' // frontend's URL
}));

// database connection 
connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');
});


app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Login API endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM employee WHERE username = ? AND password = ?';

  connection.query(query, [username, password], (err, results) => {
    if (err) {
      res.status(500).send('Error querying the database');
      return;
    }
    if (results.length > 0) {
      const user = results[0];
      res.json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });
});

// Submit Api Endpoint
app.post('/submit', (req, res) => {
  const { question, selectedOption, username } = req.body;
  const query = 'INSERT INTO responses (question, selectedOption, username) VALUES (?, ?, ?)';
  connection.query(query, [question, selectedOption, username], (err, result) => {
    if (err) {
      console.error('Error inserting into the database:', err);
      return res.status(500).send('Error inserting into the database');
    }
    res.status(200).json({ message: 'Response submitted successfully', result });
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
