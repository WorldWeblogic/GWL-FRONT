import axios from "axios";

const API = axios.create({
  baseURL: "https://gwl-back-1.onrender.com/api" || "http://localhost:4000/api",
  withCredentials: true,
})
export const BASE_URL = "http://localhost:4000";
export default API;



