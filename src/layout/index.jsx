import React from "react";
import Sidebar from "../components/sideBar";
import Header from "../components/header";

function Layout({ children }) {
  return (
    <div className="flex w-[100%]">
      <div className="w-[16%]">
        <Sidebar />
      </div>
      <div className="w-[84%]">
        {/* <div>
          <Header />
        </div> */}
        <div  style={{height:"100vh" ,overflow:'scroll'}} >{children}</div>
      </div>
    </div>
  );
}

export default Layout;
