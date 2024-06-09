// axiosConfig.ts
import axios from "axios";

const Axios = axios.create({
  baseURL: "http://localhost:5000",
});

Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }
    return Promise.reject(error);
  }
);

export default Axios;
