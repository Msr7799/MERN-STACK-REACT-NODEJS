
# blog-pro-MERN-stack
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/cosmo/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
This repository is the client side and the server side of Blog Project built with MERN stack techs  for educational purpose 

<img src="MERN.png" alt="شعار المشروع">

# Usage
- Install Mongo DB on your local machine or use Mongo DB Cloud -> [Go To MongoDB Website](https://www.mongodb.com)
- Create Cloudinary account for storing the images -> [Go To Cloudinary Website](https://cloudinary.com/)
- Create `images` folder in the backend

## Environment Variables
قم بإنشاء ملف `.env` داخل مجلد الباكيند وإضافة التالي
```
PORT= 5000
MONGO_URI= رابط قاعدة البيانات MongoDB الخاصة بك
NODE_ENV= development
JWT_SECRET= مفتاح الـ JWT الخاص بك
CLOUDINARY_CLOUD_NAME= اسم المستخدم في Cloudinary
CLOUDINARY_API_KEY= مفتاح Cloudinary الخاص بك
CLOUDINARY_API_SECRET= مفتاح Cloudinary السري
CLIENT_DOMAIN= http://localhost:3000 
```


## Install Dependencies
**backend**
```
قم بكتابة الأمر التالي داخل مجلد الباكيند:
cd backend
npm install
```
**frontend**
```
قم بكتابة الأمر التالي داخل مجلد الفرونت اند:
cd frontend
npm install
npm install bootstrap-icons
```


## Run
**Run the backend**
```
قم بكتابة الأمر التالي لتشغيل الباكيند:
cd backend
npm run dev
```

**Run the frontend**
```
قم بكتابة الأمر التالي لتشغيل الفرونت اند:
cd frontend
npm start
```
