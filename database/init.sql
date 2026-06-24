-- 1. جدول بيانات الأفراد الأساسية
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id VARCHAR(50) UNIQUE NOT NULL, -- الرقم الوظيفي أو الهوية
    full_name VARCHAR(255) NOT NULL,
    department VARCHAR(100),
    job_title VARCHAR(100),
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. جدول الدورات التدريبية والاختبارات المتاحة
CREATE TABLE exams (
    exam_id INT AUTO_INCREMENT PRIMARY KEY,
    exam_name VARCHAR(255) NOT NULL,        -- اسم الاختبار (مثلاً: CCNA, PMP)
    provider VARCHAR(255),                  -- الجهة المانحة (مثلاً: Cisco)
    passing_score INT DEFAULT 70            -- درجة النجاح
);

-- 3. جدول الشهادات ورصد النتائج (يربط الفرد بالاختبار والشهادة)
CREATE TABLE certificates (
    cert_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,                            -- يربط الفرد من جدول الأفراد
    exam_id INT,                            -- يربط نوع الاختبار من جدول الاختبارات
    score INT,                              -- الدرجة التي حصل عليها
    status ENUM('ناجح', 'راسب', 'مستمع') NOT NULL,
    issue_date DATE,                        -- تاريخ صدور الشهادة
    expiry_date DATE,                       -- تاريخ انتهاء الشهادة (إن وجد)
    file_path VARCHAR(255),                 -- رابط ملف الـ PDF المخزن داخلياً في السيرفر
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (exam_id) REFERENCES exams(exam_id) ON DELETE CASCADE
);
