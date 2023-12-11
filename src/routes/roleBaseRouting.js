// import React from "react";
// import { Navigate } from "react-router-dom";

// const RoleBaseRouting = ({ role, redirectPath }) => {
//   if (shouldRedirect) {
//     return <Navigate to={redirectPath} />;
//   } else if (false) {
//     return " <Spinner />";
//   } else {
//     return "<Outlet />";
//   }
// };
// export default ;

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
// import { getLocalStorage } from "utils/localStorageUtils";

const RoleBaseRouting = ({role}) => {
  // const token = getLocalStorage("token");
const token=true;
  if (token) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default RoleBaseRouting;