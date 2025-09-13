<<<<<<< HEAD
# URL-Shortener-API
=======
# URL Shortener API

مشروع URL Shortener كامل باستخدام Node.js, Express, و Prisma.
بيتيحلك تسجيل مستخدم، إنشاء روابط قصيرة، استرجاع الروابط، وحذفها.

## Features

* تسجيل مستخدم جديد (Register)
* تسجيل الدخول (Login) والحصول على JWT
* إنشاء رابط قصير (Shorten URL)
* استرجاع كل الروابط للمستخدم (List URLs)
* حذف رابط (Delete URL)
* كل الروابط محمية بالـ JWT Authorization
* سجل الضغطات على كل رابط (Clicks count)

---

## Installation

1. استنساخ المشروع:

```bash
git clone <REPO_URL>
cd <PROJECT_FOLDER>
```

2. تثبيت الباكج:

```bash
pnpm install
# أو npm install
```

3. إعداد ملف `.env`:

```
DATABASE_URL="postgresql://user:password@localhost:5432/dbname?schema=public"
JWT_SECRET="your_jwt_secret"
PORT=5000
```

4. تطبيق Prisma Migrations:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

5. تشغيل السيرفر:

```bash
pnpm dev
# أو npm run dev
```

> السيرفر شغال على [http://localhost:5000](http://localhost:5000)

---

## API Endpoints

### 1️⃣ Register

**POST** `/api/auth/register`

**Body:**

```json
{
  "email": "test@example.com",
  "password": "123456"
}
```

**Response:**

```json
{
  "token": "your_jwt_token"
}
```

---

### 2️⃣ Login

**POST** `/api/auth/login`

**Body:**

```json
{
  "email": "test@example.com",
  "password": "123456"
}
```

**Response:**

```json
{
  "token": "your_jwt_token"
}
```

---

### 3️⃣ Create Short URL

**POST** `/api/urls/shorten`

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

**Body:**

```json
{
  "originalUrl": "https://example.com/very/long/url"
}
```

**Response متوقع:**

```json
{
  "id": 1,
  "originalUrl": "https://example.com/very/long/url",
  "shortCode": "abc123",
  "shortUrl": "http://localhost:5000/u/abc123",
  "clicks": 0,
  "userId": 1,
  "createdAt": "2025-09-13T15:00:00.000Z"
}
```

---

### 4️⃣ List URLs

**GET** `/api/urls`

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Response متوقع:**

```json
[
  {
    "id": 1,
    "originalUrl": "https://example.com/very/long/url",
    "shortCode": "abc123",
    "shortUrl": "http://localhost:5000/u/abc123",
    "clicks": 0,
    "userId": 1,
    "createdAt": "2025-09-13T15:00:00.000Z"
  }
]
```

---

### 5️⃣ Delete URL

**DELETE** `/api/urls/:id`

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Response متوقع:**

```json
{
  "message": "URL deleted successfully"
}
```

---

## Notes

* كل الـ URLs محمية بالـ JWT، لازم ترسل الـ token في كل request للـ `/api/urls`.
* استخدم Postman أو أي client HTTP لاختبار الـ API بسهولة.
* لا تنس تعديل `.env` حسب قاعدة البيانات والـ JWT secret الخاص بيك.
>>>>>>> 3adcbf1 (Initial commit - URL Shortener API)
