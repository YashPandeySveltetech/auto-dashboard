import React, { useEffect, useState } from "react";
import Card from "../card/index";
import { useDispatch, useSelector } from "react-redux";
import { commonCloseModal } from "../../redux/reducers/modalsReducer";

const ModalWrapper = ({
  children,
  heading,
  btnName,
  bodyHeight,
  handleClick,
  handleClickBackBtn,
  isDisabled,
  isBackBtn,
  width = "w-[35rem]",
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      handleOnClose();
    };

    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  const handleOnClose = () => {
    dispatch(commonCloseModal());
  };

  return (
    <>
      <div className="fixed inset-0 bg-[black] z-10 bg-opacity-80 backdrop-blur-sm flex justify-center items-center">
        <Card width={width} height="content">
          <div className="  flex justify-between p-2 border-b-2 items-centers">
            <h3 className="text-xl text-[white] font-semibold">{heading}</h3>
            <button
              className="p-1 ml-auto border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={handleOnClose}
            >
              <span className=" text-[white] h-6 w-6 text-[3.5vh] block outline-none focus:outline-none  hover:text-[#FFE70B]">
                ×
              </span>
            </button>
          </div>
          <div
            className={`flex flex-col w-full gap-10 mt-2 mb-4 overflow-auto h-[${bodyHeight}] `}
          >
            {children}
          </div>
          <div className="flex items-center justify-end p-2 border-t border-solid border-slate-200 rounded-b">
            {isBackBtn && (
              <button
                className="text-white background-transparent  uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleClickBackBtn}
              >
                Back
              </button>
            )}
            <button
              className={`${
                isDisabled
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#FFE70B] cursor-pointer	"
              } text-black
             active:${
               isDisabled ? "bg-gray-300" : "bg-emerald-600"
             }   uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
              type="button"
              onClick={handleClick || handleOnClose}
              disabled={isDisabled}
            >
              {btnName || "Save Changes"}
            </button>
          </div>
        </Card>
      </div>
      {/* <button>Open Modal</button>
      {showModal && children} */}
    </>
  );
};

export default ModalWrapper;
