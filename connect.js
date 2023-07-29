const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '04082004',
    database: 'Newspaper'
})

module.exports = connection;