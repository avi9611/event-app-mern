import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" 
  ? "http://localhost:5002/api" 
  : "https://your-backend-vercel-url.vercel.app/api";

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});