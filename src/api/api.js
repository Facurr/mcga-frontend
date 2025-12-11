import axios from "axios";

export const api = axios.create({
  baseURL: "https://mcga-backend-uxe8.onrender.com/api",
});
