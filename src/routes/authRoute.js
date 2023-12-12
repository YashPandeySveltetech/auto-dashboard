import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import LoginPage from "../pages/loginPage";
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
  const token = localStorage.getItem("token");
  // const token = false;
  if (!token) {
    return <LoginPage />;
  } else {
    return <Navigate to="/" />;
  }
};

export { AuthRoute, PublicRoute };
