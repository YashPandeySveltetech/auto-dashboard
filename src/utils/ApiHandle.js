import axios from "axios";
import { Error400_401 } from "./Error400_401";
import { REFRESH } from "./constants";
import { toast } from "react-toastify";

const baseUrl = process.env.REACT_APP_API_KEY;

let accessToken = localStorage.getItem("token");
let refreshToken = localStorage.getItem("refresh");

const ApiHandle = async (endPoint, payload, method, isFormData) => {
  console.log(endPoint, payload, method, isFormData, "method");

  const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
  });

  // Add a request interceptor
  axiosInstance.interceptors.request.use(
    async function (config) {
      // Do something before request is sent
      config.data = payload;

      if (localStorage.getItem("token")) {
        config.headers["Authorization"] = `Bearer ${localStorage.getItem(
          "token"
        )}`;
      }
      return config;
    },
    async function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Function to refresh the access token using the refresh token
  async function refreshAccessToken() {
    try {
      const response = await axios.post(baseUrl + REFRESH, {
        refresh: localStorage.getItem("refresh"),
      });
      accessToken = response.data.access;
      localStorage.setItem("token", response.data.access);
    } catch (err) {
      console.log("Refresh Token Expired!");
      localStorage.clear();
      window.location.href = "/login";
      // navigate("/");
      // throw err;
    }
  }

  // Add a response interceptor
  axiosInstance.interceptors.response.use(
    async function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    async function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        return refreshAccessToken().then(() => {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axios(originalRequest);
        });
      }

      return Promise.reject(error);
    }
  );

  let headers = {};

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  return axiosInstance[method](endPoint, payload, { headers })
    .then((res) => {
      console.log(res, "res!@#");
      return {
        statusCode: res?.status,
        responsePayload: res?.data,
      };
    })
    .catch((err) => {
      console.log(err, "ERR");
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
    });
};

export { ApiHandle };
