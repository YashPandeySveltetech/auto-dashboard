import axios from "axios";
import { Error400_401 } from "./Error400_401";
import { toast } from "react-toastify";
import { REFRESH } from "./constants";

const baseUrl = process.env.REACT_APP_API_KEY;

// Create an instance of axios
const apiClient = axios.create({
  baseURL: baseUrl,
});

// To prevent multiple refresh attempts
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Function to refresh the access token
const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refresh");
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  const response = await apiClient.post(REFRESH, { refresh: refreshToken });
  if (response.status === 200) {
    localStorage.setItem("token", response.data.access);
    return response.data.access;
  } else {
    throw new Error("Failed to refresh token");
  }
};

// Add a response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an expired token
    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Add request to the queue if a refresh is in progress
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await refreshAccessToken();
        processQueue(null, newToken);
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return apiClient(originalRequest); // Retry the original request with new token
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.clear(); // Clear local storage if refresh fails
        toast.error("Session expired. Please log in again.", {
          autoClose: 2000,
        });
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

const ApiHandle = async (endPoint, payload, method, isFormData) => {
  const token = localStorage.getItem("token");
  let headers = {};
  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await apiClient({
      method: method,
      url: endPoint,
      headers: headers,
      data: payload,
    });

    return {
      statusCode: response.status,
      responsePayload: response.data,
    };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err?.response?.data) {
        const Error = err?.response?.data || "Something went wrong.";
        let msg = Error400_401(err?.response?.status, Error);
        toast.error(msg, { autoClose: 2000 });
      }
    } else if (err instanceof Error) {
      let val = err?.message || "Something went wrong.";
      let msg = Error400_401(500, val);
      toast.error(msg, { autoClose: 2000 });
    }

    return {
      statusCode: err?.response?.status || 500,
      responsePayload: err?.response?.data || "Something went wrong.",
    };
  }
};

export { ApiHandle };
