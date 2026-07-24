import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPlusCircle,
  FaArrowLeft,
  FaSave,
  FaTasks,
  FaAlignLeft,
  FaFlag,
  FaCalendarAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";

import Navbar from "../components/Navbar";
import { createTask } from "../services/taskService";

function CreateTask() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "Pending",
    priority: "Medium",
    category: "Work",
    dueDate: "",
  });

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!task.title.trim()) {
      toast.error("Task title is required");
      return;
    }

    try {
      setLoading(true);

      const response = await createTask(task);

      if (response.data.success) {
        toast.success("Task created successfully!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Unable to create task."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">

            <div className="card shadow-lg border-0">

              <div
                className="card-header text-white py-4"
                style={{
                  background:
                    "linear-gradient(135deg,#0d6efd,#6610f2)",
                }}
              >
                <h3 className="mb-0">
                  <FaPlusCircle className="me-2" />
                  Create New Task
                </h3>
              </div>

              <div className="card-body p-4">

                <form onSubmit={handleSubmit}>

                  {/* Title */}

                  <div className="mb-4">
                    <label className="form-label fw-bold">
                      <FaTasks className="me-2 text-primary" />
                      Task Title
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={task.title}
                      onChange={handleChange}
                      placeholder="Enter task title"
                      required
                    />
                  </div>

                  {/* Description */}

                  <div className="mb-4">
                    <label className="form-label fw-bold">
                      <FaAlignLeft className="me-2 text-success" />
                      Description
                    </label>

                    <textarea
                      rows="5"
                      className="form-control"
                      name="description"
                      value={task.description}
                      onChange={handleChange}
                      placeholder="Describe your task..."
                    />

                    <small className="text-muted">
                      {task.description.length}/250 characters
                    </small>
                  </div>

                  {/* Status */}

                  <div className="mb-4">
                    <label className="form-label fw-bold">
                      Status
                    </label>

                    <select
                      className="form-select"
                      name="status"
                      value={task.status}
                      onChange={handleChange}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>

                  {/* Priority */}

                  <div className="mb-4">
                    <label className="form-label fw-bold">
                      <FaFlag className="me-2 text-danger" />
                      Priority
                    </label>

                    <select
                      className="form-select"
                      name="priority"
                      value={task.priority}
                      onChange={handleChange}
                    >
                      <option value="Low">🟢 Low</option>
                      <option value="Medium">🟡 Medium</option>
                      <option value="High">🔴 High</option>
                    </select>
                  </div>

                  {/* Category */}

                  <div className="mb-4">
                    <label className="form-label fw-bold">
                      Category
                    </label>

                    <select
                      className="form-select"
                      name="category"
                      value={task.category}
                      onChange={handleChange}
                    >
                      <option value="Work">💼 Work</option>
                      <option value="Personal">🏠 Personal</option>
                      <option value="Study">📚 Study</option>
                    </select>
                  </div>

                  {/* Due Date */}

                  <div className="mb-4">
                    <label className="form-label fw-bold">
                      <FaCalendarAlt className="me-2 text-primary" />
                      Due Date
                    </label>

                    <input
                      type="date"
                      className="form-control"
                      name="dueDate"
                      value={task.dueDate}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="d-flex justify-content-between">

                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => navigate("/dashboard")}
                    >
                      <FaArrowLeft className="me-2" />
                      Back
                    </button>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      <FaSave className="me-2" />
                      {loading ? "Creating..." : "Create Task"}
                    </button>

                  </div>

                </form>

              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default CreateTask;