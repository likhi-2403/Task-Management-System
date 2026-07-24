import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskChart from "../components/TaskChart";
import exportPDF from "../utils/exportPDF";
import exportExcel from "../utils/exportExcel";
import {
  FaTasks,
  FaSearch,
  FaEdit,
  FaTrash,
  FaCalendarAlt,
  FaChartPie,
  FaChartBar,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaClipboardList,
  FaBullseye,
  FaFire,
  FaFilePdf,
  FaFileExcel,
  FaPlus,
  FaBriefcase,
  FaHome,
  FaBook,
  FaBolt,
  FaHistory,
  FaLightbulb,
  FaTrophy,
} from "react-icons/fa";
import { toast } from "react-toastify";

import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import { getTasks, deleteTask } from "../services/taskService";

function Dashboard() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await getTasks();

      if (response.data.success) {
        setTasks(response.data.data);
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      const response = await deleteTask(id);

      if (response.data.success) {
        toast.success("Task deleted successfully");
        fetchTasks();
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to delete task");
    }
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setCategoryFilter("All");
    setSortBy("Newest");
  };

  const filteredTasks = useMemo(() => {
    let filtered = tasks.filter((task) => {
      const title = task.title || "";
      const description = task.description || "";

      const matchesSearch =
        title.toLowerCase().includes(search.toLowerCase()) ||
        description.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || task.status === statusFilter;

      const matchesCategory =
        categoryFilter === "All" || task.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });

    switch (sortBy) {
      case "Newest":
        filtered.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;

      case "Oldest":
        filtered.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        break;

      case "Priority":
        const priorityOrder = {
          High: 1,
          Medium: 2,
          Low: 3,
        };

        filtered.sort(
          (a, b) =>
            priorityOrder[a.priority] - priorityOrder[b.priority]
        );
        break;

      case "Due Date":
        filtered.sort(
          (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
        );
        break;

      default:
        break;
    }

    return filtered;
  }, [tasks, search, statusFilter, sortBy]);

  const total = tasks.length;
  const pending = tasks.filter((t) => t.status === "Pending").length;
  const progress = tasks.filter((t) => t.status === "In Progress").length;
  const completed = tasks.filter((t) => t.status === "Completed").length;

  const highPriority = tasks.filter((t) => t.priority === "High").length;
  const mediumPriority = tasks.filter((t) => t.priority === "Medium").length;
  const lowPriority = tasks.filter((t) => t.priority === "Low").length;

  const workTasks = tasks.filter((t) => t.category === "Work").length;
  const personalTasks = tasks.filter((t) => t.category === "Personal").length;
  const studyTasks = tasks.filter((t) => t.category === "Study").length;

  const categoryCounts = {
    Work: workTasks,
    Personal: personalTasks,
    Study: studyTasks,
  };

  const topCategory = Object.entries(categoryCounts).reduce(
    (max, current) => (current[1] > max[1] ? current : max)
  );

  const completionPercentage =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  const pendingPercentage =
    total === 0 ? 0 : Math.round((pending / total) * 100);

  const progressPercentage =
    total === 0 ? 0 : Math.round((progress / total) * 100);

  const completedPercentage =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  const overdueTasks = tasks.filter((task) => {
    if (!task.dueDate || task.status === "Completed") return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const due = new Date(task.dueDate);
    due.setHours(0, 0, 0, 0);

    return due < today;
  }).length;

  const dueTodayTasks = tasks.filter((task) => {
    if (!task.dueDate || task.status === "Completed") return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const due = new Date(task.dueDate);
    due.setHours(0, 0, 0, 0);

    return due.getTime() === today.getTime();
  }).length;

  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const insights = [];

  if (overdueTasks > 0) {
    insights.push(`⚠️ ${overdueTasks} overdue task(s) need attention.`);
  }

  if (dueTodayTasks > 0) {
    insights.push(`📅 ${dueTodayTasks} task(s) are due today.`);
  }

  if (highPriority > 0) {
    insights.push(`🔥 ${highPriority} high-priority task(s) remaining.`);
  }

  if (completed === total && total > 0) {
    insights.push("🎉 Excellent! All tasks are completed.");
  }

  if (total === 0) {
    insights.push("📝 Create your first task.");
  }

  if (completionPercentage >= 80) {
    insights.push("🏆 Excellent! Your productivity is outstanding.");
  } else if (completionPercentage >= 50) {
    insights.push("👍 Good progress! Keep completing your pending tasks.");
  } else if (total > 0) {
    insights.push("📈 You're getting started. Try completing more tasks.");
  }

  const getDueDateBadge = (dueDate) => {
    if (!dueDate) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);

    const diff = Math.ceil((due - today) / (1000 * 60 * 60 * 24));

    if (diff < 0) {
      return <span className="badge bg-danger">Overdue</span>;
    }

    if (diff === 0) {
      return (
        <span className="badge bg-warning text-dark">
          Due Today
        </span>
      );
    }

    return (
      <span className="badge bg-success">
        {diff} day{diff > 1 ? "s" : ""} left
      </span>
    );
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <Loading />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
          <div>
            <h2 className="fw-bold text-primary mb-1">
              <FaTasks className="me-2" />
              Task Dashboard
            </h2>

            <p className="text-muted mb-0">
              Track, organize and complete your daily tasks efficiently.
            </p>
          </div>

          <div
            className="card border-0 shadow-sm rounded-4 mb-4"
            style={{
              background: "linear-gradient(135deg, #0d6efd, #4f8cff)",
              color: "white",
            }}
          >
            <div className="card-body py-4 px-4">
              <h3 className="fw-bold mb-2">
                Welcome Back! 👋
              </h3>

              <p className="mb-0">
                Stay organized and keep track of your daily productivity.
              </p>
            </div>
          </div>

          <div className="d-flex gap-2 flex-wrap">

            <button
              className="btn btn-success shadow"
              onClick={() => exportExcel(filteredTasks)}
            >
              📊 Excel
            </button>

            <button
              className="btn btn-danger shadow"
              onClick={() => exportPDF(filteredTasks)}
            >
              📄 PDF
            </button>

            <button
              className="btn btn-dark shadow"
              onClick={() => navigate("/kanban")}
            >
              📋 Kanban
            </button>

            <button
              className="btn btn-primary shadow"
              onClick={() => navigate("/create-task")}
            >
              <FaPlus className="me-2" />
              New Task
            </button>

          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-3 mb-3">
            <div
              className="stats-card stats-primary shadow"
              style={{ cursor: "pointer" }}
              onClick={() => setStatusFilter("All")}
            >
              <h6>
                <FaClipboardList className="me-2" />
                Total Tasks
              </h6>
              <h2 className="display-5 fw-bold">{total}</h2>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div
              className="stats-card stats-warning shadow"
              style={{ cursor: "pointer" }}
              onClick={() => setStatusFilter("Pending")}
            >
              <h6>
                <FaClock className="me-2" />
                Pending
              </h6>
              <h2>{pending}</h2>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div
              className="stats-card stats-info shadow"
              style={{ cursor: "pointer" }}
              onClick={() => setStatusFilter("In Progress")}
            >
              <h6>
                <FaChartBar className="me-2" />
                In Progress
              </h6>
              <h2>{progress}</h2>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div
              className="stats-card stats-success shadow"
              style={{ cursor: "pointer" }}
              onClick={() => setStatusFilter("Completed")}
            >
              <h6>
                <FaCheckCircle className="me-2" />
                Completed
              </h6>
              <h2>{completed}</h2>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card border-danger shadow-sm text-center">
              <div className="card-body">
                <h6 className="text-danger"><FaFire className="me-2 text-danger" />High Priority</h6>
                <h2>{highPriority}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card border-warning shadow-sm text-center">
              <div className="card-body">
                <h6 className="text-warning"><FaBullseye className="me-2 text-warning" />Medium Priority</h6>
                <h2>{mediumPriority}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card border-success shadow-sm text-center">
              <div className="card-body">
                <h6 className="text-success"><FaCheckCircle className="me-2 text-primary" />Low Priority</h6>
                <h2>{lowPriority}</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-4 mb-3">
                  <div
                    className="card border-primary shadow-sm text-center"
                    style={{ cursor: "pointer" }}
                    onClick={() => setCategoryFilter("Work")}
                  >
                    <div className="card-body">
                      <h6 className="text-primary"><FaBriefcase className="me-2" />Work</h6>
                      <h2>{workTasks}</h2>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 mb-3">
                  <div
                    className="card border-info shadow-sm text-center"
                    style={{ cursor: "pointer" }}
                    onClick={() => setCategoryFilter("Personal")}
                  >
                    <div className="card-body">
                      <h6 className="text-info"><FaHome className="me-2" />Personal</h6>
                      <h2>{personalTasks}</h2>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 mb-3">
                  <div
                    className="card border-secondary shadow-sm text-center"
                    style={{ cursor: "pointer" }}
                    onClick={() => setCategoryFilter("Study")}
                  >
                    <div className="card-body">
                      <h6 className="text-secondary"><FaBook className="me-2" />Study</h6>
                      <h2>{studyTasks}</h2>
                    </div>
                  </div>
                </div>
              </div>

        <div className="col-md-4 mb-3">
          <select
            className="form-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option>Newest</option>
            <option>Oldest</option>
            <option>Priority</option>
            <option>Due Date</option>
          </select>
        </div>

        <div className="row mb-4">

          {/* Search */}
          <div className="col-md-3 mb-3">
            <div className="input-group">
              <span className="input-group-text">
                <FaSearch />
              </span>

              <input
                type="text"
                className="form-control"
                placeholder="Search by title or description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Status */}
          <div className="col-md-3 mb-3">
            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Category */}
          <div className="col-md-3 mb-3">
            <select
              className="form-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Study">Study</option>
            </select>
          </div>

          <div className="col-md-3 mb-3">
            <button
              className="btn btn-outline-secondary w-100"
              onClick={clearFilters}
            >
              🔄 Clear Filters
            </button>
          </div>

        </div>

        {filteredTasks.length === 0 ? (
          <div className="alert alert-info text-center shadow">
            <h3 className="fw-bold">
            📭 No Tasks Found
            </h3>

            <p className="text-muted">
            Try changing the filters or create a new task.
            </p>

            <button
            className="btn btn-primary mt-2"
            onClick={() => navigate("/create-task")}
            >
            ➕ Create First Task
            </button>
          </div>
        ) : (
          <div className="row">
            {filteredTasks.map((task) => (
              <div className="col-lg-6 col-xl-4 mb-4" key={task._id}>
                <div
                  className="card task-card shadow h-100 border-0"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setSelectedTask(task);
                    setShowTaskModal(true);
                  }}
                >
                  <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start">
                      <h4 className="fw-bold text-primary">{task.title}</h4>

                      <span
                      className={`badge rounded-pill px-3 py-2 ${
                        task.status === "Completed"
                          ? "bg-success"
                          : task.status === "In Progress"
                          ? "bg-info"
                          : "bg-warning text-dark"
                      }`}>
                        {task.status}
                      </span>
                    </div>

                    <p
                        className="text-secondary mt-3 flex-grow-1"
                        style={{
                            minHeight:"70px",
                            lineHeight:"1.6"
                        }}
                    >
                      {task.description || "No description provided."}
                    </p>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between">
                        <small className="fw-semibold">
                            Task Progress
                        </small>

                        <small>
                          {task.status === "Completed"
                            ? "100%"
                            : task.status === "In Progress"
                            ? "60%"
                            : "20%"}
                        </small>
                      </div>

                      <div className="progress" style={{ height: "8px" }}>
                        <div
                          className={`progress-bar ${
                            task.status === "Completed"
                              ? "bg-success"
                              : task.status === "In Progress"
                              ? "bg-info"
                              : "bg-warning"
                          }`}
                          style={{
                            width:
                              task.status === "Completed"
                                ? "100%"
                                : task.status === "In Progress"
                                ? "60%"
                                : "20%",
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="mb-3 d-flex gap-2 flex-wrap">

                      {/* Priority Badge */}

                      <span
                        className={`badge rounded-pill px-3 py-2 ${
                          task.priority === "High"
                            ? "bg-danger"
                            : task.priority === "Medium"
                            ? "bg-warning text-dark"
                            : "bg-success"
                        }`}
                      >
                        {task.priority === "High" && "🔴 "}
                        {task.priority === "Medium" && "🟡 "}
                        {task.priority === "Low" && "🟢 "}
                        {task.priority} Priority
                      </span>

                      {/* Category Badge */}

                      <span className="badge bg-primary rounded-pill px-3 py-2">

                        {task.category === "Work" && "💼"}

                        {task.category === "Personal" && "🏠"}

                        {task.category === "Study" && "📚"}

                        {" "}
                        {task.category}

                      </span>

                    </div>

                    <hr />

                    <small className="text-secondary">
                      <FaCalendarAlt className="me-2" />
                      Created{" "}
                      {new Date(task.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </small>

                    {task.dueDate && (
                      <div className="mt-2">
                        <small className="text-secondary fw-semibold">
                          Due Date:
                          {" "}
                          {new Date(task.dueDate).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </small>

                        <div className="mt-1">
                          {getDueDateBadge(task.dueDate)}
                        </div>
                      </div>
                    )}

                    <div className="mt-4 d-flex gap-2">
                      <button
                        className="btn btn-warning flex-fill text-white"
                        onClick={() => navigate(`/edit-task/${task._id}`)}
                      >
                        <FaEdit className="me-2" />
                        Edit
                      </button>

                      <button
                        className="btn btn-danger flex-fill"
                        onClick={() => handleDelete(task._id)}
                      >
                        <FaTrash className="me-2" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="card shadow mb-4">

          <div className="card-body">

            <div className="d-flex justify-content-between mb-2">

              <h5 className="mb-0">
                Overall Task Progress
              </h5>

              <div className="text-end">
                <span className="badge bg-primary fs-6 px-3 py-2">
                    {completionPercentage}%
                </span>

                <div className="text-center mt-3">

                  <h6 className="text-muted">

                      {completed} of {total} tasks completed

                  </h6>

              </div>

                <div className="small text-muted">
                  {completed} / {total} Tasks Completed
                </div>
              </div>

            </div>

            <div className="progress" style={{ height: "25px" }}>

              <div
                className="progress-bar bg-success"
                role="progressbar"
                style={{ width: `${completionPercentage}%` }}
                aria-valuenow={completionPercentage}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {completionPercentage}%
              </div>

            </div>

          </div>

        </div>

        <div className="row mb-4">

          <div className="col-md-6 mb-3">
            <div className="card border-start border-5 border-danger shadow-sm h-100">
              <div className="card-body">
                <h5 className="mb-1">⚠️ Overdue Tasks</h5>
                <h2>{overdueTasks}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-3">
            <div className="alert alert-warning shadow-sm">
              <h5 className="mb-1">📅 Due Today</h5>
              <h2>{dueTodayTasks}</h2>
            </div>
          </div>

        </div>

        <div className="card shadow mb-4">

          <div className="card-body">

            <h5 className="mb-4">
              Task Status Analysis
            </h5>

            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <span>🟢 Completed</span>
                <strong>{completedPercentage}%</strong>
              </div>

              <div className="progress">
                <div
                  className="progress-bar bg-success"
                  style={{ width: `${completedPercentage}%` }}
                />
              </div>
            </div>

            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <span>🔵 In Progress</span>
                <strong>{progressPercentage}%</strong>
              </div>

              <div className="progress">
                <div
                  className="progress-bar bg-info"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            <div>
              <div className="d-flex justify-content-between">
                <span>🟡 Pending</span>
                <strong>{pendingPercentage}%</strong>
              </div>

              <div className="progress">
                <div
                  className="progress-bar bg-warning"
                  style={{ width: `${pendingPercentage}%` }}
                />
              </div>
            </div>

          </div>

        </div>

        <div className="card shadow mb-4">
          <div className="card-body">
            <h5 className="mb-3"><FaLightbulb className="me-2" />Business Insights</h5>

            <div className="row">
              {insights.map((item, index) => (
                <div className="col-md-6 mb-3" key={index}>
                  <div className="alert alert-primary shadow-sm h-100 mb-0">
                    {item}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card shadow mb-4">
          <div className="card-body text-center">
            <h5 className="mb-3"><FaTrophy className="me-2 text-warning" />Top Category</h5>

            {total > 0 ? (
              <>
                <h2 className="display-6 fw-bold text-primary">{topCategory[0]}</h2>
                <p className="mb-0">
                  {topCategory[1]} task(s) belong to this category.
                </p>
              </>
            ) : (
              <p className="mb-0">No tasks available.</p>
            )}
          </div>
        </div>

        <div className="card shadow border-0 rounded-4 mb-4">
          <div className="card-body">

            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h4 className="fw-bold text-primary mb-1">
                  📊 Analytics Dashboard
                </h4>

                <small className="text-muted">
                  Task distribution and completion analysis
                </small>
              </div>

              <span className="badge bg-primary px-3 py-2">
                {total} Tasks
              </span>
            </div>

            <TaskChart tasks={tasks} />

          </div>
        </div>
        <div className="card shadow mb-4">
          <div className="card-body">

            <h4 className="fw-bold text-primary mb-4">
              <FaHistory className="me-2" />
              Recent Activity
            </h4>

            {recentTasks.length > 0 ? (
              <ul className="list-group list-group-flush">
                {recentTasks.map((task) => (
                  <li
                    key={task._id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>{task.title}</strong>
                      <br />
                      <small className="text-muted">
                          {task.category} • {task.status}
                      </small>
                    </div>

                    <span className="badge rounded-pill bg-primary px-3 py-2">
                      {new Date(task.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted mb-0">
                No recent activity found.
              </p>
            )}

          </div>
        </div>
        <div className="card shadow mt-4">
          <div className="card-body">
            <h4 className="fw-bold text-primary mb-4">
            <FaBolt className="me-2" />
            Quick Actions
            </h4>

            <div className="d-flex flex-wrap gap-3">
              <button
                className="btn btn-primary px-4"
                onClick={() => navigate("/create-task")}
              >
                ➕ Create Task
              </button>

              <button
                className="btn btn-dark"
                onClick={() => navigate("/kanban")}
              >
                📋 Open Kanban Board
              </button>

              <button
                className="btn btn-success"
                onClick={() => exportExcel(filteredTasks)}
              >
                📊 Export Excel
              </button>

              <button
                className="btn btn-danger"
                onClick={() => exportPDF(filteredTasks)}
              >
                📄 Export PDF
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="bg-white border-top mt-5 py-4 shadow-sm">

        <div className="container">

          <div className="row align-items-center">

            <div className="col-md-6">

              <h5 className="text-primary fw-bold mb-1">
                Task Management System
              </h5>

              <small className="text-muted">
                Organize • Track • Complete
              </small>

            </div>

            <div className="col-md-6 text-md-end mt-3 mt-md-0">

              <div className="fw-semibold">
                Developed by Likhitha Doddi
              </div>

              <small className="text-muted">
                © {new Date().getFullYear()} All Rights Reserved
              </small>

            </div>

          </div>

        </div>

      </footer>

      {showTaskModal && selectedTask && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">
                  <FaClipboardList className="me-2" />
                  Task Details
                </h5>

                <button
                  className="btn-close"
                  onClick={() => setShowTaskModal(false)}
                ></button>
              </div>

              <div className="modal-body">

                <p>
                  <strong>Title:</strong><br />
                  {selectedTask.title}
                </p>

                <p>
                  <strong>Description:</strong><br />
                  {selectedTask.description || "No description"}
                </p>

                <p>
                  <strong>Status:</strong>
                  <br />

                  <span
                    className={`badge ${
                      selectedTask.status === "Completed"
                        ? "bg-success"
                        : selectedTask.status === "In Progress"
                        ? "bg-info"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {selectedTask.status}
                  </span>
                </p>

                <p>
                  <strong>Priority:</strong>
                  <br />

                  <span
                    className={`badge ${
                      selectedTask.priority === "High"
                        ? "bg-danger"
                        : selectedTask.priority === "Medium"
                        ? "bg-warning text-dark"
                        : "bg-success"
                    }`}
                  >
                    {selectedTask.priority === "High" && "🔴 "}
                    {selectedTask.priority === "Medium" && "🟡 "}
                    {selectedTask.priority === "Low" && "🟢 "}
                    {selectedTask.priority}
                  </span>
                </p>

                <p>
                  <strong>Category:</strong>
                  <br />

                  <span className="badge bg-primary">
                    {selectedTask.category === "Work" && "💼 "}
                    {selectedTask.category === "Personal" && "🏠 "}
                    {selectedTask.category === "Study" && "📚 "}
                    {selectedTask.category}
                  </span>
                </p>

                <p>
                  <strong>Due Date:</strong>
                  <br />
                  📅{" "}
                  {selectedTask.dueDate
                    ? new Date(selectedTask.dueDate).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "Not Set"}
                </p>

                <p>
                  <strong>Created:</strong><br />
                  {new Date(selectedTask.createdAt).toLocaleDateString()}
                </p>

              </div>

              <div className="modal-footer">

                <button
                  className="btn btn-secondary"
                  onClick={() => setShowTaskModal(false)}
                >
                  Close
                </button>

              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
