import axios from "axios";
import { Error400_401 } from "./Error400_401";
import { toast } from "react-toastify";
import { REFRESH } from "./constants";

let isRefreshing = false;
let refreshSubscribers = []; // Array to store pending requests while waiting for refresh

// Function to add a subscriber to be called once the refresh is complete
function onAccessTokenRefreshed(callback) {
  refreshSubscribers.push(callback);
}

const refreshToken = async () => {
  console.log("c;;;;");

  if (isRefreshing) {
    return new Promise((resolve) => {
      onAccessTokenRefreshed(resolve);
    });
  }

  isRefreshing = true;

  const baseUrl = process.env.REACT_APP_API_KEY;
  let token = localStorage.getItem("refresh");
  if (!token) return;

  try {
    const response = await axios.post(`${baseUrl}${REFRESH}`, {
      refresh: token,
    });
    if (response.status === 200) {
      token = response.data.access;
      localStorage.setItem("token", token);

      refreshSubscribers.forEach((callback) => callback());
      refreshSubscribers = [];
    }
  } catch (error) {
    const Error = error?.response?.data || "Something went wrong.";
    let msg = Error400_401(error?.response?.status, Error);

    toast.error(msg, { autoClose: 2000 });
  } finally {
    isRefreshing = false;
  }
};

const ApiHandle = async (endPoint, payload, method, isFormData) => {
  let token = localStorage.getItem("token");
  const baseUrl = process.env.REACT_APP_API_KEY;

  let headers = {};
  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await axios({
      method: method,
      url: `${baseUrl}${endPoint}`,
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

        if (err?.response?.status === 401) {
          await refreshToken();
          return ApiHandle(endPoint, payload, method, isFormData);
        } else {
          let msg = Error400_401(err?.response?.status, Error);

          toast.error(msg, { autoClose: 2000 });
        }
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

export { ApiHandle, refreshToken };
