import React, { useCallback, useEffect, useState } from "react";
import { tspList, arry } from "../../constants/tspList";
import Input from "../../components/input";
import Radio from "../../components/radio";

function IPDRform({
  handleChange,
  setApiPayload,
  apiPayload,
  activeForm,
  requestData,
}) {
  const [ipdrMobileList, setipdrMobileList] = useState([
    {
      date_from: "",
      date_to: "",
      time_from: "",
      time_to: "",
      mobile_number: "",
      tsp: "",
    },
  ]);

  const ipdrmobilechange = (e, index) => {
    const { name, value } = e.target;
    if (name === "tsp" && value === "ALL") {
      const list = [];
      const tspl = ["AIRTEL", "VI", "BSNL", "JIO"];
      for (let i = 0; i < 4; i++) {
        let obj = { ...ipdrMobileList[0], "tsp": tspl[i] };
        list.push(obj);
      }
      setipdrMobileList(list);
    } else {
      const list = [...ipdrMobileList];
      list[index][name] = value;

      setipdrMobileList(list);
    }
  
  };

  const ipdrAddHandle = () => {
    setipdrMobileList([
      ...ipdrMobileList,
      {
        mobile_number: "",
        date_from: "",
        date_to: "",
        time_from: "",
        time_to: "",
        tsp: "",
      },
    ]);
  };

  const ipdrHandleRemove = (index) => {
    const list = [...ipdrMobileList];
    list.splice(index, 1);
    setipdrMobileList(list);
  };
  // imei
  const [ipdrImeiList, setipdrImeiList] = useState([
    {
      date_from: "",
      date_to: "",
      time_from: "",
      time_to: "",
      imei: "",
      tsp: "",
    },
  ]);

  const ipdrimeiChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "tsp" && value === "ALL") {
      const list = [];
      const tspl = ["AIRTEL", "VI", "BSNL", "JIO"];
      for (let i = 0; i < 4; i++) {
        let obj = { ...ipdrImeiList[0], "tsp": tspl[i] };
        list.push(obj);
      }
      setipdrImeiList(list);
    } else {
      const list = [...ipdrImeiList];
      list[index][name] = value;

      setipdrImeiList(list);
    }
  
  
  };

  const ipdrImeiAdd = () => {
    setipdrImeiList([
      ...ipdrImeiList,
      {
        imei: "",
        date_from: "",
        date_to: "",
        time_from: "",
        time_to: "",
        tsp: "",
      },
    ]);
  };

  useEffect(() => {
    if (requestData) {
      handleview();
    }
  }, []);

  const handleview = () => {
    if (requestData?.target_type === "MOBILE_NUMBER") {
      setipdrMobileList(requestData.form_request_for.multiple_mobile);

      return;
    }

    if (requestData?.target_type === "IMEI_NUMBER") {
      setipdrImeiList(requestData.form_request_for.imei_number);
      return;
    }
    if (requestData?.target_type === "IP_ADDRESS") {
      setIpdrReverseIpList(requestData.form_request_for.ip_port);
      return;
    }
  };
  const handleRemoveImei = (index) => {
    const list = [...ipdrImeiList];
    list.splice(index, 1);
    setipdrImeiList(list);
  };

  const [ipdrReverseIpList, setIpdrReverseIpList] = useState([
    {
      ip: "",
      date_from: "",
      date_to: "",
      time_from: "",
      time_to: "",
      tsp: "",
    },
  ]);

  const ipdrIpChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "tsp" && value === "ALL") {
      const list = [];
      const tspl = ["AIRTEL", "VI", "BSNL", "JIO"];
      for (let i = 0; i < 4; i++) {
        let obj = { ...ipdrReverseIpList[0], "tsp": tspl[i] };
        list.push(obj);
      }
      setIpdrReverseIpList(list);
    } else {
      const list = [...ipdrReverseIpList];
      list[index][name] = value;

      setIpdrReverseIpList(list);
    }
  };

  const ipdrAddReverseIpClick = () => {
    setIpdrReverseIpList([
      ...ipdrReverseIpList,
      {
        ip: "",
        date_from: "",
        date_to: "",
        time_from: "",
        time_to: "",
        tsp: "",
      },
    ]);
  };

  const ipdrReverseIpRemoveClick = (index) => {
    const list = [...ipdrReverseIpList];
    list.splice(index, 1);
    setIpdrReverseIpList(list);
  };

  const Mobile = () => (
    <>
      {ipdrMobileList.map((val, i) => (
        <>
          <div key={i} className="flex gap-5 items-center justify-start">
            <Input
              label={"Mobile "}
              type="text"
              value={val.mobile_number}
              name="mobile_number"
              onChange={(e) => ipdrmobilechange(e, i)}
              disabledSelect={requestData}
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
                    value={val.date_from}
                    onChange={(e) => ipdrmobilechange(e, i)}
                    disabledSelect={requestData}
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
                    value={val.date_to}
                    onChange={(e) => ipdrmobilechange(e, i)}
                    disabledSelect={requestData}
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
                    value={val.time_from}
                    onChange={(e) => ipdrmobilechange(e, i)}
                    disabledSelect={requestData}
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
                    value={val.time_to}
                    onChange={(e) => ipdrmobilechange(e, i)}
                    disabledSelect={requestData}
                  />
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <select
                name="tsp"
                onChange={(e) => ipdrmobilechange(e, i)}
                className="form-control col-md-4"
                required
                disabled={requestData}
                value={val.tsp}
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

            {!requestData && (
              <div>
                <div className="flex gap-5">
                  {ipdrMobileList.length !== 1 && (
                    <button
                      className="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      onClick={() => ipdrHandleRemove(i)}
                    >
                      Remove
                    </button>
                  )}
                  {ipdrMobileList.length - 1 === i && (
                    <button
                      className="text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      onClick={ipdrAddHandle}
                    >
                      Add
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
          <hr className="font-bold" />
        </>
      ))}
    </>
  );
  const IMEI = () => (
    <>
      {ipdrImeiList.map((val, i) => (
        <>
          <div className="flex gap-5 items-center">
            <Input
              label={"IMEI "}
              name="imei"
              value={val.imei}
              onChange={(e) => ipdrimeiChange(e, i)}
              disabledSelect={requestData}
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
                    value={val.date_from}
                    onChange={(e) => ipdrimeiChange(e, i)}
                    disabledSelect={requestData}
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
                    value={val.date_to}
                    onChange={(e) => ipdrimeiChange(e, i)}
                    disabledSelect={requestData}
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
                    value={val.time_from}
                    onChange={(e) => ipdrimeiChange(e, i)}
                    disabledSelect={requestData}
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
                    value={val.time_to}
                    onChange={(e) => ipdrimeiChange(e, i)}
                    disabledSelect={requestData}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <select
                  name="tsp"
                  onChange={(e) => ipdrimeiChange(e, i)}
                  className="form-control col-md-4"
                  value={val.tsp}
                  disabled={requestData}
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

            {!requestData && (
              <div className="flex gap-5">
                {ipdrImeiList.length !== 1 && (
                  <button
                    className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={() => handleRemoveImei(i)}
                  >
                    Remove
                  </button>
                )}
                {ipdrImeiList.length - 1 === i && (
                  <button
                    onClick={ipdrImeiAdd}
                    className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Add
                  </button>
                )}
              </div>
            )}
          </div>
        </>
      ))}
    </>
  );

  const ReverseIp = () => (
    <>
      {ipdrReverseIpList.map((val, i) => (
        <>
          <div className="flex gap-5 items-center">
            <div className="input-group flex items-center justify-start gap-5 m-3">
              <label className="form-label me-4 col-md-1 font-bold">
                IP Address
              </label>

              <div className=" flex gap-5">
                <div className="w-15  input-group flex items-center gap-3">
                  <Input
                    label={" "}
                    name="ip"
                    value={val.ip}
                    onChange={(e) => ipdrIpChange(e, i)}
                    type="text"
                    disabledSelect={requestData}
                  />
                </div>
              </div>
            </div>

            {/* date  */}
            <div className="input-group flex items-center justify-start gap-5 m-3">
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
                      value={val.date_from}
                      type="date"
                      onChange={(e) => ipdrIpChange(e, i)}
                      disabledSelect={requestData}
                    />
                  </div>
                </div>
                <div className="col-md-3 ms-4">
                  <div className="w-15  input-group flex items-center gap-3">
                    <span className="input-group-text font-bold">To</span>
                    <Input
                      label={" "}
                      name="date_to"
                      value={val.date_to}
                      type="date"
                      onChange={(e) => ipdrIpChange(e, i)}
                      disabledSelect={requestData}
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
                      value={val.time_from}
                      onChange={(e) => ipdrIpChange(e, i)}
                      disabledSelect={requestData}
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
                      value={val.time_to}
                      onChange={(e) => ipdrIpChange(e, i)}
                      disabledSelect={requestData}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <select
                  name="tsp"
                  onChange={(e) => ipdrIpChange(e, i)}
                  className="form-control col-md-4"
                  value={val.tsp}
                  disabled={requestData}
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

            {!requestData && (
              <div className="flex gap-5">
                {ipdrReverseIpList.length !== 1 && (
                  <button
                    className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={() => ipdrReverseIpRemoveClick(i)}
                  >
                    Remove
                  </button>
                )}
                {ipdrReverseIpList.length - 1 === i && (
                  <button
                    onClick={ipdrAddReverseIpClick}
                    className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Add
                  </button>
                )}
              </div>
            )}
          </div>
        </>
      ))}
    </>
  );
  useEffect(() => {
    if (apiPayload?.target_type === "MOBILE_NUMBER") {
      apiPayload?.target_type &&
        setApiPayload({
          ...apiPayload,
          form_request_for: { [arry[apiPayload?.target_type]]: ipdrMobileList },
        });
    }
    if (apiPayload?.target_type === "IMEI_NUMBER") {
      apiPayload?.target_type &&
        setApiPayload({
          ...apiPayload,
          form_request_for: { [arry[apiPayload?.target_type]]: ipdrImeiList },
        });
    }
    if (apiPayload?.target_type === "IP_ADDRESS") {
      apiPayload?.target_type &&
        setApiPayload({
          ...apiPayload,
          form_request_for: {
            [arry[apiPayload?.target_type]]: ipdrReverseIpList,
          },
        });
    }
  }, [ipdrImeiList, ipdrReverseIpList, ipdrMobileList]);
  return (
    <div>
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
            disabled={requestData}
          />
          <Radio
            value={"IMEI_NUMBER" == activeForm.target_type}
            label="IMEI NUMBER"
            name="target_type"
            id="target_type"
            handleChange={(e) => {
              handleChange(e, "target_type", "IMEI_NUMBER");
            }}
            disabled={requestData}
          />
          <Radio
            value={"IP_ADDRESS" === activeForm.target_type}
            label="IP Address"
            name="target_type"
            id="target_type"
            handleChange={(e) => {
              handleChange(e, "target_type", "IP_ADDRESS");
            }}
            disabled={requestData}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        {activeForm.target_type === "MOBILE_NUMBER"
          ? Mobile()
          : activeForm.target_type === "IMEI_NUMBER"
          ? IMEI()
          : activeForm.target_type === "IP_ADDRESS"
          ? ReverseIp()
          : ""}
      </div>
    </div>
  );
}

export default IPDRform;
