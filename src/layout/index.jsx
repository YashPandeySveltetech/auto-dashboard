import React, { useState } from "react";
import Sidebar from "../components/sideBar";
import Header from "../components/header";

function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <div className="flex w-[100%]">
      <div>
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}  />
      </div>
      <div  className=" h-full w-full">
        {/* <div>
          <Header />
        </div> */}
        <div  style={{height:"98vh",overflow:'scroll',background:"#e5e5e5"}} className={isOpen ? "ml-[15rem]": " ml-[5rem]"}>{children}</div>
      </div>
    </div>
  );
}

export default Layout;
