# 📋 Task Management System

A full-stack **Task Management System** built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**. This application helps users organize, track, and manage their daily tasks efficiently through a modern dashboard with analytics, Kanban board, task filtering, search, and export functionality.

The project features **JWT Authentication**, interactive charts, task analytics, PDF/Excel export, and is fully deployed using **Vercel**, **Render**, and **MongoDB Atlas**.

---

## 🚀 Live Demo

### Frontend
https://task-management-system-roan-sigma.vercel.app

### Backend API
https://task-management-backend-tbg1.onrender.com

### Swagger API Documentation
https://task-management-backend-tbg1.onrender.com/api-docs

---

# 📌 Features

## 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Logout Functionality

---

## ✅ Task Management
- Create Tasks
- View Tasks
- Edit Tasks
- Delete Tasks
- Mark Tasks as Completed
- Task Priority
- Task Categories
- Due Date Management

---

## 📊 Dashboard & Analytics
- Total Tasks
- Pending Tasks
- In Progress Tasks
- Completed Tasks
- Priority Statistics
- Category Statistics
- Overall Progress
- Business Insights
- Productivity Insights
- Recent Activity
- Interactive Dashboard Cards
- Charts & Graphs

---

## 📋 Kanban Board
- Drag & Drop Tasks
- Task Status Tracking
- Easy Workflow Management

---

## 🔍 Advanced Features
- Search Tasks
- Filter Tasks
- Sort Tasks
- Task Details Modal
- Export Tasks to PDF
- Export Tasks to Excel

---

## 📱 Responsive Design
- Desktop Support
- Tablet Support
- Mobile Friendly
- Modern User Interface

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Vite
- Bootstrap 5
- Axios
- React Router DOM
- Chart.js
- React ChartJS 2
- React Beautiful DnD
- React Icons
- jsPDF
- File Saver

---

## Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcrypt.js
- Express Validator
- CORS
- dotenv

---

## Deployment
- Vercel
- Render
- MongoDB Atlas

---

# 📁 Project Structure

```
Task-Management-System
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   └── routes
│   ├── server.js
│   ├── swagger.js
│   ├── package.json
│   └── .env
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   ├── services
│   │   ├── utils
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── screenshots
└── README.md
```

---

# ⚙️ Installation

## Clone the Repository

```bash
git clone https://github.com/likhi-2403/Task-Management-System.git

cd Task-Management-System
```

---

# 🔧 Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file inside the **backend** folder.

```env
PORT=3000

MONGO_URI=your_mongodb_atlas_connection_string

JWT_SECRET=your_secret_key
```

Start the backend server.

```bash
npm start
```

Backend runs on:

```
http://localhost:3000
```

---

# 💻 Frontend Setup

```bash
cd frontend

npm install
```

Create a `.env` file inside the **frontend** folder.

```env
VITE_API_URL=http://localhost:3000
```

Run the frontend.

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint | Description |
|----------|------------------------|----------------|
| POST | /api/users/register | Register User |
| POST | /api/users/login | Login User |

---

## Tasks

| Method | Endpoint | Description |
|----------|----------------|----------------|
| GET | /api/tasks | Get All Tasks |
| POST | /api/tasks | Create Task |
| PUT | /api/tasks/:id | Update Task |
| DELETE | /api/tasks/:id | Delete Task |

---

# 📸 Screenshots

Add your screenshots inside the **screenshots** folder.

- Login Page
- Register Page
- Dashboard Overview
- Dashboard Analytics
- Charts
- Task Management
- Task Details
- Kanban Board
- Export Options
- Mobile View

---

# ☁️ Deployment

## Frontend (Vercel)

https://task-management-system-roan-sigma.vercel.app

---

## Backend (Render)

https://task-management-backend-tbg1.onrender.com

---

## Database

MongoDB Atlas

---

# 🎯 Future Enhancements

- Email Notifications
- Task Reminder System
- Calendar View
- Team Collaboration
- File Attachments
- Dark Mode
- User Profile Management
- Activity Logs
- AI-based Task Recommendations

---

# 👨‍💻 Author

**Likhitha Doddi**

GitHub  
https://github.com/likhi-2403

LinkedIn  
https://www.linkedin.com/in/likhitha-doddi

---

# ⭐ Support

If you found this project helpful, please consider giving it a **⭐ Star** on GitHub.

---

# 📄 License

This project is developed for educational, learning, and portfolio purposes.