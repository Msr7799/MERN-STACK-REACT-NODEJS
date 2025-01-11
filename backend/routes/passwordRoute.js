const express = require('express');
const { sendResetPasswordLinkCtrl, resetPasswordCtrl } = require('../controllers/passwordController');
const router = express.Router();

// مسار لإرسال رابط إعادة تعيين كلمة المرور
router.post('/reset-password-link', sendResetPasswordLinkCtrl);

// مسار لإعادة تعيين كلمة المرور
router.post('/reset-password/:userId/:token', resetPasswordCtrl);

module.exports = router;