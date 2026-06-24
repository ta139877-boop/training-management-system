const express = require('express');
const path = require('path');
const multer = require('multer'); // مكتبة مخصصة لرفع الملفات (كالشهادات)
const db = require('./config/database');

const app = express();
const PORT = 8080; // المنفذ الذي سيعمل عليه الموقع في الشبكة

// إعدادات استقبال البيانات من النماذج (Forms)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// مشاركة المجلدات ليراها المستخدم (الواجهات والملفات المرفوعة)
app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// إعداد مكان حفظ الشهادات المرفوعة وتسميتها
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, 'uploads/')),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage: storage });

// --- الروابط البرمجية (API Routes) ---

// 1. رابط إدخال فرد جديد
app.post('/api/users', async (req, res) => {
    const { employee_id, full_name, department, job_title, email } = req.body;
    try {
        const query = `INSERT INTO users (employee_id, full_name, department, job_title, email) VALUES (?, ?, ?, ?, ?)`;
        await db.execute(query, [employee_id, full_name, department, job_title, email]);
        res.send("<script>alert('تم إضافة الفرد بنجاح'); window.location.href='/views/dashboard.html';</script>");
    } catch (err) {
        res.status(500).send("خطأ في إدخال البيانات: " + err.message);
    }
});

// 2. رابط رصد اختبار ورفع شهادة لفرد
app.post('/api/certificates', upload.single('cert_file'), async (req, res) => {
    const { user_id, exam_id, score, status, issue_date, expiry_date } = req.body;
    const file_path = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        const query = `INSERT INTO certificates (user_id, exam_id, score, status, issue_date, expiry_date, file_path) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        await db.execute(query, [user_id, exam_id, score, status, issue_date, expiry_date || null, file_path]);
        res.send("<script>alert('تم رصد الاختبار وحفظ الشهادة بنجاح'); window.location.href='/views/dashboard.html';</script>");
    } catch (err) {
        res.status(500).send("خطأ في رصد الشهادة: " + err.message);
    }
});

// تشغيل السيرفر ليتنصت على الشبكة الداخلية
app.listen(PORT, '0.0.0.0', () => { 
    // '0.0.0.0' تعني أن السيرفر يقبل الاتصال من أي جهاز داخل الشبكة المحلية وليس فقط جهازك
    console.log(`الموقع يعمل الآن داخلياً على الرابط: http://localhost:${PORT}`);
});
