const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0988952320',
    database: 'Newspaper'
})

module.exports = connection;