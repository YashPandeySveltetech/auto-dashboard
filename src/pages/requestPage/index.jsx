/** @format */

import React, {useCallback, useEffect, useMemo, useState, useRef} from "react";

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
import {ApiHandle} from "../../utils/ApiHandle";
import Toaster from "../../utils/toaster/Toaster";
import Mobile from "./Mobile";
import Imei from "./Imei";
import {arry, firType, firTypeList} from "../../constants/List";
import IpAddress from "./IpAddress";
import CellId from "./CellId";

import {useDispatch} from "react-redux";
import {otpValidationModal} from "../../redux/reducers/modalsReducer";

import {useLocation, useParams, useNavigate} from "react-router";
import Ild from "./Ild";
import Title from "../../utils/Title";
import {ArrowLeft} from "react-bootstrap-icons";
import BackButton from "../../components/backButton/BackButton";

function RequestForm({requestData}) {
  const {pathname} = useLocation();
  const dispatch = useDispatch();
  var isEditable = pathname.includes("edit");
  let {id} = useParams();
  const [isformcreate, setIsFormCreate] = useState(false);

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
    pis_no: "",
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
      date_from: null,
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
      date_from: null,
      date_to: null,
      time_from: "00:00",
      time_to: "00:00",
      till_date: false,
      imei: "",
      tsp: [],
      target_type: "",
      request_to_provide: [],
      fir_or_complaint: "",
      fir_no: "",
      case_type: "",
    },
  ]);
  const [IpList, setIpList] = useState([
    {
      ip: "",
      date_from: null,
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
      date_from: null,
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
      date_from: null,
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
  const [isValid, setIsValid] = useState(false);
  const [isPisValid, setPisValid] = useState(false);
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
          ["io_name"]: requestData?.io_name.toUpperCase(),
          ["io_mobile_no"]: requestData?.io_mobile_no,
          // ["io_email"]: requestData?.io_email,
          ["brief_summary"]: requestData?.brief_summary,
          ["form_request_for"]: requestData?.form_request_for,
          ["urgent"]: requestData?.urgent,
          ["pis_no"]: requestData?.pis_no,
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
  useEffect(() => {
    if (isformcreate) {
      setMobileList([
        {
          date_from: null,
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
      setImeiList([
        {
          date_from: null,
          date_to: null,
          time_from: "00:00",
          time_to: "00:00",
          till_date: false,
          imei: "",
          tsp: [],
          target_type: "",
          request_to_provide: [],
          fir_or_complaint: "",
          fir_no: "",
          case_type: "",
        },
      ]);
      setIpList([
        {
          ip: "",
          date_from: null,
          date_to: null,
          time_from: "00:00",
          time_to: "00:00",
          till_date: false,
          tsp: [],
          target_type: "",
          request_to_provide: [],
        },
      ]);
      setCellIdList([
        {
          date_from: null,
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
      setIldList([
        {
          date_from: null,
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
      setIsFormCreate(false);
    }
  }, [isformcreate]);

  const getTspList = async () => {
    const res = await ApiHandle(`${TSP_LIST}`, "", "GET");
    if (res.statusCode === 200) {
      let data = [
        ...res?.responsePayload,
        {id: [1, 3, 4], name: "ALL", email: ""},
      ];

      setTspList(data);
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
      return {label: item.name, id: item.id, value: item.name};
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
    IldList,
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
          firType={firType}
          caseType={caseType}
          requestprovide={requestprovide}
          isEditable={isEditable}
          handleChange={handleChange}
          apiPayload={apiPayload}
          setApiPayload={setApiPayload}
          isother={isother}
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
    activeForm.target_type,
    apiPayload,
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
        fir_or_complaint: ImeiList[0]?.fir_or_complaint,
        fir_no: ImeiList[0]?.fir_no,
        case_type: ImeiList[0]?.case_type,
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
    console.log(isPisValid);
    const {name, value, files, checked} = e.target;
    if (callfrom === "urgent") {
      setApiPayload({
        ...apiPayload,
        [name]: checked,
      });
    } else if (callfrom === "files") {
      setApiPayload({
        ...apiPayload,
        [name]: files[0],
      });
    } else if (callfrom) {
      setActiveForm({
        ...activeForm,
        [callfrom]: fromval.name,
        target_type_id: fromval.id,
      });
    } else if (name === "io_mobile_no") {
      if (value.length <= 10) {
        setIsValid(true);
        setApiPayload({
          ...apiPayload,
          [name]: value,
        });
      } else {
        setIsValid(false);
      }
    } else if (name === "pis_no") {
      if (value.length < 8) {
        setPisValid(true);
        setApiPayload({
          ...apiPayload,
          [name]: value,
        });
      } else {
        setPisValid(false);
      }
    } else if (name == "io_name") {
      setApiPayload({
        ...apiPayload,
        [name]: value.toUpperCase(),
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
      setActiveForm({...activeForm, dump_type: e.value});
    } else if (data.name === "case_type") {
      setApiPayload({
        ...apiPayload,
        [data?.name]: e?.id,
      });
    } else if (data.name === "fir_or_complaint") {
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
    } else {
      setApiPayload({
        ...apiPayload,
        [data?.name]: e?.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFormCreate(false);
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
    if (Object.keys(apiPayload?.form_request_for)?.length > 0) {
      const res = await ApiHandle(
        url,
        apiPayload.file ? formData : apiPayload,
        isEditable ? "PUT" : "POST",
        apiPayload.file ? true : false
      );
      if (res?.statusCode === 201) {
        // getFormPdf(res?.responsePayload?.id);
        setApiPayload(initialobj);
        setIsFormCreate(true);
        setActiveForm({
          target_type: "",
          request_to_provide: [],
          target_type_id: "",
        });
        dispatch(otpValidationModal({id: res?.responsePayload?.id}));
        Toaster("success", "SuccessFully Submitted Form");
        return;
      }
      if (res?.statusCode === 200) {
        dispatch(otpValidationModal({id: res?.responsePayload?.id}));
        Toaster("success", "SuccessFully Updated Form");
      }
    } else {
      Toaster("", "Please Fill all mandatory Data");
      setIsFormCreate(false);
    }
  };
  const getFormPdf = async (id) => {
    const res = await ApiHandle(`${MAKE_PDF}?form_id=${id}`, "", "GET");
  };
  function checkMobile() {
    var mobile = document.getElementById("iomobile");

    var message = document.getElementById("errormsg");

    var goodColor = "#0C6";
    var badColor = "#FF9B37";

    if (mobile.value.length > 10 || mobile.value.length < 10) {
      message.style.color = badColor;
      message.innerHTML = "required 10 digits mobile number";
    } else {
      message.style.color = goodColor;
      message.innerHTML = "";
    }
  }
  const containerRef = useRef(null);

  const scrollLeft = () => {
    containerRef.current.scrollBy({left: -200, behavior: "smooth"});
  };

  const scrollRight = () => {
    containerRef.current.scrollBy({left: 200, behavior: "smooth"});
  };

  return (
    <>
      {/* <BackButton/> */}
      <Title text={"New Request Form"} />
      <div className="outer-div-whole mx-auto mb-5" style={{padding: "30px"}}>
        <form action="" onSubmit={handleSubmit}>
          <div className=" flex w-full gap-10">
            <div className="flex flex-col w-full">
              <label className="font-bold">Date:</label>
              <div className="rounded-md border border-gray-300 p-2 w-full">
                {currentDate}
              </div>
            </div>

            <div className="flex flex-col w-full">
              <label className="font-bold">Time:</label>
              <div className="rounded-md border border-gray-300 p-2 w-full">
                {currentTime ?? "00:00:00"}
              </div>
            </div>
          </div>

          <div className="mt-6">
            {activeForm.target_type !== "IMEI_NUMBER" && (
              <>
                {" "}
                <div className="flex gap-10">
                  <div className="w-full ">
                    <label className="font-bold required">Choose Type:</label>
                    <div className="flex  gap-2">
                      <Select
                        name="fir_or_complaint"
                        options={firType}
                        value={
                          requestData &&
                          firType?.filter(
                            (obj) => obj.value === apiPayload.fir_or_complaint
                          )
                        }
                        className="basic-multi-select w-[80%]"
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
                          value={apiPayload?.fir_or_complaint}
                          disabledSelect={!isEditable && requestData}
                        />
                      )}
                      <Input
                        type="text"
                        name="fir_no"
                        required
                        placeholder={
                          "Enter " + apiPayload?.fir_or_complaint + " no."
                        }
                        onChange={handleChange}
                        value={apiPayload?.fir_no}
                        disabledSelect={!isEditable && requestData}
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div className="w-full ">
                    <label className="font-bold required">Crime Head:</label>

                    <Select
                      name="case_type"
                      options={caseType}
                      value={caseType?.filter(
                        (obj) => apiPayload?.case_type == obj?.id
                      )}
                      className="basic-multi-select w-[100%]"
                      classNamePrefix="select"
                      onChange={(e, data) => dropdownChange(e, data)}
                      isDisabled={!isEditable && requestData}
                      required
                    />
                  </div>
                </div>
              </>
            )}
          </div>
          <div className=" flex  items-center mt-5 gap-5">
            <label htmlFor="" className="font-bold">
              Select if Form is Urgent
            </label>
            <input
              type="checkbox"
              name="urgent"
              onChange={(e) => handleChange(e, "urgent")}
              checked={apiPayload?.urgent}
              // checked={apiPayload?.urgent?"checked":"unchecked"}
              // checked={(apiPayload?.urgent===true)?"checked":""}
              disabled={!isEditable && requestData}
            />
          </div>
          <div className="mt-6 flex flex-col">
            <label className="font-bold required">Target Type:</label>
          </div>

          <div className="mt-2">
            <div className="relative flex items-center">
              <button
                onClick={scrollLeft}
                className="absolute left-0 z-10 p-2 bg-gray-300 rounded-full shadow-md focus:outline-none md:hidden block"
              >
                &lt;
              </button>

              <div
                className="flex rounded-lg gap-2 ml-[40px]  mr-[40px] overflow-x-auto scrollbar-thumb-gray-900 scrollbar-track-gray-100 scrollbar-thin"
                ref={containerRef}
              >
                {targetType?.map((val, key) => (
                  <div key={key} className="flex-shrink-0">
                    <div className="border-b border-gray-200">
                      <nav className="-mb-px flex gap-2">
                        <button
                          onClick={(e) => handleChange(e, "target_type", val)}
                          disabled={
                            (!isEditable &&
                              requestData &&
                              !requestData?.form_request_for[arry[val?.name]]
                                ?.length > 0) ||
                            (isEditable &&
                              requestData &&
                              !requestData?.form_request_for[arry[val?.name]]
                                ?.length > 0)
                          }
                          type="button"
                          className={`border p-3 rounded-tl-md rounded-tr-md text-sm font-medium text-gray-500
                    ${
                      activeForm?.target_type === val?.name
                        ? "border-black-400 border-b-white bg-[#FFFAFA] text-sky-700"
                        : "hover:text-gray-700"
                    }`}
                        >
                          {String(val?.name).replace("_", " ")}
                          <span className="text-gray-400">
                            (
                            {apiPayload?.form_request_for[arry[val?.name]]
                              ?.length > 0
                              ? apiPayload?.form_request_for[arry[val?.name]]
                                  ?.length
                              : 0}
                            )
                          </span>
                        </button>
                      </nav>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={scrollRight}
                className="absolute right-0 z-10 p-2 bg-gray-300 rounded-full shadow-md md:hidden block"
              >
                &gt;
              </button>
            </div>

            <div>{formHandler()}</div>
          </div>

          {/* Comments */}
          <div className="mt-6">
            <label className="font-bold required ">Case Reference:</label>
            <textarea
              className="block p-2 w-full border border-black-900 text-sm text-gray-900 bg-transparent focus:outline-none  focus:border-blue-600 peer !bg-blue-100"
              name="brief_summary"
              value={apiPayload?.brief_summary}
              onChange={handleChange}
              disabled={!isEditable && requestData}
            ></textarea>
          </div>

          {/* not in use */}
          {/* <div className="mt-6 flex gap-3 items-center flex-wrap">
            <label htmlFor="" className="font-bold">
              Select File if any:
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
          </div> */}
          <div className="flex justify-start items-center gap-5 mt-6 flex-wrap">
            {/* IO Name */}
            <div className="flex items-center gap-3 flex-wrap">
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
            <div className="flex items-center gap-3 flex-wrap">
              <label className="font-bold required">
                Requesting Officer PIS no.
              </label>
              <Input
                type="number"
                name="pis_no"
                required
                onChange={handleChange}
                value={apiPayload.pis_no}
                max={99999999}
                maxLength="8"
                inputMode="numeric"
                id="pis"
              />
              {isPisValid && (
                <div className=" has-tootip">
                  <span className=" text-red-500 tooltip">
                    PIS number must be 8 digits long.
                  </span>
                </div>
              )}
            </div>
            {/* IO Mobile no. */}
            <div className="flex items-center gap-3 flex-wrap">
              <label className="font-bold required">
                Requesting Officer Mobile no.
              </label>
              <Input
                type="number"
                name="io_mobile_no"
                required
                onChange={handleChange}
                value={apiPayload.io_mobile_no}
                max={9999999999} // Define the maximum value here (10 digits)
                maxLength="10"
                inputMode="numeric"
                id="iomobile"
                // onKeyUp={checkMobile}
              />
              {isValid && (
                <p style={{color: "red"}}>
                  Mobile number must be 10 digits long.
                </p>
              )}
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
              <button
                disabled={activeForm?.target_type === ""}
                className="bg-blue-400 text-white hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none focus:ring-blue-800 disabled:cursor-not-allowed disabled:bg-gray-500"
              >
                Submit
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
}

export default RequestForm;
