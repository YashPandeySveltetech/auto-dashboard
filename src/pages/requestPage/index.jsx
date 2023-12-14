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
  const initialobj = {
    request_to_provide: "",
    police_station: "",
    fir_no: "",
    case_type: "",
    io_name: "",
    io_mobile_no: "",
    target_type: "",
    form_request_for: {},
    brief_summary: "",
  };
  const [activeForm, setActiveForm] = useState({
    target_type: "",
    request_to_provide: "",
  });
  let station_id = localStorage.getItem("p_station");
  const [currentDate, setCurrentDate] = useState();
  const [currentTime, setCurrentTime] = useState();
  const [apiPayload, setApiPayload] = useState(initialobj);
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
          ["brief_summary"]: requestData?.brief_summary,
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
          requestData={requestData}
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
          requestData={requestData}
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
          requestData={requestData}
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
          requestData={requestData}
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

    if (res.statusCode === 201) {
      setActiveForm({
        target_type: "",
        request_to_provide: "",
      });
      setApiPayload(initialobj);
      return;
    }
  };
  console.log(activeForm, "activeForm");

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <div className="max-w-screen-lg mx-auto mt-5 p-3 bg-white shadow-md rounded-lg">
          <div style={{textAlign:"center"}}>
            <h1 className="text-2xl font-bold mb-20">New Request Form</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4">
              <label className="font-bold">Date:</label>
              <div className="rounded-md border border-gray-300 p-2">
                {currentDate}
              </div>
</div>

              <div className="flex items-center gap-4">
              <label className="font-bold">Time:</label>
              <div className="rounded-md border border-gray-300 p-2">
                {currentTime ?? "00:00:00"}
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex items-center gap-6">
            <label className="font-bold">Request to Provide:</label>
            <div className="flex gap-4 mt-5">
              <Radio
                value={"CDR" === activeForm.request_to_provide}
                label="CDR"
                name="request_to_provide"
                handleChange={(e) =>
                  handleChange(e, "request_to_provide", "CDR")
                }
              />
              <Radio
                value={"IPDR" === activeForm.request_to_provide}
                label="IPDR"
                name="request_to_provide"
                handleChange={(e) =>
                  handleChange(e, "request_to_provide", "IPDR")
                }
              />
              <Radio
                value={"TOWER_DUMP" === activeForm.request_to_provide}
                label="TOWER DUMP"
                name="request_to_provide"
                handleChange={(e) =>
                  handleChange(e, "request_to_provide", "TOWER_DUMP")
                }
              />
              <Radio
                value={"CAF" === activeForm.request_to_provide}
                label="CAF"
                name="request_to_provide"
                handleChange={(e) =>
                  handleChange(e, "request_to_provide", "CAF")
                }
              />
            </div>
          </div>
          
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
{/* FIR NO. */}
            <div>
              <label className="font-bold">FIR NO.:</label>
              <Input
                type="text"
                name="fir_no"
                required
                onChange={handleChange}
                value={apiPayload.fir_no}
              />
            </div>
            
            {/* Case Type */}
            <div>
              <label className="font-bold">Case Type:</label>
              <Input
                type="text"
                name="case_type"
                required
                onChange={handleChange}
                value={apiPayload.case_type}
              />
            </div>
            
            {/* IO Name */}
            <div>
              <label className="font-bold">IO Name:</label>
              <Input
                type="text"
                name="io_name"
                required
                onChange={handleChange}
                value={apiPayload.io_name}
              />
            </div>
            
            {/* IO Mobile no. */}
            <div>
              <label className="font-bold">IO Mobile no.:</label>
              <Input
                type="number"
                name="io_mobile_no"
                required
                onChange={handleChange}
                value={apiPayload.io_mobile_no}
              />
            </div>
          </div>
          
          <div className="mt-6">
            {/* Additional Form Elements */}
            {formHandler()}
          </div>

          {/* File Upload */}
          <div className="mt-6">
            <label className="font-bold">File Upload:</label>&nbsp;
            <input
              type="file"
              name="user_file"
              className="form-control mt-2"
              accept=".xlsx,.xls,.doc,.docx,.zip,.rar,.7zip,.xlsm,.xlsb,.xltx,.xltm,.xlt,.xml,.xlam,.xla,.xlw,.xlr,.csv"
                            />
                    </div>
          
          {/* Comments */}
          <div className="mt-6">
            <label className="font-bold">Comments:</label>
            <textarea
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              name="brief_summary"
              value={apiPayload?.brief_summary}
              onChange={handleChange}
            ></textarea>
          </div>
          
          {/* Submit Button */}
          <div className="mt-6">
            <button className="bg-blue-700 text-white hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none focus:ring-blue-800">
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
