import axios from "axios";
import { Error400_401 } from "./Error400_401";
import { REFRESH } from "./constants";
import { toast } from "react-toastify";

const baseUrl = process.env.REACT_APP_API_KEY;

// Token management helper functions
const getAccessToken = () => localStorage.getItem("token");
const getRefreshToken = () => localStorage.getItem("refresh");
const setAccessToken = (token) => localStorage.setItem("token", token);
const clearTokens = () => localStorage.clear();

const redirectToLogin = () => {
  clearTokens();
  window.location.href = "/login";
};

// Create a global axios instance
const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: { "Content-Type": "application/json" },
});

// Variables for refresh handling
let isRefreshing = false;
const refreshAndRetryQueue = [];

// Function to refresh the access token
const refreshAccessToken = async () => {
  try {
    const response = await axios.post(baseUrl + REFRESH, {
      refresh: getRefreshToken(),
    });
    const newAccessToken = response.data.access;
    setAccessToken(newAccessToken);
    return newAccessToken;
  } catch (err) {
    console.error("Refresh token expired. Redirecting to login.");
    redirectToLogin();
    throw err;
  }
};

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor with queue-based refresh logic

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          // Refresh the access token
          const newAccessToken = await refreshAccessToken();

          // Update the request headers with the new access token
          error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;

          // Retry all requests in the queue with the new token
          refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
            axiosInstance
              .request(config)
              .then((response) => resolve(response))
              .catch((err) => reject(err));
          });

          // Clear the queue
          refreshAndRetryQueue.length = 0;

          // Retry the original request
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // Handle token refresh error
          // You can clear all storage and redirect the user to the login page
          throw refreshError;
        } finally {
          isRefreshing = false;
        }
      }

      // Add the original request to the queue
      return new Promise((resolve, reject) => {
        refreshAndRetryQueue.push({ config: originalRequest, resolve, reject });
      });
    }

    // Return a Promise rejection if the status code is not 401
    return Promise.reject(error);
  }
);

// Main API handler function
const ApiHandle = async (
  endPoint,
  payload,
  method = "get",
  isFormData = false
) => {
  const headers = isFormData
    ? { "Content-Type": "multipart/form-data" }
    : { "Content-Type": "application/json" };

  try {
    const response = await axiosInstance({
      url: endPoint,
      method,
      data: payload,
      headers,
    });

    return {
      statusCode: response.status,
      responsePayload: response.data,
    };
  } catch (error) {
    console.error("API call error:", error);

    let errorMessage = "Something went wrong.";
    if (axios.isAxiosError(error) && error.response?.data) {
      const errorData = error.response.data;
      errorMessage = Error400_401(error.response.status, errorData);
    } else if (error instanceof Error) {
      errorMessage = Error400_401(500, error.message);
    }

    toast.error(errorMessage, { autoClose: 2000 });

    return {
      statusCode: error.response?.status || 500,
      responsePayload: error.response?.data || errorMessage,
    };
  }
};

export { ApiHandle };
