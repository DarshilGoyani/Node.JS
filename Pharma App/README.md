# 💊 Darshil Pharma – Medicine Management System

A **full‑stack Pharmacy Inventory Management System** built using **Node.js, Express, MongoDB, and EJS**. This application allows admins to efficiently manage medicines with complete **CRUD operations**, real‑time stock insights, expiry tracking, and a clean professional dashboard UI.

---

## 🚀 Project Overview

**Darshil Pharma** is designed to help pharmacies digitally manage their medicine inventory. The system focuses on:

- Accurate stock tracking
- Expiry & validity monitoring
- Clean admin‑friendly UI
- Scalable backend architecture

This project is ideal for demonstrating **real‑world Node.js CRUD implementation**.

---

## ✨ Key Features

### 📦 Medicine Management (CRUD)

- ➕ Add new medicines with image upload
- ✏️ Edit existing medicine details
- ❌ Delete medicines safely with confirmation
- 👀 View complete medicine inventory

### ⏳ Expiry Tracking

- ✅ Valid medicines
- ⚠️ Expiring within 30 days
- ❌ Expired medicines

### 📊 Dashboard Analytics

- Total medicines count
- Valid & expiring medicines
- Total stock quantity
- Visual badges for quick status recognition

### 🔍 Smart Search & Filters

- Search by medicine name, manufacturer, or quantity
- Filter by stock level:
  - High Stock
  - Medium Stock
  - Low Stock
  - Out of Stock

### 🖼 Image Handling

- Medicine image upload using **Multer**
- Images rendered dynamically in inventory table

### 🎨 Modern UI

- Bootstrap 5 dashboard layout
- Sidebar navigation
- Responsive design (mobile & tablet supported)
- Clean cards, badges, and icons

---

## 🛠 Tech Stack

### Frontend

- HTML5
- CSS3
- Bootstrap 5
- EJS (Embedded JavaScript Templates)
- Font Awesome Icons

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer (Image Upload)

---

## 🗂 Database Schema (Medicine)

```js
{
  name: String,
  manufacturer: String,
  mfg_date: String,
  exp_date: String,
  status: String,
  quantity: Number,
  img: String
}
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/DarshilGoyani/Node.JS/tree/main/Pharma%20App.git
cd darshil-pharma
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment

Create a `.env` file:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

### 4️⃣ Run the Application

```bash
npm start
```

Open in browser:

```
http://localhost:8000
```

---

## 📁 Project Structure

```
darshil-pharma/
│
├── models/
│   └── medicine.js
├── routes/
│   └── medicineRoutes.js
├── views/
│   ├── index.ejs
│   ├── addMedicine.ejs
│   └── editMedicine.ejs
├── public/
│   ├── images/
│   └── css/
├── uploads/
├── app.js
├── package.json
└── README.md
```

---

## 📸 Screenshots

> 📌 Add screenshots of:

- Dashboard
- Add Medicine Page
- Edit Medicine Page
- Inventory Table

(Important for college submission & recruiters)

---

## 🎯 Use Case

This project is perfect for:

- College mini / major project
- Node.js CRUD demonstration
- Portfolio project for **Full‑Stack Developer** roles
- Learning real‑world MongoDB + Express workflows

---

## 🔮 Future Enhancements

- 🔐 Authentication & Role Management
- 📈 Advanced analytics dashboard
- 🔔 Expiry notifications
- 🧾 Invoice & billing module
- 📱 Mobile‑first UI improvements

---

## 👨‍💻 Developer

**Darshil Goyani**\
Full‑Stack Developer (MERN)

---

## ⭐ Support

If you like this project, don’t forget to **star ⭐ the repository** and share feedback!

---

> “Code it clean. Scale it smart.” 💻🔥

