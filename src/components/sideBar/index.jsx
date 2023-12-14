/** @format */

import React, { useEffect } from "react";
import { Amd, Boxes } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { USER_DETAIL } from "../../utils/constants";
import { ApiHandle } from "../../utils/ApiHandle";
import { setUserData } from "../../redux/reducers/userReducer";

function Sidebar() {
  const { rank } = useSelector((state) => state.user?.userData);
  console.log(!["ACP", "DCP"].includes(rank), rank, "rank");
  const list = [
    {
      icon: <Boxes />,
      text: "Dashboard",
      url: "/",
      isShow: true,
    },
    {
      icon: <Boxes />,
      text: "Request Form",
      url: "/request-form",
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
    console.log(res, ".1");
    if (res.statusCode === 200) {
      console.log(res?.responsePayload, "res?.responsePayload");
      dispatch(setUserData(res?.responsePayload));
    }
  };
  const ListItem = ({ icon, text, url, isShow }) => {
    console.log(isShow, "text", text);
    return (
      <>
        {" "}
        {isShow && (
          <div
            onClick={() => {
              navigate(url);
            }}
            className="hover:bg-blue-800 w-[100%] text-[1.2rem] p-5 text-white h-[2rem] items-center boder rounded flex cursor-pointer gap-3"
          >
            <div className="font-bold">{icon}</div>
            <div className="font-bold ">{text}</div>
          </div>
        )}
      </>
    );
  };
  return (
    <div className="w-[100%] bg-blue-700 h-[100vh]" style={{
        background:
          "linear-gradient(-225deg, #473B7B 0%, #3584A7 51%, #30D2BE 100%)",
        height: "100vh",
      }}>
      <div className="p-10">
        {" "}
        <Amd className="w-[3rem] h-[3rem] text-white " />
      </div>
      <div className="flex flex-col gap-2 p-3">
        {list.map((item) => (
          <>
            <ListItem {...item} />
          </>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
