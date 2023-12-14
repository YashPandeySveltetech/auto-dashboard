import React, { useEffect, useState } from "react";
import Input from "../../components/input";
import Radio from "../../components/radio";
import { tspList, arry } from "../../constants/tspList";
import { CLOSING } from "ws";

function CDRform({
  handleChange,
  setApiPayload,
  apiPayload,
  activeForm,
  requestData,
}) {
  console.log(requestData, "requestData={requestData}");
  const [cdrMobileList, setCdrMobileList] = useState([
    {
      date_from: "",
      date_to: "",
      time_from: "",
      time_to: "",
      mobile_number: "",
      tsp: "",
    },
  ]);
  const cdrMobileInputChange = (e, index) => {
    const { name, value } = e.target;

    const list = [...cdrMobileList];
    list[index][name] = value;
    setCdrMobileList(list);
  };

  const cdrAddMobileClick = () => {
    setCdrMobileList([
      ...cdrMobileList,
      {
        date_from: "",
        date_to: "",
        time_from: "",
        time_to: "",
        tsp: "",
      },
    ]);
  };

  const cdrMobileRemoveClick = (index) => {
    const list = [...cdrMobileList];
    list.splice(index, 1);
    setCdrMobileList(list);
  };
  // imei
  const [cdrImeiList, setCdrImeiList] = useState([
    {
      date_from: "",
      date_to: "",
      time_from: "",
      time_to: "",
      imei: "",
    },
  ]);

  const cdrImeiInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...cdrImeiList];
    list[index][name] = value;
    setCdrImeiList(list);
  };

  const cdrAddImeiClick = () => {
    setCdrImeiList([
      ...cdrImeiList,
      {
        mobile_number: "",
        date_from: "",
        date_to: "",
        time_from: "",
        time_to: "",
      },
    ]);
  };

  const cdrImeiRemoveClick = (index) => {
    const list = [...cdrImeiList];
    list.splice(index, 1);
    setCdrImeiList(list);
  };
  const handleview = () => {
    if (requestData?.target_type === "MOBILE_NUMBER") {
      setCdrMobileList(requestData.form_request_for.multiple_mobile);

      setApiPayload({
        ...apiPayload,
        form_request_for: {
          [arry[requestData?.target_type]]:
            requestData.form_request_for.ip_port,
        },
      });
      console.log(
        requestData.form_request_for.ip_port,
        "requestData.form_request_for.ip_port"
      );
      return;
    }
    console.log("gh");
    if (requestData?.target_type === "IMEI_NUMBER") {
      // setApiPayload({
      //   ...apiPayload,
      //   form_request_for: { [arry[requestData?.target_type]]: cdrImeiList },
      // });
    }
  };

  useEffect(() => {
    if (requestData) {
      handleview();
    }
  }, []);

  useEffect(() => {
    if (apiPayload?.target_type === "MOBILE_NUMBER") {
      apiPayload?.target_type &&
        setApiPayload({
          ...apiPayload,
          form_request_for: { [arry[apiPayload?.target_type]]: cdrMobileList },
        });
    }
    if (apiPayload?.target_type === "IMEI_NUMBER") {
      apiPayload?.target_type &&
        setApiPayload({
          ...apiPayload,
          form_request_for: { [arry[apiPayload?.target_type]]: cdrImeiList },
        });
    }
  }, [cdrMobileList, cdrImeiList]);

  const Mobile = () => (
    <>
      {console.log(cdrMobileList, "cdrMobileList")}
      {cdrMobileList.map((val, i) => (
        <>
          {console.log(val, "val")}
          <div key={i} className="flex gap-5 items-center justify-start">
            <Input
              label={"Mobile "}
              type="text"
              value={val.mobile_number}
              name="mobile_number"
              onChange={(e) => cdrMobileInputChange(e, i)}
            />
            {/* CDR DATE TIME */}
            {/* date  */}
            <div className="input-group flex items-center justify-start gap-5 m-3">
              <label className="form-label me-4 col-md-1 font-bold">
                Date :
              </label>

              <div className=" flex gap-5">
                <div className="w-15  input-group flex items-center gap-3">
                  <span className="input-group-text font-bold">From</span>
                  <Input
                    label={" "}
                    name="date_from"
                    type="date"
                    onChange={(e) => cdrMobileInputChange(e, i)}
                  />
                </div>
              </div>
              <div className="col-md-3 ms-4">
                <div className="w-15  input-group flex items-center gap-3">
                  <span className="input-group-text font-bold">To</span>
                  <Input
                    label={" "}
                    name="date_to"
                    type="date"
                    onChange={(e) => cdrMobileInputChange(e, i)}
                  />
                </div>
              </div>
            </div>

            {/*  Time */}
            <div className="flex items-center justify-start gap-5 m-3 ">
              <label className="form-label me-4 col-md-1 font-bold">
                Time :
              </label>

              <div className="col-md-3">
                <div className="flex items-center gap-3 ">
                  <span className="input-group-text font-bold">From</span>
                  <Input
                    label={" "}
                    type="time"
                    name="time_from"
                    onChange={(e) => cdrMobileInputChange(e, i)}
                  />
                </div>
              </div>
              <div className="col-md-3 ms-4">
                <div className="flex items-center gap-3 ">
                  <span className="input-group-text font-bold">To</span>
                  <Input
                    label={" "}
                    type="time"
                    name="time_to"
                    onChange={(e) => cdrMobileInputChange(e, i)}
                  />
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <select
                name="tsp"
                onChange={(e) => cdrMobileInputChange(e, i)}
                className="form-control col-md-4"
                required
              >
                <option value="select " className="text-uppercase">
                  Select TSP
                </option>
                {tspList?.map((tspVal, key) => {
                  return (
                    <option
                      key={key}
                      value={tspVal}
                      className="text-uppercase"
                      name="tsp"
                      required
                    >
                      {tspVal}
                    </option>
                  );
                })}
              </select>
            </div>

            <div>
              <div className="flex gap-5">
                {cdrMobileList.length !== 1 && (
                  <button
                    type="button"
                    className="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={() => cdrMobileRemoveClick(i)}
                  >
                    Remove
                  </button>
                )}
                {cdrMobileList.length - 1 === i && (
                  <button
                    type="button"
                    className="text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={cdrAddMobileClick}
                  >
                    Add
                  </button>
                )}
              </div>
            </div>
          </div>
          <hr className="font-bold" />
        </>
      ))}
    </>
  );
  const IMEI = () => (
    <>
      {cdrImeiList.map((val, i) => (
        <>
          <div className="flex gap-5 items-center">
            <Input
              label={"IMEI "}
              name="imei"
              onChange={(e) => cdrImeiInputChange(e, i)}
            />

            {/* CDR DATE TIME */}
            {/* date  */}
            <div className="input-group flex items-center justify-start gap-5 m-3">
              <label className="form-label me-4 col-md-1 font-bold">
                Date :
              </label>

              <div className=" flex gap-5">
                <div className="w-15  input-group flex items-center gap-3">
                  <span className="input-group-text font-bold">From</span>
                  <Input
                    label={" "}
                    type="date"
                    name="date_from"
                    onChange={(e) => cdrImeiInputChange(e, i)}
                  />
                </div>
              </div>
              <div className="col-md-3 ms-4">
                <div className="w-15  input-group flex items-center gap-3">
                  <span className="input-group-text font-bold">To</span>
                  <Input
                    label={" "}
                    type="date"
                    name="date_to"
                    onChange={(e) => cdrImeiInputChange(e, i)}
                  />
                </div>
              </div>
            </div>

            {/*  Time */}
            <div className="flex items-center justify-start gap-5 m-3 ">
              <label className="form-label me-4 col-md-1 font-bold">
                Time :
              </label>

              <div className="col-md-3">
                <div className="flex items-center gap-3 ">
                  <span className="input-group-text font-bold">From</span>
                  <Input
                    label={" "}
                    type="time"
                    name="time_from"
                    onChange={(e) => cdrImeiInputChange(e, i)}
                  />
                </div>
              </div>
              <div className="col-md-3 ms-4">
                <div className="flex items-center gap-3 ">
                  <span className="input-group-text font-bold">To</span>
                  <Input
                    label={" "}
                    type="time"
                    name="time_to"
                    onChange={(e) => cdrImeiInputChange(e, i)}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <select
                  name="tsp"
                  onChange={(e) => cdrImeiInputChange(e, i)}
                  className="form-control col-md-4"
                  required
                >
                  <option value="select " className="text-uppercase">
                    Select TSP
                  </option>
                  {tspList?.map((tspVal, key) => {
                    return (
                      <option
                        key={key}
                        value={tspVal}
                        className="text-uppercase"
                        name="tsp"
                        required
                      >
                        {tspVal}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="flex gap-5">
              {cdrImeiList.length !== 1 && (
                <button
                  type="button"
                  className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  onClick={() => cdrImeiRemoveClick(i)}
                >
                  Remove
                </button>
              )}
              {cdrImeiList.length - 1 === i && (
                <button
                  onClick={cdrAddImeiClick}
                  type="button"
                  className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Add
                </button>
              )}
            </div>
          </div>
        </>
      ))}
    </>
  );

  return (
    <div>
      {console.log(apiPayload, "apiPayload")}
      {console.log(cdrMobileList, "cdrMobileList")}

      <div className="radioselect">
        <label className="form-label me-4 font-bold">Target Type :</label>
        <div className="flex gap-5">
          <Radio
            value={"MOBILE_NUMBER" == activeForm?.target_type}
            label="MOBILE NUMBER"
            name="target_type"
            id="target_type"
            handleChange={(e) => {
              handleChange(e, "target_type", "MOBILE_NUMBER");
            }}
          />{" "}
          <Radio
            value={"IMEI_NUMBER" == activeForm?.target_type}
            label="IMEI NUMBER"
            name="target_type"
            id="target_type"
            handleChange={(e) => {
              handleChange(e, "target_type", "IMEI_NUMBER");
            }}
          />
        </div>
      </div>
      {console.log(activeForm?.target_type, "activeForm?.target_type")}
      <div className="flex flex-col gap-5">
        {activeForm?.target_type === "MOBILE_NUMBER" ||
        requestData?.target_type === "MOBILE_NUMBER"
          ? Mobile()
          : activeForm?.target_type === "IMEI_NUMBER" ||
            requestData?.target_type === "IMEI_NUMBER"
          ? IMEI()
          : ""}
      </div>
    </div>
  );
}

export default CDRform;
