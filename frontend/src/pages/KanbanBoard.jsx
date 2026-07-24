import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Navbar from "../components/Navbar";
import {
  getTasks,
  updateTask,
  deleteTask,
} from "../services/taskService";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function KanbanBoard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const response = await getTasks();

      if (response.data.success) {
        setTasks(response.data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase())
  );

  const sortByDueDate = (taskList) => {
    return [...taskList].sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    });
  };

  const pending = sortByDueDate(
    filteredTasks.filter((task) => task.status === "Pending")
  );

  const progress = sortByDueDate(
    filteredTasks.filter((task) => task.status === "In Progress")
  );

  const completed = sortByDueDate(
    filteredTasks.filter((task) => task.status === "Completed")
  );

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    // Dropped outside any column
    if (!destination) return;

    // Dropped in the same position
    if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
    ) {
        return;
    }

    // Find the dragged task
    const task = tasks.find((t) => t._id === draggableId);

    if (!task) return;

    // Create updated task object
    const updatedTask = {
        ...task,
        status: destination.droppableId,
    };

    try {
        // Save to database
        await updateTask(task._id, updatedTask);
        toast.success(`Task moved to ${destination.droppableId}`);

        // Update UI immediately
        setTasks((prevTasks) =>
        prevTasks.map((t) =>
            t._id === task._id
            ? { ...t, status: destination.droppableId }
            : t
        )
        );
    } catch (error) {
        console.error("Error updating task:", error);
        toast.error("Failed to update task");
    }
    };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {
      await deleteTask(id);

      await fetchTasks();

      toast.success("Task deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete task");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container text-center mt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>

          <p className="mt-3">Loading tasks...</p>
        </div>
      </>
    );
  }

  const renderColumn = (title, items, droppableId) => (
    <div className="col-md-4 mb-4">
      <div className="card shadow h-100">
        <div
            className={`card-header text-center fw-bold text-white ${
                droppableId === "Pending"
                ? "bg-warning"
                : droppableId === "In Progress"
                ? "bg-primary"
                : "bg-success"
            }`}
            >
            {title}
        </div>

        <div className="card-body bg-light">
          <Droppable droppableId={droppableId}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{ minHeight: "500px" }}
              >
                {items.map((task, index) => (
                  <Draggable
                    key={task._id}
                    draggableId={task._id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className={`card mb-3 shadow-sm ${
                          task.priority === "High"
                            ? "bg-danger-subtle"
                            : task.priority === "Medium"
                            ? "bg-warning-subtle"
                            : "bg-success-subtle"
                        } ${
                          task.dueDate &&
                          new Date(task.dueDate) < new Date() &&
                          task.status !== "Completed"
                            ? "border border-danger border-3"
                            : ""
                        }`}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        >
                        <div className="card-body">
                          <h6>{task.title}</h6>

                          <p className="small text-secondary mb-2">
                            Created:{" "}
                            {new Date(task.createdAt).toLocaleDateString()}
                          </p>

                          <p className="small text-muted">
                            {task.description}
                          </p>

                          {task.dueDate && (
                            <p className="small mb-2">
                                📅{" "}
                                {new Date(task.dueDate).toLocaleDateString()}
                            </p>
                            )}

                          <div className="d-flex justify-content-end gap-2 mt-3">
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => navigate(`/edit-task/${task._id}`)}
                            >
                              ✏️ Edit
                            </button>

                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(task._id)}
                            >
                              🗑 Delete
                            </button>
                          </div>

                          <div className="d-flex justify-content-between align-items-center">

                            <span
                                className={`badge ${
                                task.priority === "High"
                                    ? "bg-danger"
                                    : task.priority === "Medium"
                                    ? "bg-warning text-dark"
                                    : "bg-success"
                                }`}
                            >
                                {task.priority}
                            </span>

                            <span
                                className={`badge ${
                                task.category === "Work"
                                    ? "bg-primary"
                                    : task.category === "Personal"
                                    ? "bg-info text-dark"
                                    : "bg-secondary"
                                }`}
                            >
                                {task.category}
                            </span>

                            </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />

      <div className="container py-4">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>📋 Kanban Board</h2>

          <span className="badge bg-dark fs-6">
            Total Tasks: {tasks.length}
          </span>
        </div>

        <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="🔍 Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="row">

            {renderColumn(
              `📝 Pending (${pending.length})`,
              pending,
              "Pending"
            )}

            {renderColumn(
              `🚀 In Progress (${progress.length})`,
              progress,
              "In Progress"
            )}

            {renderColumn(
              `✅ Completed (${completed.length})`,
              completed,
              "Completed"
            )}
          </div>
        </DragDropContext>

      </div>
    </>
  );
}

export default KanbanBoard;