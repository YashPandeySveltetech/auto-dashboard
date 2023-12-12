

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import RegistrationPage from "../pages/registerPage";
// import { getLocalStorage } from "utils/localStorageUtils";

const RoleBaseRouting = ({ role }) => {
  // const token = getLocalStorage("token");
  const token = true;
  if (token) {
    return <RegistrationPage />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default RoleBaseRouting;
