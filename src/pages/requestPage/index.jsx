/** @format */

import React, { useCallback, useEffect, useMemo, useState } from "react";

import Select from "react-select";
import Input from "../../components/input";
import {
  CASE_TYPE,
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
import CellId from "./CellId";

import { useDispatch } from "react-redux";
import { otpValidationModal } from "../../redux/reducers/modalsReducer";

import { useLocation, useParams, useNavigate } from "react-router";
import Ild from "./Ild";

function RequestForm({ requestData }) {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  var isEditable = pathname.includes("edit");
  let { id } = useParams();

  const initialobj = {
    police_station: "",
    fir_no: "",
    case_type: "",
    io_name: "",
    io_mobile_no: "",
    // io_email: "",
    form_request_for: {},
    brief_summary: "",
    fir_or_complaint: "",
    urgent: false,
  };
  const [activeForm, setActiveForm] = useState({
    target_type: "",
    request_to_provide: [],
    dump_type: "",
    target_type_id: "",
  });
  // mobile
  const [MobileList, setMobileList] = useState([
    {
      date_from: "",
      date_to: null,
      time_from: "00:00",
      time_to: "00:00",
      till_date: false,
      mobile_number: "",
      tsp: [],
      target_type: "",
      request_to_provide: [],
    },
  ]);
  const [ImeiList, setImeiList] = useState([
    {
      date_from: "",
      date_to: null,
      time_from: "00:00",
      time_to: "00:00",
      till_date: false,
      imei: "",
      tsp: [],
      target_type: "",
      request_to_provide: [],
    },
  ]);
  const [IpList, setIpList] = useState([
    {
      ip: "",
      date_from: "",
      date_to: null,
      time_from: "00:00",
      time_to: "00:00",
      till_date: false,
      tsp: [],
      target_type: "",
      request_to_provide: [],
    },
  ]);
  const [cellIdList, setCellIdList] = useState([
    {
      date_from: "",
      date_to: null,
      time_from: "00:00",
      time_to: "00:00",
      till_date: false,
      cell_id: "",
      tsp: [],
      target_type: "",
      request_to_provide: [],
    },
  ]);
  const [IldList, setIldList] = useState([
    {
      date_from: "",
      date_to: null,
      time_from: "00:00",
      time_to: "00:00",
      till_date: false,
      mobile_number: "",
      tsp: [],
      target_type: "",
      request_to_provide: [],
    },
  ]);
  let station_id = localStorage.getItem("p_station");
  const [firOtherOption, setFirOtherOption] = useState("");
  const [currentDate, setCurrentDate] = useState();
  const [currentTime, setCurrentTime] = useState();
  const [targetType, setTargetType] = useState([]);
  const [caseType, setCaseType] = useState([]);
  const [tspList, setTspList] = useState([]);
  const [apiPayload, setApiPayload] = useState(initialobj);

  useEffect(() => {
    if (requestData) {
      setCurrentDate(requestData?.sys_date);
      setCurrentTime(requestData?.sys_time);
      setActiveForm((prev) => ({
        ...prev,
        ["target_type"]: "",
      }));

      setApiPayload((prev) => {
        return {
          ...prev,
          ["fir_or_complaint"]: requestData?.fir_or_complaint,
          ["fir_no"]: requestData?.fir_no,
          ["case_type"]: requestData?.case_type,
          ["io_name"]: requestData?.io_name,
          ["io_mobile_no"]: requestData?.io_mobile_no,
          // ["io_email"]: requestData?.io_email,
          ["brief_summary"]: requestData?.brief_summary,
          ["form_request_for"]: requestData?.form_request_for,
        };
      });
      setMobileList(requestData?.form_request_for?.multiple_mobile);
      setImeiList(requestData?.form_request_for?.imei_number);
      setCellIdList(requestData?.form_request_for?.cell_id);
      setIpList(requestData?.form_request_for?.ip_port);
      setIldList(requestData?.form_request_for?.ild);

      return;
    }
  }, [requestData]);
  useEffect(() => {
    if (!requestData) {
      setCurrentDate(new Date().toLocaleDateString("en-CA"));
      setCurrentTime(new Date().toLocaleTimeString("en-US")?.split(" ")[0]);
    }
  }, [apiPayload]);
  useEffect(() => {
    getTspList();
    getTargetType();
    getCaseType();
  }, []);

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
        let x = res?.responsePayload;
        var y = [...x].reverse();
        setTargetType(y);

        return;
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getCaseType = async () => {
    try {
      const res = await ApiHandle(`${CASE_TYPE}`, "", "GET");
      if (res?.statusCode === 200) {
        let data = res?.responsePayload?.map((val) => ({
          id: val.id,
          value: val.name,
          label: val.name,
        }));

        setCaseType(data);

        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const requestprovide = useMemo(() => {
    let ac = targetType?.find((val, i) => val?.name === activeForm.target_type);
    return ac?.request_to_provide?.map((item, i) => {
      return { label: item.name, id: item.id, value: item.name };
    });
  }, [activeForm]);

  const tspdata = useMemo(() => {
    if (
      apiPayload?.form_request_for[arry[activeForm?.target_type]] &&
      apiPayload?.form_request_for[arry[activeForm?.target_type]][0]?.tsp
        ?.length === 0
    ) {
      return tspList?.map((val, index) => ({
        id: val.id,
        value: val.name,
        label: val.name,
        disabled: false,
      }));
    } else {
      return tspList?.map((val, index) => ({
        id: val.id,
        value: val.name,
        label: val.name,
        disabled:
          apiPayload?.form_request_for[arry[activeForm?.target_type]] &&
          ((apiPayload.form_request_for[
            arry[activeForm.target_type]
          ][0]?.tsp?.includes(2) &&
            val.id !== 2) ||
            (!apiPayload.form_request_for[
              arry[activeForm.target_type]
            ][0]?.tsp?.includes(2) &&
              val.id === 2)),
      }));
    }
  }, [
    activeForm,
    MobileList,
    apiPayload?.form_request_for,
    ImeiList,
    IpList,
    cellIdList,
    IldList
  ]);

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
          isEditable={isEditable}
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
          isEditable={isEditable}
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
          isEditable={isEditable}
        />
      );
    }
    if (activeForm?.target_type === "CELL_ID") {
      return (
        <CellId
          requestData={requestData}
          setCellIdList={setCellIdList}
          cellIdList={cellIdList}
          activeForm={activeForm}
          tspdata={tspdata}
          requestprovide={requestprovide}
          isEditable={isEditable}
        />
      );
    }
    if (activeForm?.target_type === "ILD") {
      return (
        <Ild
          requestData={requestData}
          setIldList={setIldList}
          IldList={IldList}
          activeForm={activeForm}
          tspdata={tspdata}
          requestprovide={requestprovide}
          isEditable={isEditable}
        />
      );
    }
  }, [
    activeForm,
    MobileList,
    ImeiList,
    IpList,
    cellIdList,
    requestData,
    IldList,
    apiPayload.form_request_for,
    tspdata,
  ]);
  useEffect(() => {
    if (activeForm.target_type === "MOBILE_NUMBER") {
      setApiPayload({
        ...apiPayload,
        form_request_for: {
          [arry[activeForm.target_type]]: MobileList,
        },
      });
      // let isok = MobileList.map((obj) => {
      //   const newObj = { ...obj };
      //   delete newObj.target_type;
      //   for (let key in newObj) {
      //     if (newObj.hasOwnProperty(key)) {
      //       if (newObj[key] === "" || newObj[key] === undefined) {
      //         return false;
      //       }
      //     }
      //   }
      //   return true;
      // });

      // if (isok[0]) {
      //   setApiPayload({
      //     ...apiPayload,
      //     form_request_for: {
      //       ...apiPayload?.form_request_for,
      //       [arry[activeForm.target_type]]: MobileList,
      //     },
      //   });
      // } else {
      //   delete apiPayload.form_request_for[arry[activeForm?.target_type]];
      // }
    }
    if (activeForm.target_type === "IMEI_NUMBER") {
      setApiPayload({
        ...apiPayload,
        form_request_for: {
          [arry[activeForm.target_type]]: ImeiList,
        },
      });
      // let isok = ImeiList.map((obj) => {
      //   const newObj = { ...obj };
      //   delete newObj.target_type;
      //   for (let key in newObj) {
      //     if (newObj.hasOwnProperty(key)) {
      //       if (newObj[key] === "" || newObj[key] === undefined) {
      //         return false;
      //       }
      //     }
      //   }
      //   return true;
      // });

      // if (isok[0]) {
      //   setApiPayload({
      //     ...apiPayload,
      //     form_request_for: {
      //       ...apiPayload?.form_request_for,
      //       [arry[activeForm.target_type]]: ImeiList,
      //     },
      //   });
      // } else {
      //   delete apiPayload.form_request_for[arry[activeForm?.target_type]];
      // }
    }
    if (activeForm.target_type === "IP_ADDRESS") {
      setApiPayload({
        ...apiPayload,
        form_request_for: {
          [arry[activeForm?.target_type]]: IpList,
        },
      });
      // let isok = IpList.map((obj) => {
      //   const newObj = { ...obj };
      //   delete newObj.target_type;
      //   for (let key in newObj) {
      //     if (newObj.hasOwnProperty(key)) {
      //       if (newObj[key] === "" || newObj[key] === undefined) {
      //         return false;
      //       }
      //     }
      //   }
      //   return true;
      // });

      // if (isok[0]) {
      //   setApiPayload({
      //     ...apiPayload,
      //     form_request_for: {
      //       ...apiPayload?.form_request_for,
      //       [arry[activeForm?.target_type]]: IpList,
      //     },
      //   });
      // } else {
      //   delete apiPayload.form_request_for[arry[activeForm?.target_type]];
      // }
    }
    if (activeForm.target_type === "CELL_ID") {
      setApiPayload({
        ...apiPayload,
        form_request_for: {
          [arry[activeForm?.target_type]]: cellIdList,
        },
      });
      // let isok = cellIdList.map((obj) => {
      //   const newObj = { ...obj };
      //   delete newObj.target_type;
      //   for (let key in newObj) {
      //     if (newObj.hasOwnProperty(key)) {
      //       if (newObj[key] === "" || newObj[key] === undefined) {
      //         return false;
      //       }
      //     }
      //   }
      //   return true;
      // });

      // if (isok[0]) {
      //   setApiPayload({
      //     ...apiPayload,
      //     form_request_for: {
      //       ...apiPayload?.form_request_for,
      //       [arry[activeForm?.target_type]]: cellIdList,
      //     },
      //   });
      // } else {
      //   delete apiPayload.form_request_for[arry[activeForm?.target_type]];
      // }
    }
    if (activeForm.target_type === "ILD") {
      setApiPayload({
        ...apiPayload,
        form_request_for: {
          [arry[activeForm?.target_type]]: IldList,
        },
      });
      // let isok = cellIdList.map((obj) => {
      //   const newObj = { ...obj };
      //   delete newObj.target_type;
      //   for (let key in newObj) {
      //     if (newObj.hasOwnProperty(key)) {
      //       if (newObj[key] === "" || newObj[key] === undefined) {
      //         return false;
      //       }
      //     }
      //   }
      //   return true;
      // });

      // if (isok[0]) {
      //   setApiPayload({
      //     ...apiPayload,
      //     form_request_for: {
      //       ...apiPayload?.form_request_for,
      //       [arry[activeForm?.target_type]]: cellIdList,
      //     },
      //   });
      // } else {
      //   delete apiPayload.form_request_for[arry[activeForm?.target_type]];
      // }
    }
  }, [ImeiList, MobileList, IpList, cellIdList, IldList, requestData]);
  const handleChange = (e, callfrom, fromval) => {
    const { name, value, files, checked } = e.target;
    if (callfrom === "urgent") {
      setApiPayload({
        ...apiPayload,
        [name]: checked,
      });
    }
    if (callfrom === "files") {
      setApiPayload({
        ...apiPayload,
        [name]: files[0],
      });
    }
    if (callfrom) {
      setActiveForm({
        ...activeForm,
        [callfrom]: fromval.name,
        target_type_id: fromval.id,
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
  const [isother, setIsOther] = useState(false);
  const dropdownChange = (e, data) => {
    if (data?.name == "target_type") {
      setActiveForm({ ...activeForm, dump_type: e.value });
    }
   else if (data.name === "case_type") {
      console.log(e,">>>")
      setApiPayload({
        ...apiPayload,
        [data?.name]: e?.id,
      });
    }
   else if (data.name === "fir_or_complaint") {
      if (e.value === "other") {
        setIsOther(true);
        setApiPayload({
          ...apiPayload,
          [data?.name]: "",
        });
      } else {
        setIsOther(false);
        setApiPayload({
          ...apiPayload,
          [data?.name]: e?.value,
        });
      }
    } 
    else {
      setApiPayload({
        ...apiPayload,
        [data?.name]: e?.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();

    if (apiPayload?.file) {
      for (let key in apiPayload) {
        if (key === "form_request_for") {
          formData.append(key, JSON.stringify(apiPayload[key]));
        } else {
          formData.append(key, apiPayload[key]);
        }
      }
    }

    let url = isEditable ? `${FORM_REQUEST}${id}/` : FORM_REQUEST;
    const res = await ApiHandle(
      url,
      apiPayload.file ? formData : apiPayload,
      isEditable ? "PUT" : "POST",
      "",
      apiPayload.file ? true : false
    );

    if (res.statusCode === 201) {
      // getFormPdf(res?.responsePayload?.id);
      setActiveForm({
        target_type: "",
        request_to_provide: [],
        target_type_id: "",
      });
      setApiPayload(initialobj);
      dispatch(otpValidationModal({ id: res?.responsePayload?.id }));
      Toaster("success", "SuccessFully Submitted Form");
      return;
    }
    if (res.statusCode === 200) {
      dispatch(otpValidationModal({ id: res?.responsePayload?.id }));
      Toaster("success", "SuccessFully Updated Form");
    }
  };

  const getFormPdf = async (id) => {
    const res = await ApiHandle(`${MAKE_PDF}?form_id=${id}`, "", "GET");
  };
  function check() {
    var mobile = document.getElementById("mobile");

    var message = document.getElementById("message");

    var goodColor = "#0C6";
    var badColor = "#FF9B37";

    if (mobile.value.length != 10) {
      message.style.color = badColor;
      message.innerHTML = "required 10 digits mobile number";
    } else {
      message.style.color = goodColor;
      message.innerHTML = "";
    }
  }
  console.log(apiPayload, "api");

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

          <div className="mt-6 grid grid-cols-3 md:grid-cols-3 gap-6">
            {/* FIR NO. */}
            <div className="">
              <label className="font-bold required">Choose Type:</label>
              <div className="flex  gap-2">
                <Select
                  name="fir_or_complaint"
                  options={firType}
                  value={firType?.filter((obj) =>
                    obj.value === "other"
                      ? obj.value
                      : apiPayload?.fir_or_complaint === obj?.value
                  )}
                  className="basic-multi-select w-[30%]"
                  classNamePrefix="select"
                  onChange={(e, data) => dropdownChange(e, data)}
                  isSearchable={false}
                  isDisabled={!isEditable && requestData}
                />
                {isother && (
                  <Input
                    type="text"
                    name="fir_or_complaint"
                    required
                    placeholder={"Enter Type"}
                    onChange={(e) =>
                      setApiPayload({
                        ...apiPayload,
                        fir_or_complaint: e.target.value,
                      })
                    }
                    value={apiPayload.fir_or_complaint}
                    disabledSelect={!isEditable && requestData}
                  />
                )}
                <Input
                  type="text"
                  name="fir_no"
                  required
                  placeholder={"Enter fir No"}
                  onChange={handleChange}
                  value={apiPayload.fir_no}
                  disabledSelect={!isEditable && requestData}
                />
              </div>
            </div>

            {/* Case Type */}
            <div>
              <label className="font-bold required">Case Type:</label>
              <Select
                name="case_type"
                options={caseType}
                value={caseType?.filter(
                  (obj) => apiPayload?.case_type == obj?.id
                )}
                className="basic-multi-select w-[50%]"
                classNamePrefix="select"
                onChange={(e, data) => dropdownChange(e, data)}
                isDisabled={!isEditable && requestData}
                required
              />
            </div>
            <div className="mt-6 flex gap-3 items-center">
              <label htmlFor="" className="font-bold">
                Select if Form is Urgent
              </label>
              <Input
                type="checkbox"
                name="urgent"
                onChange={(e) => handleChange(e, "urgent")}
                // checked={apiPayload?.urgent?"checked":"unchecked"}
                // checked={(apiPayload?.urgent===true)?"checked":""}
                disabledSelect={!isEditable && requestData}
              />
            </div>
          </div>
          <div className="mt-6 flex items-center gap-6">
            <label className="font-bold">Target Type:</label>
            <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
              <ul className="flex flex-wrap -mb-px">
                {targetType?.map((val, key) => (
                  <li className="me-2" key={key}>
                    <button
                      onClick={(e) => handleChange(e, "target_type", val)}
                      disabled={
                        !isEditable &&
                        requestData &&
                        !requestData?.form_request_for[arry[val?.name]]
                          ?.length > 0
                      }
                      type="button"
                      className={
                        activeForm?.target_type === val?.name
                          ? "inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg "
                          : "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300"
                      }
                      id={key}
                    >
                      {String(val?.name).replace("_", " ")}
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
            <label className="font-bold required">Case Reference:</label>
            <textarea
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              name="brief_summary"
              value={apiPayload?.brief_summary}
              onChange={handleChange}
              disabled={!isEditable && requestData}
            ></textarea>
          </div>
          <div className="mt-6 flex gap-3 items-center">
            <label htmlFor="" className="font-bold">
              select File if any-:
            </label>
            <Input
              type="file"
              name="file"
              onChange={(e) => handleChange(e, "files")}
              // value={apiPayload.fir_no}
              disabledSelect={!isEditable && requestData}
            />
            {((!isEditable && requestData) || (isEditable && requestData)) && (
              <a target="_blank" href={requestData.file}>
                <button
                  disabled={!requestData?.file?.length > 0}
                  type="button"
                  className={
                    !requestData?.file?.length > 0
                      ? "bg-gray-600 text-white  focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 cursor-not-allowed focus:outline-none focus:ring-blue-800"
                      : "bg-cyan-600 text-white  focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none focus:ring-blue-800"
                  }
                >
                  View File
                </button>
              </a>
            )}
          </div>
          <div className="flex justify-start items-center gap-5 mt-6">
            {/* IO Name */}
            <div className="flex items-center gap-3">
              <label className="font-bold required">
                Requesting Officer Name:
              </label>
              <Input
                type="text"
                name="io_name"
                required
                onChange={handleChange}
                value={apiPayload.io_name}
                disabledSelect={!isEditable && requestData}
              />
            </div>

            {/* IO Mobile no. */}
            <div className="flex items-center gap-3">
              <label className="font-bold required">
                Requesting Officer Mobile no.
              </label>
              <Input
                type="text"
                name="io_mobile_no"
                required
                onChange={handleChange}
                value={apiPayload.io_mobile_no}
                disabledSelect={!isEditable && requestData}
                min={10}
                maxLength="10"
                inputMode="numeric"
                id="mobile"
                onKeyUp={check}
              />
              <span id="message"></span>
            </div>
            {/* <div className="flex items-center gap-3">
              <label className="font-bold">Requesting Officer Email.</label>
              <div className="flex flex-col items-center">
                <Input
                  type="email"
                  name="io_email"
                  onChange={handleChange}
                  value={apiPayload.io_email}
                  disabledSelect={!isEditable && requestData}
                />
                <span id="message">(.gov & .nic email's only )</span>
              </div>
            </div> */}

            {/* {apiPayload?.io_mobile_no.length===10&& <div> <button type="button" className="bg-green-700 text-white hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none focus:ring-blue-800">
                send Otp
              </button> </div>} */}
          </div>

          {/* Submit Button */}
          {(!requestData || isEditable) && (
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

export default RequestForm;
