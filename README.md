# 📋 ListSync — Smart Agent List Distribution App

ListSync is a lightweight and efficient web application built using the **MERN stack** that enables admins to upload lists via CSV/XLSX and intelligently distribute them among agents. Whether you're managing call lists, sales leads, or follow-ups — ListSync ensures fair distribution and seamless visibility.

![Portfolio Preview](public/ListSync.png)

![React](https://img.shields.io/badge/Frontend-React-blue?style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Styling-TailwindCSS-06B6D4?style=flat-square)
![Node.js](https://img.shields.io/badge/Backend-Express-green?style=flat-square)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen?style=flat-square)
![License](https://img.shields.io/github/license/OmXDev/listsync?style=flat-square)

---

## 🚀 Live Demo

- **Frontend**: [list-sync-topaz.vercel.app](https://list-sync-topaz.vercel.app/)
- **Backend**: (Optional) [listsync.onrender.com](https://listsync.onrender.com)
- **Demo Video**: [Watch Here](https://drive.google.com/file/d/your-demo-link)

---

## ✨ Features

### 🔐 Admin Login

- JWT-based secure login
- Email & password authentication
- Proper error handling with feedback

### 👥 Agent Management

- Add new agents with:
  - Full Name
  - Email
  - Mobile Number (with country code)
  - Password
- Display existing agents

### 📤 CSV/XLSX Upload & Distribution

- Upload a `.csv` or `.xlsx` file containing:
  - FirstName (Text)
  - Phone (Number)
  - Notes (Text)
- Validates file format and structure
- Automatically distributes data evenly among 5 agents
- Handles remainders by distributing sequentially
- Saves distributed data to MongoDB
- Displays assigned entries per agent

---

## 🛠 Tech Stack

| Layer       | Technology       |
|-------------|------------------|
| Frontend    | React + Tailwind CSS |
| Backend     | Node.js, Express |
| Database    | MongoDB          |
| Auth        | JSON Web Tokens (JWT) |
| Upload/Parse| CSV/XLSX support via backend (e.g., multer/xlsx) |

---

## 📂 Folder Structure

ListSync/
├── client/ # React frontend
│ ├── components/ # Reusable UI components
│ └── pages/ # Route pages like Login, Dashboard
├── server/ # Express backend
│ ├── models/ # MongoDB models
│ ├── routes/ # Express routers
│ └── controllers/ # Business logic

## ⚙️ Environment Variables

### 🔐 Frontend (`client/.env`)
```env
VITE_BACKEND_URL=
```

### 🔐 Backend (`server/.env`)
```env
MONGO_URI=
JWT_SECRET_KEY=
CLOUDINARY_API_SECRET=
CLOUD_NAME=
CLOUDINARY_API_KEY=
FRONTEND_URL=
```

---
## 🧪 Local Setup

### 🔧 Backend(server)
```bash
cd server
npm install
node server.js
```

### 💻 Frontend
```bash
cd client
npm install
npm run dev
```

Then open: [http://localhost:5173](http://localhost:5173)

---

## 🛠️ Future Improvements (Open for Contributions)

- ✅ Add automated testing (Jest / Mocha)  
- ✅ Role-based access control (Admin, Manager, Viewer)  
- ✅ Analytics or dashboard charts  
- ✅ Mobile responsiveness refinements  

---

## 📬 Feedback & Contribution

Pull requests, suggestions, and feature ideas are welcome! Feel free to fork the repo and contribute.

---

## 👤 Author

**OmXDev**  
🔗 [GitHub Profile](https://github.com/OmXDev)

---

## 📄 License

MIT – feel free to use, modify, and build upon this project.

