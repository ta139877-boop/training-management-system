const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// إعداد مجلد واسم الملفات المرفوعة
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// استدعاء المتحكمات (Controllers)
const userController = require('../controllers/userController');
const certController = require('../controllers/certController');

// روابط الـ API الخاصة بالنظام
router.post('/users', userController.addUser);
router.post('/certificates', upload.single('cert_file'), certController.addCertificate);

module.exports = router;
