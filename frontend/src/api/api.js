import axios from "axios";
import { BASE_URL } from "../../config";

const API = axios.create({
  baseURL: `${BASE_URL}/api`
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default API;