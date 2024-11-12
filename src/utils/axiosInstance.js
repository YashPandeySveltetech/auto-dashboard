import axios from "axios";
import { refreshToken } from "./ApiHandle";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_KEY,
});

// Request interceptor to add the access token to headers
axiosInstance.interceptors.request.use(
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

// Response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is a 401 Unauthorized
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried

      try {
        await refreshToken(); // Attempt to refresh the token
        const newToken = localStorage.getItem("token"); // Get the new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`; // Set the new token
        return axiosInstance(originalRequest); // Retry the original request
      } catch (refreshError) {
        // Handle refresh token failure (e.g., redirect to login)
        localStorage.clear();
        window.location.reload(); // Optionally redirect to login
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
