import api from "./api";

export const registerUser = (userData) =>
  api.post("/users/register", userData);

export const loginUser = (userData) =>
  api.post("/users/login", userData);