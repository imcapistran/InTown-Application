//connection to database
const mysql = require('mysql2');

module.exports = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'intowndb'
});