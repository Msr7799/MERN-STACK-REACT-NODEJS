const i18n = require('./config/i18n');
const express = require("express"); // استيراد مكتبة إكسبريس
const connectToDb = require("./config/connectToDb"); // استيراد دالة الاتصال بقاعدة البيانات
const xss = require("xss-clean"); // استيراد مكتبة منع هجمات XSS
const rateLimiting = require("express-rate-limit"); // استيراد مكتبة للحد من معدلات الطلبات
const helmet = require("helmet"); // استيراد مكتبة الأمن Helmet
const hpp = require("hpp"); // استيراد مكتبة منع تلوث المتغيرات في HTTP
const { errorHandler, notFound } = require("./middlewares/error"); // استيراد وسطاء التعامل مع الأخطاء
const cors = require("cors"); // استيراد مكتبة CORS
require("dotenv").config(); // تحميل متغيرات البيئة من ملف .env

// 🌐 الاتصال بقاعدة البيانات
connectToDb();

// ✨ إنشاء تطبيق Express
const app = express();

// 🛠️ استخدام الوسائط
app.use(express.json()); // وسيط لمعالجة الطلبات بتنسيق JSON

// 🛡️ إضافة رؤوس أمنية عبر Helmet
app.use(helmet());

// 🚨 منع تلوث المتغيرات في HTTP
app.use(hpp());

// 🔒 منع هجمات XSS
app.use(xss());

// 🚦 تحديد معدلات الطلبات
app.use(rateLimiting({
  windowMs: 10 * 60 * 1000, // 10 دقائق
  max: 200, // الحد الأقصى للطلبات
}));

// 🌍 سياسة CORS
app.use(cors({
  origin: "http://localhost:3000" // السماح بالوصول فقط من هذا النطاق
}));

// 🛣️ مسارات التطبيق
app.use("/api/auth", require("./routes/authRoute")); // مسار المصادقة
app.use("/api/users", require("./routes/usersRoute")); // مسار المستخدمين
app.use("/api/posts", require("./routes/postsRoute")); // مسار المقالات
app.use("/api/comments", require("./routes/commentsRoute")); // مسار التعليقات
app.use("/api/categories", require("./routes/categoriesRoute")); // مسار التصنيفات
app.use("/api/password", require("./routes/passwordRoute")); // مسار إعادة تعيين كلمة المرور
app.use("/api/status", require("./routes/statusRoute")); // مسار التحقق من صحة الخدمات

// ⚠️ وسيط التعامل مع الأخطاء
app.use(notFound); // عند عدم العثور على المسار
app.use(errorHandler); // معالجة الأخطاء العامة

// 🚀 تشغيل الخادم
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  try {
    console.log(`🚀 The Server working ${process.env.NODE_ENV} On PORT ${PORT}`);
    
    //✅ تحقق من الاتصال بقاعدة البيانات
    await connectToDb();
    console.log("✅ connected to mongoDB ^__^");

    // 🌐 تحقق من رابط API URL
    const apiUrl = process.env.API_URL || "http://localhost:5000";
    if (apiUrl) {
      console.log(`🌐 API URL : ${apiUrl}`);
      console.log(`🔗 Service Status URL: ${apiUrl}/api/status/status`);
    } else {
      console.warn("⚠️ لم يتم تعيين رابط API في متغيرات البيئة");
    }
  } catch (error) {
    console.error("❌ حدث خطأ أثناء محاولة الاتصال بقاعدة البيانات:", error);
  }
});