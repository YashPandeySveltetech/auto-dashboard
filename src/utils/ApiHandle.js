// import { getCookie } from "cookies-next";
import Toaster from "./toaster/Toaster";
let status;
const ApiHandle = (endPoint, payload, method, handleLoader, isFormData) => {
  const token = localStorage.getItem("token");
  const myHeaders = new Headers();
  console.log(endPoint, "endPoint");
  console.log(token,process.env.REACT_APP_API_KEY, "token");
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
        return Toaster("error", json.message);
      });
      return {
        statusCode: error?.response?.status,
        responsePayload: error?.response?.data,
      };
    });
};

export { ApiHandle };
