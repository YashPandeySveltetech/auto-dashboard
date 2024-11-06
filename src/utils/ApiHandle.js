import axios from "axios";
import { Error400_401 } from "./Error400_401";
import { toast } from "react-toastify";
import { REFRESH } from "./constants";

function getNextFiveMinutesDate() {
  const now = new Date();
  return now.setMinutes(now.getMinutes() + 5);
}

let isReqProcessing = false;

const ApiHandle = async (endPoint, payload, method, isFormData) => {
  let token = localStorage.getItem("token");
  let refresh = localStorage.getItem("refresh");
  const expTime = localStorage.getItem("expire_time");
  const currTime = new Date();
  const baseUrl = process.env.REACT_APP_API_KEY;

  if (token && !isReqProcessing && currTime >= expTime) {
    isReqProcessing = true;
    const response = await axios.post(`${baseUrl}${REFRESH}`, { refresh });
    console.log(response);
    if (response.status === 200) {
      token = response.data.access;
      localStorage.setItem("token", token);
      localStorage.setItem("expire_time", getNextFiveMinutesDate());
      isReqProcessing = false;
    }
  }

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

        let msg = Error400_401(err?.response?.status, Error);

        toast.error(msg, { autoClose: 2000 });
      }
    } else if (err instanceof Error) {
      let val = err?.message || "Something went wrong.";

      let msg = Error400_401(500, val);
      toast.error(msg, { autoClose: 2000 });
    }

    // toast.error(err?.message, { autoClose: 2000 });

    return {
      statusCode: err?.response?.status || 500,
      responsePayload: err?.response?.data || "Something went wrong.",
    };
  }
};

export { ApiHandle };
