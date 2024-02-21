
import React from "react";
import Input from "../../components/input";
import Select from "react-select";

function IpAddress({
  requestData,
  IpList,
  setIpList,
  activeForm,
  requestprovide,
  tspdata,
  isEditable
}) {
  const ipInputChange = (e, index) => {
    const { name, value,checked } = e.target;

    const list = [...IpList];
    list[index][name] = name=="till_date"?checked: value;;
    list[index]["target_type"] = activeForm?.target_type_id;
    setIpList(list);
  };

  const addIpClick = () => {
    setIpList([
      ...IpList,
      {
        ip: "",
        date_from: "",
        date_to: null,
        time_from:"00:00",
        time_to:"00:00",
        till_date:false,
        target_type: activeForm?.target_type_id,
        request_to_provide: IpList[0].request_to_provide,
        tsp:IpList[0].tsp
      },
    ]);
  };

  const ipRemoveClick = (index) => {
    const list = [...IpList];
    list.splice(index, 1);
    setIpList(list);
  };

  const dropdownChange = (e, data, index) => {
    const list = [...IpList];
    list[index][data?.name] = e?.length > 0 ? e?.map((i) => i.id) : (e===null)?[]:e.value==="ALL"?e.id:[e.id];
    setIpList(list);
  };
  return (
    <>
      {IpList?.map((val, i) => (
        <>
          <div
            className="shadow-lg shadow-cyan-500/50 p-5"
            style={{ background: "#FFFAFA" }}
            key={i}
          >
            <div className="grid grid-flow-col gap-4  items-center">
              <div className="col">
              <label htmlFor="" className=" font-bold required">IP Address</label>
                <Input
                
                  name="ip"
                  value={val.ip}
                  required={true}
                  onChange={(e) => ipInputChange(e, i)}
                  disabledSelect={!isEditable&&requestData}
                  className="w-[100%]"
                />
              </div>

              <div className="flex justify-start items-center gap-5">
              <label className="font-bold required" htmlFor="">Request to provide</label>
                <Select
                  
                  name="request_to_provide"
                  options={requestprovide}
                  value={requestprovide?.filter((obj) =>
                    IpList[i]?.request_to_provide?.includes(obj?.id)
                  )}
                  className="basic-multi-select w-[50%]"
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
                    onChange={(e) => ipInputChange(e, i)}
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
                    onChange={(e) => ipInputChange(e, i)}
                    disabledSelect={!isEditable&&requestData}
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
                      onChange={(e) => ipInputChange(e, i)}
                      disabledSelect={!isEditable&&requestData}
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
                      onChange={(e) => ipInputChange(e, i)}
                      disabledSelect={!isEditable&&requestData}
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-5 ">
<label className="form-label me-5 col-md-1 font-bold">
                Till Date :
              </label>
  <input type="checkbox" name="till_date" id="" checked={val?.till_date} onChange={(e) => ipInputChange(e, i)} disabled={!isEditable && requestData}/>
</div>
              <div className="col-md-3">
                <Select
                  name="tsp"
                  placeholder="Select TSP"
                  options={tspdata}
                  value={tspdata.filter((obj) =>
                    IpList[i]?.tsp?.includes(obj?.id)
                  )}
                  isOptionDisabled={(option)=>option.disabled}
                  className="basic-multi-select w-[100%]"
                  classNamePrefix="select"
                  onChange={(e, data) => dropdownChange(e, data, i)}
                  isClearable={true}
                  isDisabled={(!isEditable&&requestData) ||IpList?.length>1}
                />
              </div>

              {!requestData && (
                <div>
                  <div className="flex gap-5">
                    {IpList?.length !== 1 && (
                      <button
                        type="button"
                        className="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        onClick={() => ipRemoveClick(i)}
                      >
                        Remove
                      </button>
                    )}
                    {IpList?.length - 1 === i && (
                      <button
                        type="button"
                        className="text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        onClick={addIpClick}
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

export default IpAddress;
