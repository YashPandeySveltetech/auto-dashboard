import React from "react";
import Input from "../../components/input";
import Select from "react-select";


function Mobile({ requestData, MobileList, setMobileList,activeForm,tspdata,requestprovide }) {
  const mobileInputChange = (e, index) => {
    const { name, value } = e?.target;
    const list = [...MobileList];
    console.log(MobileList,"list")
    list[index][name] = value;
    list[index]["target_type"]=activeForm?.target_type_id
 
    setMobileList(list);
  };
  // const dropdownChange = (e, data, index) => {
  //   const list = [...MobileList];
  //   list[index][data?.name] = e?.length > 0 ? e?.map((i) => i.id) : e?.id;
  //   setMobileList(list);
  // };
 

  // const addMobileClick = () => {
  //   setMobileList([
  //     ...MobileList,
  //     {
  //       date_from: "",
  //       date_to: "",
  //       time_from: "",
  //       time_to: "",
  //       mobile_number: "",
  //       tsp: "",
  //       target_type: activeForm?.target_type,
  //       request_to_provide: "",
  //     },
  //   ]);
  // };
  // const removeMobileClick = (index) => {
  //   const list = [...MobileList];
  //   list.splice(index, 1);
  //   setMobileList(list);
  // };
  // const clearHandle=()=>{
  //   setMobileList([])
  // }


  return (
    <>
      {MobileList?.multiple_mobile?.map((val, i) => (
        <>
          <div
            className="shadow-lg shadow-cyan-500/50 p-5"
            style={{ background: "#FFFAFA" }}
            key={i}
          >
            <div className="grid grid-flow-col gap-4  items-center">
              <div className="col">
                <Input
                  label={"Mobile "}
                  type="text"
                  value={val.mobile_number}
                  name="mobile_number"
                  onChange={(e) => mobileInputChange(e, i)}
                  disabledSelect={requestData}
                  className="w-[100%]"
                />
              </div>

              <div className="flex justify-start items-center gap-5">
                <label htmlFor="">Request to provide</label>
                {/* <Select
                  isMulti
                  name="request_to_provide"
                  options={requestprovide}
                  value={requestprovide?.filter((obj) =>
                    MobileList[i]?.request_to_provide?.includes(obj?.id)
                  )}
                  className="basic-multi-select w-[50%]"
                  classNamePrefix="select"
                  onChange={(e, data) => dropdownChange(e, data, i)}
                /> */}
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
                    onChange={(e) => mobileInputChange(e, i)}
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
                    onChange={(e) => mobileInputChange(e, i)}
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
                      onChange={(e) => mobileInputChange(e, i)}
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
                      onChange={(e) => mobileInputChange(e, i)}
                      disabledSelect={requestData}
                    />
                  </div>
                </div>
              </div>

              <div className="col">
                {/* <Select
                  isMulti
                  name="tsp"
                  placeholder="Select TSP"
                  options={tspdata}
                  value={tspdata.filter((obj) =>
                    MobileList[i]?.tsp?.includes(obj?.id)
                  )}
                  className="basic-multi-select w-[100%]"
                  classNamePrefix="select"
                  onChange={(e, data) => dropdownChange(e, data, i)}
                /> */}
            
              </div>

              {/* {!requestData && (
                <div>
                  <div className="flex gap-5">
                    {MobileList.length !== 1 && (
                      <button
                        type="button"
                        className="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        onClick={() => removeMobileClick(i)}
                      >
                        Remove
                      </button>
                    )}
                    {MobileList.length - 1 === i && (
                      <button
                        type="button"
                        className="text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        onClick={addMobileClick}
                      >
                        Add
                      </button>
                    )}
                  </div>
                </div>
              )} */}
            
            </div>
          </div>
          <hr className="font-bold" />
        </>
      ))}
      {/* {      <button
                        type="button"
                        className="text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        onClick={MobileList?.length>0?clearHandle:addMobileClick}
                      >
                      {MobileList?.length>0?"Clear":"Add"}
                      </button>} */}
    </>
  );
}

export default Mobile;
