import api from "./api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  console.log("Token:", token);

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getTasks = () => {
  return api.get("/tasks", getAuthHeaders());
};

export const getTaskById = (id) => {
  return api.get(`/tasks/${id}`, getAuthHeaders());
};

export const createTask = (task) => {
  return api.post("/tasks", task, getAuthHeaders());
};

export const updateTask = (id, task) => {
  return api.put(`/tasks/${id}`, task, getAuthHeaders());
};

export const deleteTask = (id) => {
  return api.delete(`/tasks/${id}`, getAuthHeaders());
};