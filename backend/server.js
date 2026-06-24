const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = 8080;

// قراءة البيانات القادمة من الواجهات (Forms & JSON)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ربط ومشاركة مجلدات الواجهات الأمامية لكي تفتح في المتصفح
app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// تفعيل مسارات الـ API للمستخدمين والشهادات
app.use('/api', apiRoutes);

// تشغيل السيرفر للشبكة المحلية
app.listen(PORT, '0.0.0.0', () => {
    console.log(`====================================================`);
    console.log(`نظام إدارة التدريب يعمل الآن بنجاح على المنفذ: ${PORT}`);
    console.log(`رابط الواجهة الرئيسية: http://localhost:${PORT}/views/dashboard.html`);
    console.log(`====================================================`);
});
