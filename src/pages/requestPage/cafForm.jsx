import React, { useEffect, useState } from "react";
import { tspList, arry } from "../../constants/tspList";
import Input from "../../components/input";
import Radio from "../../components/radio";
function CAFform({
  handleChange,
  setApiPayload,
  apiPayload,
  activeForm,
  requestData,
}) {
  const [cafList, setCafList] = useState([
    {
      mobile_number: "",
      tsp: "",
      date_from: "",
      date_to: "",
      time_from: "",
      time_to: "",
    },
  ]);
  useEffect(() => {
    if (requestData) {
      handleview();
    }
  }, []);

  const handleview = () => {
    if (requestData?.target_type === "MOBILE_NUMBER") {
      setCafList(requestData.form_request_for.multiple_mobile);

      return;
    }
  };

  const cafInputChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "tsp" && value === "ALL") {
      const list = [];
      const tspl = ["AIRTEL", "VI", "BSNL", "JIO"];
      for (let i = 0; i < 4; i++) {
        let obj = { ...cafList[0], "tsp": tspl[i] };
        list.push(obj);
      }
      setCafList(list);
    } else {
      const list = [...cafList];
      list[index][name] = value;

      setCafList(list);
    }
  };

  const cafAddClick = () => {
    setCafList([
      ...cafList,
      {
        mobile_number: "",
        tsp: "",
      },
    ]);
  };

  const cafRemoveClick = (index) => {
    const list = [...cafList];
    list.splice(index, 1);
    setCafList(list);
  };

  useEffect(() => {
    if (apiPayload?.target_type === "MOBILE_NUMBER") {
      apiPayload?.target_type &&
        setApiPayload({
          ...apiPayload,
          form_request_for: { [arry[apiPayload?.target_type]]: cafList },
        });
    }
  }, [cafList]);
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
          />{" "}
        </div>
      </div>
      {activeForm?.target_type === "MOBILE_NUMBER" &&
        cafList.map((val, i) => (
          <div className="flex gap-5 items-center">
            <Input
              label={"Mobile no."}
              name="mobile_number"
              value={val.mobile_number}
              onChange={(e) => cafInputChange(e, i)}
              disabledSelect={requestData}
            />
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
                    onChange={(e) => cafInputChange(e, i)}
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
                    onChange={(e) => cafInputChange(e, i)}
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
                    onChange={(e) => cafInputChange(e, i)}
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
                    onChange={(e) => cafInputChange(e, i)}
                    disabledSelect={requestData}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <select
                name="tsp"
                onChange={(e) => cafInputChange(e, i)}
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
            {!requestData && (
              <div>
                <div className="flex gap-5">
                  {cafList.length !== 1 && (
                    <button
                      type="button"
                      className="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      onClick={() => cafRemoveClick(i)}
                    >
                      Remove
                    </button>
                  )}
                  {cafList.length - 1 === i && (
                    <button
                      type="button"
                      className="text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      onClick={cafAddClick}
                    >
                      Add
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

export default CAFform;
