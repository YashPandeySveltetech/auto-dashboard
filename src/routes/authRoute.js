import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import LoginPage from "../pages/loginPage";
import DcpLoginPage from "../pages/loginPage/DcpLogin";
// import { getLocalStorage } from "utils/localStorageUtils";

const AuthRoute = () => {
  const token = localStorage.getItem("token");
  // const token = true;
  if (token) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

const PublicRoute = () => {
  const location = window?.location?.href;
  console.log()
  const dcpLogin = location.includes("3001");
  const token = localStorage.getItem("token");
  // const token = false;
  if (!token) {
    if (dcpLogin) {
      return <DcpLoginPage />;
    } else {
      return <LoginPage />;
    }
  } else {
    return <Navigate to="/" />;
  }
};

export { AuthRoute, PublicRoute };
