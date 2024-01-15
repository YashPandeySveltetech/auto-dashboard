/** @format */

import React, { useEffect } from "react";
import { Amd, Boxes } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { USER_DETAIL } from "../../utils/constants";
import { ApiHandle } from "../../utils/ApiHandle";
import { setUserData } from "../../redux/reducers/userReducer";
import { PasswordChangeModal } from "../../redux/reducers/modalsReducer";

function Sidebar() {
  const { rank, email } = useSelector((state) => state.user?.userData);

  const list = [
    {
      icon: <Boxes />,
      text: "Dashboard",
      url: "/",
      isShow: true,
    },
    {
      icon: <Boxes />,
      text: "New Request Form",
      url: "/request-form",
      isShow: !["ACP", "DCP"].includes(rank),
    },
    {
      icon: <Boxes />,
      text: "Un-verified Form",
      url: "/unverified-form",
      isShow: !["ACP", "DCP"].includes(rank),
    },
    {
      icon: <Boxes />,
      text: "Rejected Form",
      url: "/rejected-form",
      isShow: !["ACP", "DCP"].includes(rank),
    },
    // {
    //   icon: <Boxes />,
    //   text: "Request List",
    //   url: "/request-list",
    //   isShow: true,
    // },
    {
      icon: <Boxes />,
      text: "Register",
      url: "/register",
      isShow: ["ADMIN"].includes(rank),
    },
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    handleUserDetail();
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
          <NavLink
            to={url}
            end
            className={(props) => {
              return `${
                props.isActive
                  ? "bg-blue-500 w-[100%] text-[1.1rem] p-5 text-white h-[2rem] items-center boder rounded flex cursor-pointer gap-3 "
                  : "hover:bg-blue-600 hover:text-[1.1rem] w-[100%] text-[1.2rem] p-5 text-white h-[2rem] items-center boder rounded flex cursor-pointer gap-3"
              }`;
            }}
          >
            <div className="font-bold">{icon}</div>
            <div className="font-bold " style={(String(url)=="/rejected-form")?{color:"red"}:{color:"white"}}>{text}</div>
          </NavLink>
        )}
      </>
    );
  };
  return (
    <div
      className="w-[100%] bg-blue-700 h-[100vh]"
      style={{
        background:
          "linear-gradient(-225deg, #473B7B 0%, #3584A7 51%, #30D2BE 100%)",
        height: "100vh",
      }}
    >
      <div className="p-10">
        {" "}
        <Amd className="w-[3rem] h-[3rem] text-white " />
      </div>
      <div className="flex justify-between flex-col h-[78vh] m-2">
        <div className="flex flex-col gap-2 p-3">
          <div className="hover:bg-blue-800 w-[100%] text-[1.2rem] p-5 text-white h-[2rem] items-center boder rounded flex cursor-pointer gap-3">
            <div className="font-bold text-[.8rem] ">{email}</div>
          </div>
          <hr />
          {list.map((item, key) => (
            <ListItem {...item} key={key} />
          ))}
        </div>
        <div className="flex flex-col gap-5">

      
        <button
          onClick={() => {
           dispatch(PasswordChangeModal(true))
          }}
          className="bg-cyan-900 p-2 rounded-lg font-bold"
          style={{
            color: "white",
            boxShadow: "rgba(150, 130, 0, 0.35) 0px 5px 15px",
          }}
        >
          Change Password
        </button>
        <button
          onClick={() => {
            localStorage.clear();
            navigate("/login");
            // window.location.reload();
          }}
          className="bg-red-900 p-2 rounded-lg font-bold"
          style={{
            color: "white",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
        >
          Logout
        </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
