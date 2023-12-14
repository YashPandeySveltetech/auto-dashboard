import React, { useCallback, useEffect, useState } from "react";
import { tspList, arry } from "../../constants/tspList";
import Input from "../../components/input";
import Radio from "../../components/radio";

function TowerDumpForm({
  handleChange,
  setApiPayload,
  apiPayload,
  activeForm,
  requestData,
}) {
  const [tdrModelList, settdrModelList] = useState([
    {
      date_from: "",
      date_to: "",
      time_from: "",
      time_to: "",
      cell_id: "",
      tsp: "",
    },
  ]);
  useEffect(() => {
    if (requestData) {
      handleview();
    }
  }, []);

  const handleview = () => {
    if ( dump?.includes(requestData?.target_type)) {
      settdrModelList(requestData.form_request_for.cell_id);

      return;
    }
  };
  const tdrModelListChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "tsp" && value === "ALL") {
      const list = [];
      const tspl = ["AIRTEL", "VI", "BSNL", "JIO"];
      for (let i = 0; i < 4; i++) {
        let obj = { ...tdrModelList[0], "tsp": tspl[i] };
        list.push(obj);
      }
      settdrModelList(list);
    } else {
      const list = [...tdrModelList];
      list[index][name] = value;

      settdrModelList(list);
    }
  };

  const tdrAddClick = () => {
    settdrModelList([
      ...tdrModelList,
      {
        date_from: "",
        date_to: "",
        time_from: "",
        time_to: "",
        cell_id: "",
        tsp: "",
      },
    ]);
  };

  const tdrRemoveClick = (index) => {
    const list = [...tdrModelList];
    list.splice(index, 1);
    settdrModelList(list);
  };
  useEffect(() => {
    if (dump?.includes(apiPayload?.target_type)) {
      apiPayload?.target_type &&
        setApiPayload({
          ...apiPayload,
          form_request_for: { [arry[apiPayload?.target_type]]: tdrModelList },
        });
    }
  }, [tdrModelList]);
  console.log(apiPayload,">>>>")
  const CellID = () => (
    <>
      {tdrModelList.map((val, i) => (
        <>
          <div key={i} className="flex gap-5 items-center justify-start">
            <Input
              label={"CELL ID"}
              type="text"
              name="cell_id"
              value={val.cell_id}
              onChange={(e) => tdrModelListChange(e, i)}
              disabled={requestData}
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
                    onChange={(e) => tdrModelListChange(e, i)}
                    disabled={requestData}
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
                    onChange={(e) => tdrModelListChange(e, i)}
                    disabled={requestData}
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
                    onChange={(e) => tdrModelListChange(e, i)}
                    disabled={requestData}
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
                    onChange={(e) => tdrModelListChange(e, i)}
                    disabled={requestData}
                  />
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <select
                name="tsp"
                onChange={(e) => tdrModelListChange(e, i)}
                className="form-control col-md-4"
                value={val.tsp}
                required
                disabled={requestData}
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
                  {tdrModelList.length !== 1 && (
                    <button
                      className="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      onClick={() => tdrRemoveClick(i)}
                    >
                      Remove
                    </button>
                  )}
                  {tdrModelList.length - 1 === i && (
                    <button
                      className="text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      onClick={tdrAddClick}
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
  let dump=["GPRS_DUMP","IP_DUMP","CDR_DUMP"]
  return (
    <div>
      <div className="radioselect">
        <label className="form-label me-4 font-bold">Target Type :</label>
        <div className="flex gap-5">
          <Radio
            value={"GPRS_DUMP" == activeForm?.target_type}
            label="GPRS DUMP"
            name="target_type"
            id="target_type"
            handleChange={(e) => {
              handleChange(e, "target_type", "GPRS_DUMP");
            }}
            disabled={requestData}
          />
          <Radio
            value={"IP_DUMP" == activeForm?.target_type}
            label="IP DUMP"
            name="target_type"
            id="target_type"
            handleChange={(e) => {
              handleChange(e, "target_type", "IP_DUMP");
            }}
            disabled={requestData}
          />
          <Radio
            value={"CDR_DUMP" == activeForm?.target_type}
            label="CDR DUMP"
            name="target_type"
            id="target_type"
            handleChange={(e) => {
              handleChange(e, "target_type", "CDR_DUMP");
            }}
            disabled={requestData}
          />
        </div>
      </div>
      {dump?.includes(activeForm?.target_type)&& CellID()}
    </div>
  );
}

export default TowerDumpForm;
