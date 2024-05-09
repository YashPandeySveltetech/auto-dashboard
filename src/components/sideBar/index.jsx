/** @format */

import React, { useEffect, useState } from "react";
import { Amd, Boxes } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { REFRESH, USER_DETAIL } from "../../utils/constants";
import { ApiHandle } from "../../utils/ApiHandle";
import { clearUserData, setUserData } from "../../redux/reducers/userReducer";
import {
  PasswordChangeModal,
  commonCloseModal,
} from "../../redux/reducers/modalsReducer";
import sidebar from "./sidebar.css";
import { GoUnverified } from "react-icons/go";
import { MdDashboard } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiLogoutBoxLine, RiLockPasswordLine } from "react-icons/ri";
import Toaster from "../../utils/toaster/Toaster";

function Sidebar({ isOpen, setIsOpen }) {
  const { rank, email } = useSelector((state) => state.user?.userData);
  const refresh = localStorage.getItem("refresh")
    ? localStorage.getItem("refresh")
    : null;
  // console.log(typeof token)
  const list = [
    {
      icon: <MdDashboard />,
      text: "Dashboard",
      url: "/",
      isShow: true,
    },
    {
      icon: <Boxes />,
      text: "New Request Form",
      url: "/request-form",
      isShow: !["DCP"].includes(rank),
    },
    {
      icon: <GoUnverified />,
      text: "Un-verified Form",
      url: "/unverified-form",
      isShow: !["DCP"].includes(rank),
    },
    {
      icon: <Boxes />,
      text: "Rejected Form",
      url: "/rejected-form",
      isShow: !["DCP"].includes(rank),
    },
    // {
    //   icon: <Boxes />,
    //   text: "Request List",
    //   url: "/request-list",
    //   isShow: true,
    // },
    {
      icon: <Boxes />,
      text: "Add New User",
      url: "/register",
      isShow: ["ADMIN"].includes(rank),
    },
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refreshApi = async () => {
    const res = await ApiHandle(
      REFRESH,
      {
        refresh: refresh,
      },
      "POST"
    );
    if (res.statusCode === 200) {
      localStorage.setItem("token", res?.responsePayload.access);
    } 
  };
  useEffect(() => {
    let fourMinutes = Number(1000 * 60 * 4 + 50000);
    let interval = setInterval(() => {
      refreshApi();
    }, fourMinutes);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    handleUserDetail();
    refreshApi()
  }, []);

  const handleUserDetail = async () => {
    const res = await ApiHandle(USER_DETAIL, {}, "GET");

    if (res.statusCode === 200) {
      dispatch(setUserData(res?.responsePayload));
    }
  };
  const ListItem = ({ icon, text, url, isShow }) => {
    return (
      <>
        {isShow && (
          // <NavLink
          //   to={url}
          //   end
          //   className={(props) => {
          //     return `${
          //       props.isActive
          //         ? "bg-blue-500 w-[100%] text-[1.1rem] p-5 text-white h-[2rem] items-center boder rounded flex cursor-pointer gap-3 "
          //         : "hover:bg-blue-600 hover:text-[1.1rem] w-[100%] text-[1.2rem] p-5 text-white h-[2rem] items-center boder rounded flex cursor-pointer gap-3"
          //     }`;
          //   }}
          // >
          //   <div className="font-bold">{icon}</div>
          //   <div className="font-bold " style={(String(url)=="/rejected-form")?{color:"red"}:{color:"white"}}>{text}</div>
          // </NavLink>
          <>
            <li>
              <NavLink to={url}>
                <i className="bx bx-grid-alt">{icon}</i>
                <span className="links_name">{text}</span>
              </NavLink>
              <span className="tooltip">{text}</span>
            </li>
          </>
        )}
      </>
    );
  };
  return (
    // <div
    //   className="w-[100%] bg-blue-700 h-[100vh]"
    //   style={{
    //     background:
    //       "linear-gradient(-225deg, #473B7B 0%, #3584A7 51%, #30D2BE 100%)",
    //     height: "100vh",
    //   }}
    // >
    //   <div className="p-10">
    //     {" "}
    //     <Amd className="w-[3rem] h-[3rem] text-white " />
    //   </div>
    //   <div className="flex justify-between flex-col h-[78vh] m-2">
    //     <div className="flex flex-col gap-2 p-3">
    //       <div className="hover:bg-blue-800 w-[100%] text-[1.2rem] p-5 text-white h-[2rem] items-center boder rounded flex cursor-pointer gap-3">
    //         <div className="font-bold text-[.8rem] ">{email}</div>
    //       </div>
    //       <hr />
    //       {list.map((item, key) => (
    //         <ListItem {...item} key={key} />
    //       ))}
    //     </div>
    //     <div className="flex flex-col gap-5">

    //     <button
    //       onClick={() => {
    //        dispatch(PasswordChangeModal(true))
    //       }}
    //       className="bg-cyan-900 p-2 rounded-lg font-bold"
    //       style={{
    //         color: "white",
    //         boxShadow: "rgba(150, 130, 0, 0.35) 0px 5px 15px",
    //       }}
    //     >
    //       Change Password
    //     </button>
    //     <button
    //       onClick={() => {
    //         localStorage.clear();
    //         dispatch(clearUserData())
    //         navigate("/login");
    //         // window.location.reload();
    //       }}
    //       className="bg-red-900 p-2 rounded-lg font-bold"
    //       style={{
    //         color: "white",
    //         boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    //       }}
    //     >
    //       Logout
    //     </button>
    //     </div>
    //   </div>
    // </div>
    <>
      <div className={`sidebar ${isOpen ? "open" : ""} text-white`}>
        <div className="logo-details">
          {isOpen && (
            <>
              <div>
                <i className="bx bxl-codepen icon">
                  <Amd className="w-[3rem] h-[3rem] text-white " />
                </i>
                <div className="w-[2rem]">{email}</div>
              </div>
            </>
          )}
          {/* <div className="logo_name">Auto</div> */}

          <i className="bx bx-menu" id="btn" onClick={() => setIsOpen(!isOpen)}>
            <GiHamburgerMenu />
          </i>
        </div>
        {/* <ul className="nav-list"> */}

        {/* <li> */}
        <div className="mt-10 flex flex-col justify-between h-[80vh] overflow-scroll">
          <ul>
            {list.map((item, key) => (
              <ListItem {...item} key={key} />
            ))}
          </ul>

          <div>
            <li
              onClick={() => {
                localStorage.clear();
                dispatch(clearUserData());
                dispatch(commonCloseModal());
                navigate("/login");
              }}
            >
              <NavLink>
                <i className="bx bx-grid-alt">
                  <RiLogoutBoxLine />
                </i>
                <span className="links_name">Logout</span>
              </NavLink>
              <span className="tooltip">Logout</span>
            </li>

            <li>
              <NavLink
                onClick={() => {
                  dispatch(PasswordChangeModal(true));
                }}
              >
                <i className="bx bx-grid-alt">
                  <RiLockPasswordLine />
                </i>
                <span className="links_name">Change Password</span>
              </NavLink>
              <span className="tooltip">Change Password</span>
            </li>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
