const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '040101',
    database: 'Newspaper'
})

module.exports = connection;