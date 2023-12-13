import React, { useCallback, useState } from "react";
import DropDown from "../../components/dropdown";
import Input from "../../components/input";
import Radio from "../../components/radio";

function IPDRform() {
  const [activeForm, setActiveForm] = useState("");
  const [ipdrMobileList, setipdrMobileList] = useState([
    {
      date_from: "",
      date_to: "",
      time_from: "",
      time_to: "",
      mobile_number: "",
    },
  ]);

 

  const ipdrInputChange = (e, index) => {
    const { name, value } = e.target;

    const list = [...ipdrMobileList];
    list[index][name] = value;
    setipdrMobileList(list);
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
    },
  ]);


  const ipdrhandleInput = (e, index) => {
    const { name, value } = e.target;

    const list = [...ipdrImeiList];
    list[index][name] = value;
    setipdrImeiList(list);
  };

  const ipdrImeiAdd = () => {
    setipdrImeiList([
      ...ipdrImeiList,
      {
        mobile_number: "",
        date_from: "",
        date_to: "",
        time_from: "",
        time_to: "",
      },
    ]);
  };

  const handleRemoveImei = (index) => {
    const list = [...ipdrImeiList];
    list.splice(index, 1);
    setipdrImeiList(list);
  };


  const [ipdrReverseIpList, setIpdrReverseIpList] = useState([
    {
      ip: "",
      port: "",
      date: "",
      time: "",
    },
  ]);

  const [ipdrReverseIpModel, setIpdrReverseIpModel] = useState({
    // case_ref: "",
    ip_port: ipdrReverseIpList,
    // mobile_number: "",
  });

  const ipdrReverseIpInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...ipdrReverseIpList];
    list[index][name] = value;
    setIpdrReverseIpList(list);
  };

  const ipdrAddReverseIpClick = () => {
    setIpdrReverseIpList([
      ...ipdrReverseIpList,
      {
        ip: "",
        port: "",
        date: "",
        time: "",
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
              onChange={(e) => ipdrInputChange(e, i)}
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
                  <Input label={" "} type="date" />
                </div>
              </div>
              <div className="col-md-3 ms-4">
                <div className="w-15  input-group flex items-center gap-3">
                  <span className="input-group-text font-bold">To</span>
                  <Input label={" "} type="date" />
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
                  <Input label={" "} type="time" name="time_from" />
                </div>
              </div>
              <div className="col-md-3 ms-4">
                <div className="flex items-center gap-3 ">
                  <span className="input-group-text font-bold">To</span>
                  <Input label={" "} type="time" name="time_to" />
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <select
                name="select_tsp"
                //   onChange={handleChange}
                className="form-control col-md-4"
                required
              >
                <option value="select " className="text-uppercase">
                  Select TSP
                </option>
                {/* {getTSPList.map((tspVal) => {
                        return (
                          <option
                            key={tspVal?.id}
                            value={tspVal?.id}
                            className="text-uppercase"
                            required
                          >
                            {tspVal?.name}
                          </option>
                        );
                      })} */}
              </select>
            </div>

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
            <Input label={"IMEI "} />

            {/* CDR DATE TIME */}
            {/* date  */}
            <div className="input-group flex items-center justify-start gap-5 m-3">
              <label className="form-label me-4 col-md-1 font-bold">
                Date :
              </label>

              <div className=" flex gap-5">
                <div className="w-15  input-group flex items-center gap-3">
                  <span className="input-group-text font-bold">From</span>
                  <Input label={" "} type="date" />
                </div>
              </div>
              <div className="col-md-3 ms-4">
                <div className="w-15  input-group flex items-center gap-3">
                  <span className="input-group-text font-bold">To</span>
                  <Input label={" "} type="date" />
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
                  <Input label={" "} type="time" name="time_from" />
                </div>
              </div>
              <div className="col-md-3 ms-4">
                <div className="flex items-center gap-3 ">
                  <span className="input-group-text font-bold">To</span>
                  <Input label={" "} type="time" name="time_to" />
                </div>
              </div>
              <div className="col-md-3">
                <select
                  name="select_tsp"
                  //   onChange={handleChange}
                  className="form-control col-md-4"
                  required
                >
                  <option value="select " className="text-uppercase">
                    Select TSP
                  </option>
                  {/* {getTSPList.map((tspVal) => {
                        return (
                          <option
                            key={tspVal?.id}
                            value={tspVal?.id}
                            className="text-uppercase"
                            required
                          >
                            {tspVal?.name}
                          </option>
                        );
                      })} */}
                </select>
              </div>
            </div>

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
          </div>
        </>
      ))}
    </>
  );

 const ReverseIp=()=>(
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
            
              <Input label={" "} type="text" />
            </div>
            <div className="flex items-center gap-3">
            <label className="form-label me-4 col-md-1 font-bold">
            Port
          </label>
              <Input label={" "} type="text" name="port" />
            </div>
          </div>
        
        <Input label={"Mobile "} />
        </div>

      
        {/* date  */}
        <div className="input-group flex items-center justify-start gap-5 m-3">
          <label className="form-label me-4 col-md-1 font-bold">
            Date
          </label>

          <div className=" flex gap-5">
            <div className="w-15  input-group flex items-center gap-3">
            
              <Input label={" "} type="date" />
            </div>
            <div className="flex items-center gap-3">
            <label className="form-label me-4 col-md-1 font-bold">
            Time
          </label>
              <Input label={" "} type="time" name="time_from" />
            </div>
          </div>
          <div className="col-md-3">
              <select
                name="select_tsp"
                //   onChange={handleChange}
                className="form-control col-md-4"
                required
              >
                <option value="select " className="text-uppercase">
                  Select TSP
                </option>
                {/* {getTSPList.map((tspVal) => {
                        return (
                          <option
                            key={tspVal?.id}
                            value={tspVal?.id}
                            className="text-uppercase"
                            required
                          >
                            {tspVal?.name}
                          </option>
                        );
                      })} */}
              </select>
            </div>
        
        </div>
    

      

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
      </div>
    </>
  ))}
</>
 )

  return (
    <div>
       <div className="radioselect">
        <label className="form-label me-4 font-bold">Target Type :</label>
        <div className="flex gap-5">
          <Radio
            value={"MOBILE_NUMBER" == activeForm}
            label="MOBILE_NUMBER"
            name="target_type"
            id="target_type"
            handleChange={() => {
              setActiveForm("MOBILE_NUMBER");
            }}
          />{" "}
          <Radio
            value={"IMEI_NUMBER" == activeForm}
            label="IMEI_NUMBER"
            name="target_type"
            id="target_type"
            handleChange={() => {
              setActiveForm("IMEI_NUMBER");
            }}
          />
          <Radio
            value={"IP_ADDRESS" == activeForm}
            label="Reverse IP Addres"
            name="target_type"
            id="target_type"
            handleChange={() => {
              setActiveForm("IP_ADDRESS");
            }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        {activeForm === "MOBILE_NUMBER"
          ? Mobile()
          : activeForm === "IMEI_NUMBER"
          ? IMEI()
          : activeForm === "IP_ADDRESS"? ReverseIp(): ""}
      </div>
     </div>
  )
}

export default IPDRform