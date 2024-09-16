import React, {useEffect} from "react";
import Input from "../../components/input";
import Select from "react-select";

function Mobile({
  requestData,
  MobileList,
  setMobileList,
  activeForm,
  tspdata,
  requestprovide,
  isEditable,
}) {
  const mobileInputChange = (e, index) => {
    const {name, value, checked} = e.target;
    const list = [...MobileList];

    if (name === "till_date") {
      list[index][name] = checked; // For checkboxes, set checked value
    } else if (name === "mobile_number") {
      if (value.length <= 10) {
        list[index][name] = value; // Set mobile number if length is <= 10
      } else {
        return; // Prevent adding more than 10 digits
      }
    } else {
      list[index][name] = value; // For other fields, set the value
    }

    list[index]["target_type"] = activeForm?.target_type_id;

    setMobileList(list); // Update the list in state
  };

  const dropdownChange = (e, data, index) => {
    const list = [...MobileList];
    console.log(e[index]?.id, list, "list");

    if (e[index]?.id === "ALL") {
      list[index][data?.name] = [1, 3, 4];
    } else {
      list[index][data?.name] =
        e?.length > 0
          ? e?.map((i) => i.id)
          : e?.length === 0
          ? []
          : e.value === "ALL"
          ? e.id
          : [e.id];
    }
    setMobileList(list);
  };
  //  useEffect(()=>{
  // if(requestData&& Object.keys(requestData?.form_request_for).includes("multiple_mobile")){
  //   setMobileList(requestData?.form_request_for?.multiple_mobile
  //     )
  // }
  //  },[requestData])

  const addMobileClick = () => {
    setMobileList([
      ...MobileList,
      {
        date_from: null,
        date_to: null,
        time_from: "00:00",
        time_to: "00:00",
        mobile_number: "",
        till_date: false,
        tsp: MobileList[0]?.tsp,
        target_type: activeForm?.target_type_id,
        request_to_provide: MobileList[0].request_to_provide,
      },
    ]);
  };

  const removeMobileClick = (index) => {
    const list = [...MobileList];
    list.splice(index, 1);
    setMobileList(list);
  };
  const clearHandle = () => {
    setMobileList([]);
  };
  function check() {
    var mobile = document.getElementById("mobile");

    var message = document.getElementById("message");

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

  return (
    <>
      {MobileList?.map((val, i) => (
        <div
          className="shadow-lg shadow-gray-500/50 p-5 "
          style={{background: "#FFFAFA", border: ""}}
          key={i}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 items-center">
            <div className="col">
              <label htmlFor="" className="font-bold required">
                Mobile
              </label>
              <Input
                type="number"
                value={val?.mobile_number}
                name="mobile_number"
                onChange={(e) => mobileInputChange(e, i)}
                disabledSelect={!isEditable && requestData}
                className="w-full"
                min={10}
                maxLength="10"
                inputMode="numeric"
                id="mobile"
                onKeyUp={check}
                required={true}
              />
              <span id="message"></span>
            </div>

            <div className="flex justify-start flex-col flex-wrap">
              <label className="font-bold required" htmlFor="">
                Request to provide
              </label>
              <Select
                name="request_to_provide"
                options={requestprovide}
                value={requestprovide?.filter((obj) =>
                  MobileList[i]?.request_to_provide?.includes(obj?.id)
                )}
                className="basic-multi-select !w-[100%] sm:w-[50%]"
                classNamePrefix="select"
                onChange={(e, data) => dropdownChange(e, data, i)}
                isDisabled={!isEditable && requestData}
              />
            </div>
          </div>

          <div className=" flex flex-col md:flex-row mt-6 flex-wrap justify-between">
            <div className="">
              <label className="form-label mb-2 font-bold">Select Date:</label>
              <div className="flex items-center justify-between w-full flex-col md:flex-row md:w-96 gap-y-4 flex-wrap">
                <div className="flex items-center w-48 justify-between ">
                  <span className="font-bold">From</span>
                  <Input
                    label={""}
                    name="date_from"
                    type="date"
                    value={val.date_from}
                    onChange={(e) => mobileInputChange(e, i)}
                    disabledSelect={!isEditable && requestData}
                  />
                </div>
                <div className="flex items-center pl-5 w-48 justify-between">
                  <span className="input-group-text font-bold">To</span>
                  <Input
                    label={""}
                    name="date_to"
                    type="date"
                    value={val.date_to}
                    onChange={(e) => mobileInputChange(e, i)}
                    disabledSelect={!isEditable && requestData}
                  />
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 flex  flex-wrap flex-col md:flex-row items-start md:items-center">
              <label className="form-label mr-4 font-bold">Time:</label>
              <div className="flex items-center justify-between w-full md:w-96 flex-wrap gap-y-4 flex-col md:flex-row">
                <div className="flex items-center w-48 justify-between">
                  <span className="font-bold">From</span>
                  <Input
                    label={""}
                    type="time"
                    name="time_from"
                    value={val.time_from}
                    onChange={(e) => mobileInputChange(e, i)}
                    disabledSelect={!isEditable && requestData}
                  />
                </div>
                <div className="flex items-center pl-5 w-48 justify-between">
                  <span className="input-group-text font-bold">To</span>
                  <Input
                    label={""}
                    type="time"
                    name="time_to"
                    value={val.time_to}
                    onChange={(e) => mobileInputChange(e, i)}
                    disabledSelect={!isEditable && requestData}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 items-center mt-4">
            <div className="flex items-center gap-3 ">
              <label className="form-label me-4 font-bold">Date:</label>
              <div></div>
              <div className="flex gap-4 flex-wrap">
                <div className="w-full sm:w-auto input-group flex items-center gap-3">
                  <span className="input-group-text font-bold">From</span>
                  <Input
                    label={" "}
                    name="date_from"
                    type="date"
                    value={val.date_from}
                    onChange={(e) => mobileInputChange(e, i)}
                    disabledSelect={!isEditable && requestData}
                  />
                </div>
                <div className="w-full sm:w-auto input-group flex items-center gap-3">
                  <span className="input-group-text font-bold">to</span>
                  <Input
                    label={" "}
                    name="date_to"
                    type="date"
                    value={val.date_to}
                    onChange={(e) => mobileInputChange(e, i)}
                    disabledSelect={!isEditable && requestData}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <label className="form-label me-4 font-bold">Time:</label>

              <div className="flex gap-4 flex-wrap">
                <div className="w-full sm:w-auto md-auto md-columns2 input-group flex items-center gap-3">
                  <span className="input-group-text font-bold">From</span>
                  <Input
                    label={" "}
                    type="time"
                    name="time_from"
                    value={val.time_from}
                    onChange={(e) => mobileInputChange(e, i)}
                    disabledSelect={!isEditable && requestData}
                  />
                </div>
                <div className="w-full sm:w-auto input-group flex items-center gap-3">
                  <span className="input-group-text font-bold">To</span>
                  <Input
                    label={" "}
                    type="time"
                    name="time_to"
                    value={val.time_to}
                    onChange={(e) => mobileInputChange(e, i)}
                    disabledSelect={!isEditable && requestData}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-5 items-center mt-4">
            <label className="form-label me-4 font-bold">Till Date :</label>
            <input
              type="checkbox"
              name="till_date"
              id=""
              checked={val?.till_date}
              onChange={(e) => mobileInputChange(e, i)}
              disabled={!isEditable && requestData}
            />
          </div> */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-4 items-end">
            <div className="flex gap-5 items-center mt-4">
              <label className="form-label me-4 font-bold">Till Date :</label>
              <input
                type="checkbox"
                name="till_date"
                id=""
                checked={val?.till_date}
                onChange={(e) => mobileInputChange(e, i)}
                disabled={!isEditable && requestData}
              />
            </div>
            <div>
              <label className="font-bold">Select TSP</label>
              <Select
                name="tsp"
                placeholder="Select TSP"
                options={tspdata}
                // value={[{id:1,label:"AIRTEL"}]}
                value={tspdata?.filter((obj) =>
                  MobileList[i]?.tsp?.includes(obj?.id)
                )}
                isOptionDisabled={(option) => option.disabled}
                className="basic-multi-select w-full"
                classNamePrefix="select"
                onChange={(e, data) => dropdownChange(e, data, i)}
                isDisabled={!isEditable && requestData}
                isClearable={true}
                required
                isMulti={true}
              />
              {console.log(MobileList, "list")}
            </div>
            {!requestData || isEditable ? (
              <div className="flex gap-5 mt-4 sm:mt-0 justify-start align-end">
                {MobileList.length !== 1 && (
                  <button
                    type="button"
                    className="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 focus:outline-none "
                    onClick={() => removeMobileClick(i)}
                    style={{height: "2.5rem"}}
                  >
                    Remove
                  </button>
                )}
                {MobileList.length - 1 === i && (
                  <button
                    type="button"
                    className="text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 focus:outline-none "
                    onClick={addMobileClick}
                    style={{height: "2.5rem"}}
                  >
                    Add New Form
                  </button>
                )}
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </>
  );
}

export default Mobile;
