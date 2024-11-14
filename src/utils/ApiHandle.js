import axios from "axios";
import { Error400_401 } from "./Error400_401";
import { toast } from "react-toastify";
import { REFRESH } from "./constants";
const baseUrl = process.env.REACT_APP_API_KEY;

const api = axios.create({
  baseURL: process.env.REACT_APP_API_KEY,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor to add access token to headers
api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token"); // Using "token" consistently
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor to handle token refresh on 401 errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh"); // Using "refresh" consistently

        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        // Call refresh endpoint with refresh token
        const response = await axios.post(baseUrl + REFRESH, {
          refresh: refreshToken,
        });

        const { access: newAccessToken } = response.data; // Adjust if API structure differs
        localStorage.setItem("token", newAccessToken); // Save new access token as "token"

        // Retry the original request with the new access token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Clear tokens and redirect to login on refresh failure
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Unified API handler for making requests
const ApiHandle = async (
  endPoint,
  payload,
  method = "GET",
  isFormData = false
) => {
  const token = localStorage.getItem("token"); // Consistent key name

  let headers = {};
  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await api({
      method,
      url: endPoint,
      headers,
      data: payload,
    });

    return {
      statusCode: response.status,
      responsePayload: response.data,
    };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const Error = err?.response?.data || "Something went wrong.";
      const msg = Error400_401(err?.response?.status, Error);
      toast.error(msg, { autoClose: 2000 });
    } else if (err instanceof Error) {
      const msg = Error400_401(500, err.message || "Something went wrong.");
      toast.error(msg, { autoClose: 2000 });
    }

    return {
      statusCode: err?.response?.status || 500,
      responsePayload: err?.response?.data || "Something went wrong.",
    };
  }
};

export { api, ApiHandle };
