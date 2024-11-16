const express = require('express');
const path = require('path');
const multer = require('multer');
const mysql = require('mysql2');

//Create connection to database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'database1'
});

//Connection
db.connect((err) => {
    if (err){
        console.error('Error connecting to the database: ', err.stack);
        return;
    }
    console.log('Connected to the database.');
});

module.exports = db;

// Initialize the Express application
const app = express();

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'), // Define where to store uploaded files
    filename: (req, file, cb) => cb(null, file.originalname) // Keep original file name
});
const upload = multer({ storage });

// Middleware to serve static files
app.use(express.static('public'));

// Root route to serve an HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signUp.html'));
});

// Route to handle file uploads
app.post('/upload', upload.single('myFile'), (req, res) => {
    res.send('File uploaded successfully: ' + req.file.originalname);
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
