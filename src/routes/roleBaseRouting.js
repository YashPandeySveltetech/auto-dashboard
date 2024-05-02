import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import RegistrationPage from "../pages/registerPage";
import LoginPage from "../pages/loginPage";
import HomePage from "../pages/homePage";
// import { getLocalStorage } from "utils/localStorageUtils";

const RoleBaseRouting = ({ role }) => {
  const token = localStorage.getItem("token");
  // const token = true;
  if (token) {
    return <HomePage />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default RoleBaseRouting;
