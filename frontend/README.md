# 📋 Task Management System

A modern **MERN Stack Task Management System** that helps users organize, track, and manage their daily tasks efficiently. The application provides secure user authentication, task management, dashboard analytics, Kanban board, PDF/Excel export, and insightful visualizations for improved productivity.

---

## 📖 Overview

The Task Management System is a full-stack web application built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**. It allows users to securely manage their personal, study, and work-related tasks through an interactive dashboard with real-time analytics.

The application includes features such as task creation, editing, deletion, filtering, sorting, search functionality, dashboard insights, charts, Kanban board, and export options, making it an efficient productivity management solution.

---

# ✨ Features

### 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Secure Logout

### ✅ Task Management
- Create Tasks
- View Tasks
- Edit Tasks
- Delete Tasks
- Task Details Modal

### 📊 Dashboard Analytics
- Total Tasks
- Pending Tasks
- In Progress Tasks
- Completed Tasks
- Overall Progress
- Task Status Analysis
- Priority Analysis
- Category Analysis
- Business Insights
- Productivity Insights
- Top Category
- Recent Activity

### 🔎 Search & Filters
- Search by Title
- Search by Description
- Filter by Status
- Filter by Category
- Sort by:
  - Newest
  - Oldest
  - Priority
  - Due Date
- Clear Filters

### 📅 Task Tracking
- Due Today Tasks
- Overdue Tasks
- Progress Bars
- Priority Badges
- Category Badges

### 📈 Data Visualization
- Pie Chart
- Bar Chart
- Dashboard Analytics

### 📋 Kanban Board
- Drag & Drop Tasks
- Pending Column
- In Progress Column
- Completed Column

### 📤 Export
- Export Tasks to PDF
- Export Tasks to Excel

### 📱 UI Features
- Responsive Design
- Professional Dashboard
- Blue Color Theme
- Interactive Cards
- Modern UI
- Task Details Modal

---

# 🛠 Tech Stack

## Frontend

- React.js
- React Router DOM
- Bootstrap 5
- React Icons
- Axios
- React Toastify

## Backend

- Node.js
- Express.js

## Database

- MongoDB
- Mongoose

## Authentication

- JWT (JSON Web Token)
- bcryptjs

## Charts & Reports

- Recharts
- jsPDF
- xlsx

---

# 📂 Project Structure

```
Task-Management-System/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

# 📷 Screenshots

## 🔐 Login

![Login](screenshots/01-login.png)

---

## 📝 Register

![Register](screenshots/02-register.png)

---

## 📊 Dashboard Overview

![Dashboard Overview](screenshots/03-dashboard-overview.png)

---

## 📈 Dashboard Analytics

![Dashboard Analytics](screenshots/04-dashboard-analytics.png)

---

## 📊 Charts

![Charts](screenshots/05-dashboard-charts.png)

---

## ✅ Task Management

![Task Management](screenshots/06-task-management.png)

---

## 📋 Task Details

![Task Details](screenshots/07-task-details.png)

---

## 📌 Kanban Board

![Kanban Board](screenshots/08-kanban-board.png)

---

## 📤 Export Options

![Export Options](screenshots/09-export-options.png)

---

## 📱 Mobile Responsive View

![Mobile View](screenshots/10-mobile-view.png)

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/Task-Management-System.git
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm start
```

or

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
npm install
```

Run frontend:

```bash
npm run dev
```

---

# 💻 Usage

1. Register a new account.
2. Login securely.
3. Create tasks.
4. Edit or delete tasks.
5. Search and filter tasks.
6. View dashboard analytics.
7. Track overdue and due today tasks.
8. Use the Kanban board for drag-and-drop task management.
9. Export tasks to PDF or Excel.

---

# 📊 Dashboard Modules

- Dashboard Overview
- Task Statistics
- Priority Analysis
- Category Analysis
- Overall Progress
- Status Analysis
- Overdue Tasks
- Due Today Tasks
- Business Insights
- Top Category
- Charts
- Recent Activity
- Quick Actions

---

# 🔒 Security Features

- JWT Authentication
- Password Hashing using bcryptjs
- Protected Routes
- Secure API Access
- Authentication Middleware

---

# 🎯 Future Enhancements

- Dark Mode
- Email Notifications
- Task Reminders
- Team Collaboration
- Calendar Integration
- File Attachments
- User Profiles
- Activity Logs

---

# 👩‍💻 Author

**Likhitha Doddi**

- GitHub: https://github.com/likhi-2403
- LinkedIn: https://www.linkedin.com/in/likhitha-doddi

---

# ⭐ If you like this project

Give this repository a ⭐ on GitHub if you found it useful.

---

## 📄 License

This project is developed for learning and educational purposes.