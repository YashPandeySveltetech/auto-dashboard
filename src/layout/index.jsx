import React, { useState } from "react";
import Sidebar from "../components/sideBar";
import Header from "../components/header";

function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  // console.log(isOpen,"consoglgfeh");
  // function setMargin(open){
  //   console.log(open)
  //   setIsOpen(open)
  // }
  console.log(isOpen,"demo");
  // const marginLeft =;
  return (
    <div className="flex w-[100%]">
      <div className="">
        <Sidebar isOpen={isOpen}  setIsOpen={setIsOpen} />
      </div>
      <div className={ isOpen ? "ml-[5rem]" : "ml-[15rem]"}>
        {/* <div>
          <Header />
        </div> */}
        <div  style={{height:"100vh" ,overflow:'scroll'}}>{children}</div>
      </div>
    </div>
  );
}

export default Layout;
