import React from "react";
import CommonErrorHandler from "./CommonErrorHandler";


export const Error400_401 = (status, data) => {
  console.log(status, "status");
  console.log(data, "data");
  if ([400, 403, 404, 429].includes(status)) {
    
    return <CommonErrorHandler array={data} type="error" />;
  } else if (status === 401) {
    setTimeout(() => {
      localStorage.clear();
      window.location.reload();
    }, 0);
    return <span>Session Expired </span>;
  }
};
