const mysql = require('mysql2');

// إعداد الاتصال بقاعدة البيانات المحلية
const pool = mysql.createPool({
    host: 'localhost',       // لأن قاعدة البيانات على نفس جهاز السيرفر
    user: 'root',            // اسم المستخدم الافتراضي لـ MySQL
    password: '',            // الرقم السري (اتركه فارغاً إذا كنت تستخدم XAMPP افتراضياً)
    database: 'training_db', // اسم قاعدة البيانات التي أنشأتها
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// تحويل الـ Pool لدعم نظام الـ Promises (async/await) لسهولة الكود
const promisePool = pool.promise();

module.exports = promisePool;
