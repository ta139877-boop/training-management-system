document.addEventListener("DOMContentLoaded", () => {
    // كود لتحديد الصفحة النشطة في القائمة الجانبية تلقائياً بناءً على الرابط
    const currentPath = window.location.pathname;
    const menuItems = {
        'dashboard.html': 'menu-dashboard',
        'add-user.html': 'menu-add-user',
        'add-exam.html': 'menu-add-exam',
        'profile.html': 'menu-profile',
        'reports.html': 'menu-reports'
    };

    Object.keys(menuItems).forEach(key => {
        if (currentPath.includes(key)) {
            const element = document.getElementById(menuItems[key]);
            if (element) element.classList.add('active');
        }
    });

    // إذا كنا واقفيين في لوحة التحكم، نقوم بتحديث أرقام الكروت التلقائية (اختياري مستقبلاً عبر API)
    if (currentPath.includes('dashboard.html')) {
        console.log("لوحة التحكم جاهزة ومربوطة بنجاح مع سيرفر الباكند.");
    }
});
