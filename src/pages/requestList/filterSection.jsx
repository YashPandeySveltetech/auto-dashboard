import React, { useEffect, useState } from "react";
import CommonDropDown from "../../components/dropdown";
import Input from "../../components/input";
import Datepicker from "react-tailwindcss-datepicker";
import { GET_POLICE_STATION_LIST } from "../../utils/constants";
import { ApiHandle } from "../../utils/ApiHandle";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

function FilterSection({
  filter,
  setFilter,
  getAllRequest,
  dateRange,
  setDateRange,
  exportReport,
  clearFilter,
}) {
  const { rank } = useSelector((state) => state.user?.userData);
  const location = useLocation();

  const from_status_option = [
    { id: 1, name: "PENDING", value: "PENDING" },
    { id: 2, name: "APPROVE", value: "APPROVE" },
    { id: 3, name: "REJECT", value: "REJECT" },
  ];
  const req_to_provider_option = [
    { id: 1, name: "CDR", value: "CDR" },
    { id: 2, name: "IPDR", value: "IPDR" },
    { id: 3, name: "TDR", value: "TDR" },
    { id: 4, name: "CAF", value: "CAF" },
  ];
  const target_type_option = [
    { id: 1, name: "MOBILE_NUMBER", value: "MOBILE_NUMBER" },
    { id: 2, name: "IMEI_NUMBER", value: "IMEI_NUMBER" },
    { id: 3, name: "CELL_ID", value: "CELL_ID" },
    { id: 4, name: "IP_ADDRESS", value: "IP_ADDRESS" },
    { id: 5, name: "ILD", value: "ILD" },
  ];
  const [policeStation, setPoliceStation] = useState([]);
  useEffect(() => {
    getPoliceStaionList();
  }, []);
  const getPoliceStaionList = async () => {
    const res = await ApiHandle(`${GET_POLICE_STATION_LIST}`, {}, "GET");
    if (res.statusCode === 200) {
      const data = res?.responsePayload;
      //   setPoliceStationOptions(data);
      // setPoliceStation(data)

      let arr = [];
      if (data.length) {
        for (let i = 0; i <= data.length; i++) {
          arr.push({ ...data[i], ["value"]: data[i]?.id });
        }

        setPoliceStation(arr);
      }

      return;
    }
  };

  const handleValueChange = (newValue) => {
    setDateRange(newValue);
  };
  return (

   
    <div className="inner-div-filter">
      <div className=" flex-flex-row w-[100%]">
        <div className="flex flex-col w-[100%] justify-between p-2 items-center">
          {/* <div>
        <CommonDropDown
          name={"req_to_provider"}
          options={req_to_provider_option}
          onChange={(e) => {
            setFilter({ ...filter, [e.target.name]: e.target.value });
          }}
          label="Request to provider"
        />
      </div> */}
          <div className="w-full flex justify-between gap-4">
            {["/unverified-form", "/rejected-form"].includes(
              location.pathname
            ) ? (
              ""
            ) : (
              <div className="w-full">
                <label htmlFor=""> Form Status</label>
                <CommonDropDown
                  name={"form_status"}
                  options={from_status_option}
                  onChange={(e) => {
                    setFilter({ ...filter, [e.target.name]: e.target.value });
                  }}
                  label=""
                  value={filter["form_status"]}
                />
              </div>
            )}
            <div className="w-full">
              <label htmlFor=""> Select Type</label>
              <CommonDropDown
                name={"target_type"}
                options={target_type_option}
                onChange={(e) => {
                  setFilter({ ...filter, [e.target.name]: e.target.value });
                }}
                label=""
                value={filter["target_type"]}
              />
            </div>
          </div>

          
          <div className="flex w-full justify-between gap-4">
          <div className="w-full">
            <label htmlFor=""> Select Date</label>
           <div className="text-black-900 border border-gray-300 rounded-lg bg-blue-100 focus:ring-blue-500 focus:border-blue-500">
           <Datepicker
              primaryColor={"lightgray"}
              value={dateRange}
              onChange={handleValueChange}
              showShortcuts={true}
              classNames="border border-solid"
            />
           </div>
          </div>
         
            <div className="w-full  ">
            {filter["target_type"] !== "" && (<>
            
              <label htmlFor=""> Select Target Type Value</label>
              <Input
                type="text"
                value={filter["target_type_value"]}
                required={true}
                name="target_type_value"
                onChange={(e) =>
                  setFilter({ ...filter, [e.target.name]: e.target.value })
                }
                className="w-[100%]"
              />
              </>
          )}
            </div>
          </div>
          
     <div>
     <button
            onClick={getAllRequest}
            style={{
              width: "100px",
              border: "2px solid green",
              borderRadius: "20px",
              height: "40px",
              marginTop: "20px",
            }}
            className="m-5 mt-10"
          >
            <b>Search</b>
          </button>
          {["DCP"].includes(rank) && (
            <button
              onClick={exportReport}
              style={{
                width: "100px",
                border: "2px solid green",
                borderRadius: "20px",
                height: "40px",
                marginTop: "20px",
              }}
              className="m-5 mt-10"
              disabled={dateRange?.startDate === ""}
            >
              <b>Export File</b>
            </button>
          )}
            <button
            onClick={clearFilter}
            type="button"
            style={{
              width: "100px",
              border: "2px solid green",
              borderRadius: "20px",
              height: "40px",
              marginTop: "20px",
            }}
            className="m-5 mt-10"
          >
            <b>Clear Filter</b>
          </button>
     </div>
          
        
          {/* <div>
        <Input
          name="case_ref"
          onChange={(e) => {
            setFilter({ ...filter, [e.target.name]: e.target.value });
          }}
          label="FIR NO."
        />
      </div> */}
          {/* <div>
        <Input
          name="case_type"
          onChange={(e) => {
            setFilter({ ...filter, [e.target.name]: e.target.value });
          }}
          label="Case Type"
        />
      </div> */}
        </div>
        <div className="flex w-[100%] justify-between p-5">
          <div>
            {["DCP"].includes(rank) && (
              <CommonDropDown
                name={"police_station"}
                options={policeStation}
                checkId={true}
                onChange={(e) => {
                  setFilter({ ...filter, [e.target.name]: e.target.value });
                }}
                label="Police Station"
              />
            )}
          </div>
       
        </div>
      </div>
    </div>
  );
}

export default FilterSection;
