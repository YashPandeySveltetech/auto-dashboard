/** @format */

import React, { Component, useCallback, useEffect, useState } from "react";
import DropDown from "../../components/dropdown";
import Radio from "../../components/radio";
import CDR_FORM from "./cdrform";
import CAF_FORM from "./cafForm";

import IPDR_FORM from "./ipdrForm";
import TOWER_DUMP_FORM from "./towerdumpForm";
import Input from "../../components/input";
import { FORM_REQUEST } from "../../utils/constants";
import { ApiHandle } from "../../utils/ApiHandle";

function RequestForm({ requestData }) {
  const [activeForm, setActiveForm] = useState({
    target_type: "",
    request_to_provide: "",
  });
  let station_id = localStorage.getItem("p_station");
  const [currentDate, setCurrentDate] = useState();
  const [currentTime, setCurrentTime] = useState();
  const [apiPayload, setApiPayload] = useState({});
  useEffect(() => {
    if (requestData) {
      setCurrentDate(requestData?.sys_date);
      setCurrentTime(requestData?.sys_time);
      setActiveForm((prev) => ({
        ...prev,
        ["request_to_provide"]: requestData?.request_to_provide,
        ["target_type"]: requestData?.target_type,
      }));
      setApiPayload((prev) => {
        return {
          ...prev,
          ["fir_no"]: requestData?.fir_no,
          ["case_type"]: requestData?.case_type,
          ["io_name"]: requestData?.io_name,
          ["io_mobile_no"]: requestData?.io_mobile_no,
        };
      });

      return;
    }
    setCurrentDate(new Date().toLocaleDateString("en-CA"));
    setCurrentTime(new Date().toLocaleTimeString("en-US").split(" ")[0]);
  }, []);

  console.log(apiPayload, "L");
  const formHandler = useCallback(() => {
    if (activeForm.request_to_provide === "CDR") {
      return (
        <CDR_FORM
          handleChange={handleChange}
          setApiPayload={setApiPayload}
          apiPayload={apiPayload}
          setActiveForm={setActiveForm}
          activeForm={activeForm}
        />
      );
    }
    if (activeForm.request_to_provide === "TOWER_DUMP") {
      return (
        <TOWER_DUMP_FORM
          handleChange={handleChange}
          setApiPayload={setApiPayload}
          apiPayload={apiPayload}
          setActiveForm={setActiveForm}
          activeForm={activeForm}
        />
      );
    }
    if (activeForm.request_to_provide === "IPDR") {
      return (
        <IPDR_FORM
          handleChange={handleChange}
          setApiPayload={setApiPayload}
          apiPayload={apiPayload}
          setActiveForm={setActiveForm}
          activeForm={activeForm}
        />
      );
    }
    if (activeForm.request_to_provide === "CAF") {
      return (
        <CAF_FORM
          handleChange={handleChange}
          setApiPayload={setApiPayload}
          apiPayload={apiPayload}
          setActiveForm={setActiveForm}
          activeForm={activeForm}
        />
      );
    }
  }, [activeForm]);

  const handleChange = (e, callfrom, fromval) => {
    const { name, value } = e.target;
    if (callfrom) {
      setActiveForm({ ...activeForm, [callfrom]: fromval });
      setApiPayload((prev) => {
        return { ...prev, [callfrom]: fromval };
      });
    } else {
      setApiPayload({
        ...apiPayload,
        police_station: station_id,
        sys_date: currentDate,
        sys_time: currentTime,
        [name]: value,
      });
    }
  };

  // console.log(apiPayload)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await ApiHandle(FORM_REQUEST, apiPayload, "POST");
    console.log(res, ":::");
    // if (res.statusCode === 201) {
    //   setIsOtp(true);
    //   Toaster("success", "OTP SENT Successfully!");

    //   return;
    // }
  };
  console.log(activeForm, "activeForm");

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <div className="gap-5 flex flex-col">
          <div>
            <h1 className="font-bold">NEW REQUEST FORM</h1>
          </div>
          <div>
            <div className="input-group mb-3 flex items-center justify-start mt-5 gap-3">
              <label className="form-label me-4 font-bold">Date :</label>

              <div className="w-15 me-5 rounded-3  border-1 border border-secondary py-2 px-4 items-center text-center ">
                {currentDate}
              </div>

              <label className="form-label me-5 font-bold">Time :</label>

              <div className="w-15 rounded-3 border-1 border  border-secondary  py-2 px-4 items-center text-center ">
                {currentTime ?? "00:00:00"}
              </div>
            </div>
          </div>
          <div className="radioselect">
            <label className="form-label me-4 font-bold">
              Request to provide :
            </label>
            <div className="flex gap-5">
              <Radio
                value={"CDR" == activeForm.request_to_provide}
                label="CDR"
                name="request_to_provide"
                handleChange={(e) => {
                  handleChange(e, "request_to_provide", "CDR");
                }}
              />{" "}
              <Radio
                value={"IPDR" == activeForm.request_to_provide}
                label="IPDR"
                name="request_to_provide"
                handleChange={(e) => {
                  handleChange(e, "request_to_provide", "IPDR");
                }}
              />{" "}
              <Radio
                value={"TOWER_DUMP" == activeForm.request_to_provide}
                label="TOWER DUMP"
                name="request_to_provide"
                handleChange={(e) => {
                  handleChange(e, "request_to_provide", "TOWER_DUMP");
                }}
              />{" "}
              <Radio
                value={"CAF" == activeForm.request_to_provide}
                label="CAF"
                name="request_to_provide"
                handleChange={(e) => {
                  handleChange(e, "request_to_provide", "CAF");
                }}
              />
            </div>
          </div>
          {/* Case Ref & Case Type */}
          <div className="input-group mb-3 flex items-center justify-start mt-5 gap-3">
            <label className="form-label font-bold me-4 col-md-1">
              FIR NO. :
            </label>

            <div className="w-15 me-5 col-md-3">
              <Input
                type="text"
                name="fir_no"
                required
                onChange={handleChange}
                value={apiPayload.fir_no}
              />
            </div>
            <label className="form-label me-4 font-bold"> Case Type:</label>

            <div className="w-15 me-5 col-md-3">
              <Input
                type="text"
                name="case_type"
                required
                onChange={handleChange}
                value={apiPayload.case_type}
              />
            </div>
            <label className="form-label me-4 font-bold"> IO Name:</label>

            <div className="w-15 me-5 col-md-3">
              <Input
                type="text"
                name="io_name"
                required
                onChange={handleChange}
                value={apiPayload.io_name}
              />
            </div>
            <label className="form-label me-4 font-bold"> IO Mobile no.-</label>

            <div className="w-15 me-5 col-md-3">
              <Input
                type="number"
                name="io_mobile_no"
                required
                onChange={handleChange}
                value={apiPayload.io_mobile_no}
              />
            </div>
          </div>
          <div>{formHandler()}</div>

          {/* Slect TSP */}
          <div className="input-group mb-3 flex gap-5 items-center justify-start mt-5">
            {/* <div className="col-md-3 ms-5">
            <input
              type="file"
              name="user_file"
              className="form-control"
              aria-describedby="basic-addon1"
              accept=".xlsx,.xls,.doc, .docx, .zip,.rar,.7zip,.xlsm,.xlsb,.xltx,.xltm,.xlt,.xml,.xlam, .xla,.xlw, .xlr, .csv"
                onChange={(e)=>handleChange(e,"user_file",e.target.files[0])}
            />
          </div> */}
          </div>
          <div class="w-full mb-4">
            <textarea
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              name="brief_summary"
              onChange={handleChange}
            ></textarea>
          </div>
          <div>
            <button className="text-white bg-blue-700 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
// }

export default RequestForm;
