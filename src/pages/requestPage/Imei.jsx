import React, { useEffect } from "react";
import Input from "../../components/input";
import Select from "react-select";

function Imei({
  requestData,
  ImeiList,
  setImeiList,
  activeForm,
  requestprovide,
  tspdata,
  isEditable,
  firType,
  apiPayload,
  setApiPayload,
  caseType,
  handleChange,
  isother
}) {
  const ImeiInputChange = (e, index) => {
    const { name, value,checked } = e.target;

    const list = [...ImeiList];
    list[index][name] = name=="till_date"?checked: value;;
    list[index]["target_type"] = activeForm?.target_type_id;
    setImeiList(list);
  };

  const AddImeiClick = () => {
    setImeiList([
      ...ImeiList,
      {
        imei: "",
        date_from: "",
        date_to: "",
        time_from:"00:00",
        time_to:"00:00",
        till_date:false,
        target_type: activeForm?.target_type_id,
        request_to_provide: ImeiList[0].request_to_provide,
        tsp:ImeiList[0].tsp,
        fir_or_complaint:"",
        fir_no: "",
        case_type: "",
      },
    ]);
  };
  // useEffect(()=>{
  //   if(requestData && Object.keys(requestData?.form_request_for).includes("imei_number")){
  //     setImeiList(requestData?.form_request_for?.imei_number
  //       )
  //   }
  //    },[requestData])
  const ImeiRemoveClick = (index) => {
    const list = [...ImeiList];
    list.splice(index, 1);
    setImeiList(list);
  };

  const dropdownChange = (e, data, index) => {
    const list = [...ImeiList];
    list[index][data?.name] = e?.length > 0 ? e?.map((i) => i.id) :(e===null)?[]: e.value==="ALL"?e.id:["fir_or_complaint","case_type"].includes(data?.name)?e.value:[e.id];
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
                  disabledSelect={!isEditable&&requestData}
                  className="w-[100%]"
                />
              </div>

              <div className="flex justify-start items-center gap-5">
                <label htmlFor="">Request to provide</label>
                <Select
                  
                  name="request_to_provide"
                  options={requestprovide}
                  value={requestprovide?.filter((obj) =>
                    ImeiList[i]?.request_to_provide?.includes(obj?.id)
                  )}
                  
                  className="basic-multi-select w-[50%]"
                  classNamePrefix="select"
                  onChange={(e, data) => dropdownChange(e, data, i)}
                />
              </div>
            </div>
            <>  <div className="">
              <label className="font-bold required">Choose Type:</label>
              <div className="flex  gap-2">
                <Select
                  name="fir_or_complaint"
                  options={firType}
                  value={firType?.filter((obj) =>
                    ImeiList[i]?.fir_or_complaint==obj.value
                  )}
                  className="basic-multi-select w-[30%]"
                  classNamePrefix="select"
                  onChange={(e, data) => dropdownChange(e, data, i)}
                  isSearchable={false}
                  isDisabled={!isEditable && requestData}
                />
             
                {/* {isother && (
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
                )} */}
                <Input
                  type="text"
                  name="fir_no"
                  required
                  placeholder={"Enter fir No"}
                  onChange={(e) => ImeiInputChange(e, i)}
                  value={val.fir_no}
                  disabledSelect={!isEditable && requestData}
                />
              </div>
            </div>

            <div>
              <label className="font-bold required">Case Type:</label>
              <Select
                name="case_type"
                options={caseType}
                value={caseType?.filter(
                  (obj) => ImeiList[i]?.case_type==obj.value
                )}
                className="basic-multi-select w-[50%]"
                classNamePrefix="select"
                onChange={(e, data) => dropdownChange(e, data, i)}
                isDisabled={!isEditable && requestData}
                required
              />
            </div>
            </>
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
                    disabledSelect={!isEditable&&requestData}
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
                      onChange={(e) => ImeiInputChange(e, i)}
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
                      onChange={(e) => ImeiInputChange(e, i)}
                      disabledSelect={!isEditable&&requestData}
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-5 ">
<label className="form-label me-5 col-md-1 font-bold">
                Till Date :
              </label>
  <input type="checkbox" name="till_date" id="" checked={val?.till_date} onChange={(e) => ImeiInputChange(e, i)}/>
</div>
              <div className="col-md-3">
                <Select
                  
                  name="tsp"
                  placeholder="Select TSP"
                  options={tspdata}
                  value={tspdata?.filter((obj) =>
                    ImeiList[i]?.tsp?.includes(obj?.id)
                  )}
                  isOptionDisabled={(option)=>option.disabled}
                  className="basic-multi-select w-[100%]"
                  classNamePrefix="select"
                  onChange={(e, data) => dropdownChange(e, data, i)}
                  isClearable={true}
                  isDisabled={!isEditable&&requestData}
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
