/** @format */

import React, { useEffect, useState } from "react";
import {
  Amd,
  Boxes,
  XOctagon,
  PersonAdd,
  EnvelopeAt,
  PersonGear,
} from "react-bootstrap-icons";
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
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import StarsIcon from "@mui/icons-material/Stars";
import Toaster from "../../utils/toaster/Toaster";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";

function Sidebar({ isOpen, setIsOpen }) {
  const { rank, email, username } = useSelector(
    (state) => state.user?.userData
  );
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
      isShow: !["DCP", "ADMIN"].includes(rank),
    },
    {
      icon: <GoUnverified />,
      text: "Un-verified Form",
      url: "/unverified-form",
      isShow: !["DCP", "ADMIN"].includes(rank),
    },
    {
      icon: <XOctagon />,
      text: "Rejected Form",
      url: "/rejected-form",
      isShow: !["DCP", "ADMIN"].includes(rank),
    },
    // {
    //   icon: <Boxes />,
    //   text: "Request List",
    //   url: "/request-list",
    //   isShow: true,
    // },
    {
      icon: <PersonAdd />,
      text: "Add New User",
      url: "/register",
      isShow: ["ADMIN"].includes(rank),
    },
    {
      icon: <PersonGear />,
      text: "Update User",
      url: "/update",
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
    refreshApi();
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
                <i className="bx bx-grid-alt " title={text}>
                  {icon}
                </i>
                <span className="links_name">{text}</span>
              </NavLink>
              {/* <span className="tooltip text-black">{text}</span> */}
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
              </div>
            </>
          )}
          {/* <div className="logo_name">Auto</div> */}

          <i className="bx bx-menu" id="btn" onClick={() => setIsOpen(!isOpen)}>
            <GiHamburgerMenu />
          </i>
        </div>

        <div className="user_profile">
          {isOpen ? (
            <div className="profile_card_open">
              <div className="border border-gray-200 rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-2 text-center">
                  User Profile
                </h2>
                <div className="mb-2 ml-0 flex justify-start items-center">
                  <label className="block font-medium text-gray-100">
                    <DriveFileRenameOutlineIcon sx={{ fontSize: 20 }} /> :
                  </label>
                  <p className="text-gray-200  ml-1">{username}</p>
                </div>
                <div className="mb-2 flex justify-start items-start">
                  <label className="flex items-start items-center mt-[0px] text-gray-200">
                    <EnvelopeAt sx={{ fontSize: 20 }} /> &nbsp;:
                  </label>
                  <p
                    className="text-gray-200 font-medium ml-1"
                    style={{ wordBreak: "break-all" }}
                  >
                    {email}
                  </p>
                </div>
                <div className="mb-2 flex justify-start items-center">
                  <label className="block text-gray-200">
                    <StarsIcon sx={{ fontSize: 20 }} /> :{" "}
                  </label>
                  <p className="text-gray-200 font-medium ml-1">{rank}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="close_side_user " title="User Profile">
              <PermIdentityIcon sx={{ fontSize: 35 }} />
            </div>
          )}
        </div>

        {/* <ul className="nav-list"> */}

        {/* <li> */}
        <div className="mt-10 flex flex-col justify-between h-[60vh] ">
          <ul>
            {list.map((item, key) => (
              <ListItem {...item} key={key} />
            ))}
          </ul>

          <div className={`${isOpen ? "mt-9" : "mt-40"}`}>
            <li>
              <NavLink
                onClick={() => {
                  dispatch(PasswordChangeModal(true));
                }}
              >
                <i className="bx bx-grid-alt" title="change Password">
                  <RiLockPasswordLine />
                </i>
                <span className="links_name">Change Password</span>
              </NavLink>
            </li>

            <li
              className="mt-[160px]"
              onClick={() => {
                localStorage.clear();
                dispatch(clearUserData());
                dispatch(commonCloseModal());
                navigate("/login");
              }}
            >
              <NavLink>
                <i className="bx bx-grid-alt" title="Logout">
                  <RiLogoutBoxLine />
                </i>
                <span className="links_name">Logout</span>
              </NavLink>
            </li>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
