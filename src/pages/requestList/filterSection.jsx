/** @format */

import React, { useEffect, useState } from "react";
import CommonDropDown from "../../components/dropdown";
import Input from "../../components/input";
import Datepicker from "react-tailwindcss-datepicker"; 
import {  GET_POLICE_STATION_LIST } from "../../utils/constants";
import { ApiHandle } from "../../utils/ApiHandle";


function FilterSection({ filter, setFilter, getAllRequest,dateRange,setDateRange }) {

  const from_status_option = [
    { id: 1, name: "PENDING", value: "PENDING" },
    { id: 2, name: "APPROVE", value: "APPROVE" },
    { id: 3, name: "REJECT", value: "REJECT" },
  ];
  const req_to_provider_option = [
    { id: 1, name: "CDR", value: "CDR" },
    { id: 2, name: "IPDR", value: "IPDR" },
    { id: 3, name: "TDR", value: "TDR" },
    { id: 3, name: "CAF", value: "CAF" },
  ];
  const [policeStation,setPoliceStation]=useState([])
// useEffect(()=>{
    
// },[])

useEffect(() => {
    getPoliceStaionList();
}, []);
const getPoliceStaionList = async () => {
    const res = await ApiHandle(`${GET_POLICE_STATION_LIST}`, {}, "GET");
    if (res.statusCode === 200) {
      const data = res?.responsePayload;
    //   setPoliceStationOptions(data);
    // setPoliceStation(data)
    // console.log(data,'dddddddddddddddddddddd');
   let arr=[]
    if(data.length){
        for(let i=0;i<=data.length;i++){
// console.log(data[i]);
arr.push({...data[i],['value']:data[i]?.id})
        }
        console.log(arr,'aaaaaaaaaaa');
        setPoliceStation(arr)
    }
  
      return;
    }
  };

const handleValueChange = newValue => {
    console.log("newValue:", newValue);
    setDateRange(newValue);
};
// console.log(value);
  return (
    <div className="flex">
        <div className="flex flex-col w-[90%]">
    <div className="flex w-[100%] justify-between p-5">
      <div>
        <CommonDropDown
          name={"req_to_provider"}
          options={req_to_provider_option}
          onChange={(e) => {
            setFilter({ ...filter, [e.target.name]: e.target.value });
          }}
          label="Request to provider"
        />
      </div>
      <div>
        <CommonDropDown
          name={"form_status"}
          options={from_status_option}
          onChange={(e) => {
            setFilter({ ...filter, [e.target.name]: e.target.value });
          }}
          label="Form Status"
        />
      </div>
      <div>
        <Input
          name="case_ref"
          onChange={(e) => {
            setFilter({ ...filter, [e.target.name]: e.target.value });
          }}
          label="FIR NO."
        />
      </div>
      <div>
        <Input
          name="case_type"
          onChange={(e) => {
            setFilter({ ...filter, [e.target.name]: e.target.value });
          }}
          label="Case Type"
        />
      </div>
     
    </div>
    <div className="flex w-[100%] justify-between p-5">
      <div className="w-[50%]" >
      <Datepicker 
primaryColor={"blue"} 
value={dateRange} 
onChange={handleValueChange} 
showShortcuts={true} 
/> 
      </div>
      <div>
        <CommonDropDown
          name={"police_station"}
          options={policeStation}
          checkId={true}
          onChange={(e) => {console.log(e.target.value,'------');
            setFilter({ ...filter, [e.target.name]: e.target.value });
          }}
          label="Form Status"
        />
      </div>
      {/* <div>
        <Input
          name="case_ref"
          onChange={(e) => {
            setFilter({ ...filter, [e.target.name]: e.target.value });
          }}
          label="FIR NO."
        />
      </div>
      <div>
        <Input
          name="case_type"
          onChange={(e) => {
            setFilter({ ...filter, [e.target.name]: e.target.value });
          }}
          label="Case Type"
        />
      </div> */}
     {}
    </div>
</div>
     <button
     onClick={getAllRequest}
     style={{width:"100px", border:"2px solid green",borderRadius:"20px",height:"40px",marginTop:"20px"}}
     className="m-5 mt-10"
   >
     <b>Search</b>
   </button>
   </div>
  );
}

export default FilterSection;
