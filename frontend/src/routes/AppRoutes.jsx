import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import CreateTask from "../pages/CreateTask";
import EditTask from "../pages/EditTask";
import Profile from "../pages/Profile";
import KanbanBoard from "../pages/KanbanBoard";

function AppRoutes() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return null;
  }

  return (
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <Login />
          }
        />

        <Route
          path="/register"
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <Register />
          }
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/kanban"
          element={
            isAuthenticated ? <KanbanBoard /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/create-task"
          element={
            isAuthenticated ? <CreateTask /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/edit-task/:id"
          element={
            isAuthenticated ? <EditTask /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/profile"
          element={
            isAuthenticated ? <Profile /> : <Navigate to="/login" />
          }
        />

        {/* Unknown Routes */}
        <Route
          path="*"
          element={<Navigate to="/" />}
        />
      </Routes>
  );
}

export default AppRoutes;