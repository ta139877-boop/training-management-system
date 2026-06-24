const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'training_db', // اسم قاعدة بياناتك التي وجدناها في phpMyAdmin
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
