const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');



const app = express();
app.use(cors());
app.use(bodyParser.json()); 
const db = mysql.createConnection({
     host: 'localhost',    //  MySQL host
     user: 'root',         // username
     password: 'Rex02', // MySQL password
     database: 'wings_cafe', // database name
});


// Connect to MySQL
db.connect((err) => {
     if (err) {
         console.error('Error connecting to MySQL:', err);
     } else {
         console.log('Connected to MySQL');
     }
 });

app.post('/api/u', (req, res) => {
     const { username, email, age } = req.body;
     const sql = 'INSERT INTO users (username, email, age) VALUES (?, ?, ?)';
     db.query(sql, [username, email, age], (err, result) => {
         if (err) {
             return res.status(500).send(err);
         }
         res.json({ message: 'User added successfully', userId: result.insertId });
     });
 });

app.get('/api/users', (req, res) => {
     const sql = 'SELECT * FROM users';
     db.query(sql, (err, results) => {
         if (err) {
             return res.status(500).send(err);
         }
         res.json(results);
     });
 });

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
