/**-------------------------
 
 * توليد رمز الوصول للمشرف
 * To Generate Admin Token
 
\------------------------*/

const jwt = require("jsonwebtoken");
require("dotenv").config(); // تأكد من تحميل متغيرات البيئة

const adminToken = jwt.sign(
  { id: "adminUserId", isAdmin: true },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);

console.log("Admin Token:", adminToken);