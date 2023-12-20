import React from "react";
import Input from "../../components/input";
import Select from "react-select";

function Imei({
  requestData,
  ImeiList,
  setImeiList,
  activeForm,
  requestprovide,
  tspdata,
}) {
  const ImeiInputChange = (e, index) => {
    const { name, value } = e.target;

    const list = [...ImeiList];
    list[index][name] = value;
    list[index]["target_type"] = activeForm?.target_type;
    setImeiList(list);
  };

  const AddImeiClick = () => {
    setImeiList([
      ...ImeiList,
      {
        imei: "",
        date_from: "",
        date_to: "",
        time_from: "",
        time_to: "",
        target_type: activeForm?.target_type,
        request_to_provide: "",
      },
    ]);
  };

  const ImeiRemoveClick = (index) => {
    const list = [...ImeiList];
    list.splice(index, 1);
    setImeiList(list);
  };

  const dropdownChange = (e, data, index) => {
    const list = [...ImeiList];
    list[index][data?.name] = e?.length > 0 ? e?.map((i) => i.id) : e?.id;
    setImeiList(list);
  };

  return (
    <>
      {ImeiList?.map((val, i) => (
        <>
          <div
            className="shadow-lg shadow-cyan-500/50 p-5"
            style={{ background: "#FFFAFA" }}
            key={i}
          >
            <div className="grid grid-flow-col gap-4  items-center">
              <div className="col">
                <Input
                  label={"IMEI "}
                  name="imei"
                  value={val.imei}
                  onChange={(e) => ImeiInputChange(e, i)}
                  disabledSelect={requestData}
                  className="w-[100%]"
                />
              </div>

              <div className="flex justify-start items-center gap-5">
                <label htmlFor="">Request to provide</label>
                <Select
                  isMulti
                  name="request_to_provide"
                  options={requestprovide}
                  value={requestprovide?.filter((obj) =>
                    ImeiList[i]?.request_to_provide?.includes(obj?.id)
                  )}
                  className="basic-multi-select w-[100%]"
                  classNamePrefix="select"
                  onChange={(e, data) => dropdownChange(e, data, i)}
                />
              </div>
            </div>
            {/* CDR DATE TIME */}
            {/* date  */}

            <div className="input-group flex items-center justify-start gap-5 m-3">
              <label className="form-label me-4 col-md-1 font-bold">
                Date :
              </label>

              <div className="flex gap-5">
                <div className="w-15  input-group flex items-center gap-3">
                  <span className="input-group-text font-bold">From</span>
                  <Input
                    label={" "}
                    name="date_from"
                    type="date"
                    value={val.date_from}
                    onChange={(e) => ImeiInputChange(e, i)}
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
                    type="date"
                    value={val.date_to}
                    onChange={(e) => ImeiInputChange(e, i)}
                    disabledSelect={requestData}
                  />
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
                      onChange={(e) => ImeiInputChange(e, i)}
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
                      onChange={(e) => ImeiInputChange(e, i)}
                      disabledSelect={requestData}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <Select
                  isMulti
                  name="tsp"
                  options={tspdata}
                  value={tspdata.filter((obj) =>
                    ImeiList[i]?.tsp?.includes(obj?.id)
                  )}
                  className="basic-multi-select w-[100%]"
                  classNamePrefix="select"
                  onChange={(e, data) => dropdownChange(e, data, i)}
                />
              </div>

              {!requestData && (
                <div>
                  <div className="flex gap-5">
                    {ImeiList.length !== 1 && (
                      <button
                        type="button"
                        className="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        onClick={() => ImeiRemoveClick(i)}
                      >
                        Remove
                      </button>
                    )}
                    {ImeiList.length - 1 === i && (
                      <button
                        type="button"
                        className="text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        onClick={AddImeiClick}
                      >
                        Add
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <hr className="font-bold" />
        </>
      ))}
    </>
  );
}

export default Imei;
