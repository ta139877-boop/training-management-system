const db = require('../config/database');

exports.addUser = async (req, res) => {
    const { employee_id, full_name, department, job_title, email } = req.body;
    try {
        const query = `INSERT INTO users (employee_id, full_name, department, job_title, email) VALUES (?, ?, ?, ?, ?)`;
        await db.execute(query, [employee_id, full_name, department, job_title, email]);
        res.send("<script>alert('تم إضافة الفرد بنجاح في النظام'); window.location.href='/views/add-user.html';</script>");
    } catch (err) {
        res.status(500).send("خطأ أثناء حفظ بيانات الفرد: " + err.message);
    }
};
