import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
})
export const BASE_URL = "http://localhost:4000";
export default API;



