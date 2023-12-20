/** @format */

import React, {
  Component,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import DropDown from "../../components/dropdown";
import Radio from "../../components/radio";
import CDR_FORM from "./cdrform";
import CAF_FORM from "./cafForm";

import IPDR_FORM from "./ipdrForm";
import TOWER_DUMP_FORM from "./towerdumpForm";
import Select from "react-select";
import Input from "../../components/input";
import {
  FORM_REQUEST,
  MAKE_PDF,
  REQUEST_TO_PROVIDE,
  TARGET_TYPE,
  TSP_LIST,
} from "../../utils/constants";
import { ApiHandle } from "../../utils/ApiHandle";
import Toaster from "../../utils/toaster/Toaster";
import Mobile from "./Mobile";
import Imei from "./Imei";
import { arry, firType } from "../../constants/List";
import IpAddress from "./IpAddress";

function RequestForm({ requestData }) {
  const initialobj = {
    police_station: "",
    fir_no: "",
    case_type: "",
    io_name: "",
    io_mobile_no: "",
    form_request_for: {},
    brief_summary: "",
    fir_or_complaint: "",
  };
  const [activeForm, setActiveForm] = useState({
    target_type: "",
    request_to_provide: "",
    dump_type: "",
    target_type_id:""
  });
  // mobile
  const [MobileList, setMobileList] = useState({multiple_mobile:[
    {
      date_from: "",
      date_to: "",
      time_from: "",
      time_to: "",
      mobile_number: "",
      tsp: "",
      target_type: "",
      request_to_provide: "",
    },
  ]});
  // console.log(MobileList,"MobileList")
  const [ImeiList, setImeiList] = useState([
    {
      date_from: "",
      date_to: "",
      time_from: "",
      time_to: "",
      imei: "",
      tsp: "",
      target_type: "",
      request_to_provide: "",
    },
  ]);
  const [IpList, setIpList] = useState([
    {
      ip: "",
      date_from: "",
      date_to: "",
      time_from: "",
      time_to: "",
      tsp: "",
      target_type: "",
      request_to_provide: "",
    },
  ]);

  let station_id = localStorage.getItem("p_station");

  const [currentDate, setCurrentDate] = useState();
  const [currentTime, setCurrentTime] = useState();
  const [targetType, setTargetType] = useState([]);
  const [tspList, setTspList] = useState([]);
  const [apiPayload, setApiPayload] = useState(initialobj);
  console.log(apiPayload,"payload")
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
          ["police_station"]: requestData?.police_station,
          ["fir_or_complaint"]: requestData?.fir_or_complaint,
          ["fir_no"]: requestData?.fir_no,
          ["case_type"]: requestData?.case_type,
          ["io_name"]: requestData?.io_name,
          ["io_mobile_no"]: requestData?.io_mobile_no,
          ["brief_summary"]: requestData?.brief_summary,
          ["form_request_for"]: requestData?.form_request_for,
        };
      });

      return;
    }
    setCurrentDate(new Date().toLocaleDateString("en-CA"));
    setCurrentTime(new Date().toLocaleTimeString("en-US")?.split(" ")[0]);
  }, [requestData,apiPayload]);
  useEffect(()=>{    getTspList();
    getTargetType()},[])

  const getTspList = async () => {
    const res = await ApiHandle(`${TSP_LIST}`, "", "GET");
    if (res.statusCode === 200) {
      setTspList(res?.responsePayload);
    }
  };

  const getTargetType = async () => {
    try {
      const res = await ApiHandle(`${TARGET_TYPE}`, "", "GET");
      if (res?.statusCode === 200) {
        // let target = res?.responsePayload?.filter(
        //   (item) => item?.name !== "CELL_ID"
        // );

        setTargetType(res?.responsePayload);

        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const requestprovide = useMemo(() => {
    let ac = targetType?.find((val, i) => val?.name === activeForm.target_type);
    return ac?.request_to_provide?.map((item) => {
      return { label: item.name, id: item.id, value: item.name };
    });
  }, [activeForm]);
  const tspdata = useMemo(() => {
    return tspList?.map((val) => ({
      id: val.id,
      value: val.name,
      label: val.name,
    }));
  }, [activeForm]);

  const formHandler = useCallback(() => {
    if (activeForm?.target_type === "MOBILE_NUMBER") {
      return (
        <Mobile
          requestData={requestData}
          setMobileList={setMobileList}
          MobileList={MobileList}
          activeForm={activeForm}
          tspdata={tspdata}
          requestprovide={requestprovide}
        />
      );
    }
    if (activeForm?.target_type === "IMEI_NUMBER") {
      return (
        <Imei
          requestData={requestData}
          setImeiList={setImeiList}
          ImeiList={ImeiList}
          activeForm={activeForm}
          tspdata={tspdata}
          requestprovide={requestprovide}
        />
      );
    }
    if (activeForm?.target_type === "IP_ADDRESS") {
      return (
        <IpAddress
          requestData={requestData}
          setIpList={setIpList}
          IpList={IpList}
          activeForm={activeForm}
          tspdata={tspdata}
          requestprovide={requestprovide}
        />
      );
    }
  }, [activeForm, MobileList, ImeiList,IpList]);
  useEffect(() => {
    if (activeForm.target_type === "MOBILE_NUMBER") {
      activeForm.target_type && 
        setApiPayload({
          ...apiPayload,
          form_request_for: {
            ...apiPayload?.form_request_for,
            [arry[activeForm.target_type]]: MobileList,
          },
        });
    }
    if (activeForm.target_type === "IMEI_NUMBER") {
      activeForm.target_type &&
        setApiPayload({
          ...apiPayload,
          form_request_for: {
            ...apiPayload?.form_request_for,
            [arry[activeForm.target_type]]: ImeiList,
          },
        });
    }
    if (activeForm.target_type === "IP_ADDRESS") {
      activeForm.target_type &&
        setApiPayload({
          ...apiPayload,
          form_request_for: {
            ...apiPayload?.form_request_for,
            [arry[activeForm?.target_type]]: IpList,
          },
        });
    }
  }, [ImeiList, MobileList,IpList]);

  const handleChange = (e, callfrom, fromval) => {
    const { name, value } = e.target;
    if (callfrom) {
      console.log(fromval,"from")
      setActiveForm({ ...activeForm, [callfrom]: fromval.name,target_type_id:fromval.id });
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
  const dropdownChange = (e, data) => {
    if (data?.name == "target_type") {
      setActiveForm({ ...activeForm, dump_type: e.value });
    } else {
      setApiPayload({
        ...apiPayload,
        [data?.name]: e?.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await ApiHandle(FORM_REQUEST, apiPayload, "POST");

    if (res.statusCode === 201) {
      getFormPdf(res?.responsePayload?.id);
      setActiveForm({
        target_type: "",
        request_to_provide: "",
        target_type_id:""
      });
      setApiPayload(initialobj);
      Toaster("success", "SuccessFully Submitted Form");
      return;
    }
  };

  const getFormPdf = async (id) => {
    const res = await ApiHandle(`${MAKE_PDF}?form_id=${id}`, "", "GET");
  };

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <div
          className="mx-auto mt-5 p-3 bg-white shadow-md rounded-lg"
          style={{ width: "96%" }}
        >
          <div style={{ textAlign: "center" }}>
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

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* FIR NO. */}
            <div className="">
              <label className="font-bold">Choose Type:</label>
              <div className="flex  gap-2">
                <Select
                  name="fir_or_complaint"
                  options={firType}
                  value={firType?.filter(
                    (obj) => apiPayload?.fir_or_complaint === obj?.value
                  )}
                  className="basic-multi-select w-[30%]"
                  classNamePrefix="select"
                  onChange={(e, data) => dropdownChange(e, data)}
                  isSearchable={false}
                />
                <Input
                  type="text"
                  name="fir_no"
                  required
                  onChange={handleChange}
                  value={apiPayload.fir_no}
                  disabledSelect={requestData}
                />
              </div>
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
                disabledSelect={requestData}
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
                disabledSelect={requestData}
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
                disabledSelect={requestData}
              />
            </div>
          </div>
          <div className="mt-6 flex items-center gap-6">
            <label className="font-bold">Target Type:</label>

            {/* sdfghjk */}
            <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
              <ul className="flex flex-wrap -mb-px">
                {targetType?.map((val, key) => (
                  <li className="me-2">
                    <button
                      onClick={(e) => handleChange(e, "target_type", val)}
                      key={key}
                      type="button"
                      className={
                        activeForm?.target_type === val?.name
                          ? "inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg "
                          : "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300"
                      }
                      id={key}
                    >
                      {val?.name}{" "}
                      <span className="text-cyan-400">
                        (
                        {apiPayload?.form_request_for[arry[val?.name]]?.length >
                        0
                          ? apiPayload?.form_request_for[arry[val?.name]]
                              ?.length
                          : 0}
                        )
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-6">
            {/* Additional Form Elements */}
            {formHandler()}
          </div>

          {/* Comments */}
          <div className="mt-6">
            <label className="font-bold">Comments:</label>
            <textarea
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              name="brief_summary"
              value={apiPayload?.brief_summary}
              onChange={handleChange}
              disabled={requestData}
            ></textarea>
          </div>

          {/* Submit Button */}
          {!requestData && (
            <div className="mt-6">
              <button className="bg-blue-700 text-white hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none focus:ring-blue-800">
                Submit
              </button>
            </div>
          )}
        </div>
      </form>
    </>
  );
}
// }

export default RequestForm;
