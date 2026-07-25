Task Management System

A full-stack Task Management System built using the MERN Stack (MongoDB, Express.js, React.js, Node.js). The application enables users to securely manage daily tasks with JWT authentication, interactive analytics, Kanban board support, search, filtering, sorting, and export features. The project is fully deployed with the frontend on Vercel and the backend on Render.

🚀 Live Demo

Frontend:
https://task-management-system-roan-sigma.vercel.app

Backend API:
https://task-management-backend-tbg1.onrender.com

Swagger API Documentation:
https://task-management-backend-tbg1.onrender.com/api-docs

Features
User Authentication
User Registration
User Login
JWT Authentication
Protected Routes
Logout
Task Management
Create Tasks
View Tasks
Update Tasks
Delete Tasks
Task Status Management
Due Date Management
Task Priority
Task Categories
Dashboard & Analytics
Total Tasks
Pending Tasks
In Progress Tasks
Completed Tasks
Priority Statistics
Category Statistics
Dashboard Cards
Interactive Charts
Advanced Features
Search Tasks
Filter Tasks
Sort Tasks
Kanban Board (Drag & Drop)
Recent Activity
Business Insights
Productivity Insights
Export to PDF
Export to Excel
Responsive UI
Mobile Friendly
Tablet Friendly
Desktop Responsive
Modern Dashboard Design
Tech Stack
Frontend
React.js
Vite
Bootstrap 5
Axios
React Router DOM
Chart.js
React ChartJS 2
React Beautiful DnD
React Icons
File Saver
jsPDF
Backend
Node.js
Express.js
MongoDB Atlas
Mongoose
JWT
bcrypt.js
Express Validator
CORS
dotenv
Deployment
Vercel (Frontend)
Render (Backend)
MongoDB Atlas (Database)
Project Structure
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
│   └── package.json
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   ├── services
│   │   ├── utils
│   │   └── App.jsx
│   └── package.json
│
├── screenshots
└── README.md
Installation
Clone Repository
git clone https://github.com/likhi-2403/Task-Management-System.git

cd Task-Management-System
Backend Setup
cd backend

npm install

Create a .env file inside the backend folder:

PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

Run backend:

npm start
Frontend Setup
cd frontend

npm install

Create a .env file inside the frontend folder:

VITE_API_URL=http://localhost:3000

Run frontend:

npm run dev
API Endpoints
Authentication
Method	Endpoint	Description
POST	/api/users/register	Register User
POST	/api/users/login	Login User
Tasks
Method	Endpoint	Description
GET	/api/tasks	Get All Tasks
POST	/api/tasks	Create Task
PUT	/api/tasks/:id	Update Task
DELETE	/api/tasks/:id	Delete Task
Screenshots
Login
screenshots/01-login.png
Register
screenshots/02-register.png
Dashboard
screenshots/03-dashboard-overview.png
Analytics
screenshots/04-dashboard-analytics.png
Charts
screenshots/05-dashboard-charts.png
Task Management
screenshots/06-task-management.png
Task Details
screenshots/07-task-details.png
Kanban Board
screenshots/08-kanban-board.png
Export Options
screenshots/09-export-options.png
Mobile View
screenshots/10-mobile-view.png
Deployment
Frontend (Vercel)
https://task-management-system-roan-sigma.vercel.app
Backend (Render)
https://task-management-backend-tbg1.onrender.com
Database
MongoDB Atlas
Future Enhancements
Email Notifications
Task Reminder System
Dark Mode
Team Collaboration
Calendar View
File Attachments
Recurring Tasks
User Profile Management
Activity Logs
AI-Based Task Recommendations
Author

Likhitha Doddi

GitHub: https://github.com/likhi-2403
LinkedIn: https://www.linkedin.com/in/likhitha-doddi
License

This project is developed for educational and portfolio purposes.

⭐ If you found this project useful, consider giving it a Star on GitHub!