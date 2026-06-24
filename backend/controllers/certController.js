const db = require('../config/database');

exports.addCertificate = async (req, res) => {
    const { user_id, exam_id, score, status, issue_date, expiry_date } = req.body;
    const file_path = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        const query = `INSERT INTO certificates (user_id, exam_id, score, status, issue_date, expiry_date, file_path) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        await db.execute(query, [user_id, exam_id, score, status, issue_date, expiry_date || null, file_path]);
        res.send("<script>alert('تم رصد نتيجة الاختبار ورفع الشهادة بنجاح'); window.location.href='/views/add-exam.html';</script>");
    } catch (err) {
        res.status(500).send("خطأ أثناء رصد الشهادة: " + err.message);
    }
};
