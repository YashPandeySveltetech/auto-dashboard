// import { getCookie } from "cookies-next";
import { Error400_401 } from "./Error400_401";
import { toast } from "react-toastify";
let status;
const ApiHandle = (endPoint, payload, method, handleLoader, isFormData) => {
  const token = localStorage.getItem("token");
  const myHeaders = new Headers();
  if (!isFormData) {
    myHeaders.append("Content-Type", "application/json");
  }
  if (token) {
    myHeaders.append("Authorization", `Bearer ${token}`);
  }
  let fetchData = {
    method,
    headers: myHeaders,
  };
  if (method !== "GET") {
    fetchData = {
      ...fetchData,
      body: isFormData ? payload : JSON.stringify(payload),
    };
  }
  return fetch(process.env.REACT_APP_API_KEY + endPoint, fetchData)
    .then((response) => {
      status = response.status;
      if (response.ok) {
        handleLoader && handleLoader();
        return response.json();
      }
      return Promise.reject(response);
    })
    .then((jsonResponse) => {
      return {
        statusCode: status,
        responsePayload: jsonResponse,
      };
    })
    .catch((error) => {
      handleLoader && handleLoader();
      error?.json()?.then((json) => {
         let message=
              Error400_401(error?.status, json) ||
              "Something went wrong."
             return toast.error(message, {autoClose: 2000});
        // return Toaster("error", message);
      });
      return {
        statusCode: error?.response?.status,
        responsePayload: error?.response?.data,
      };
    });
};

export { ApiHandle };
