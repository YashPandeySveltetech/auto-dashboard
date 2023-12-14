/** @format */

import React from "react";
import CommonDropDown from "../../components/dropdown";
import Input from "../../components/input";

function FilterSection({ filter, setFilter, getAllRequest }) {
  console.log(filter, "filter");
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
  return (
    <div className="flex justify-between p-5">
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
      <button
        onClick={getAllRequest}
		style={{width:"100px", border:"2px solid green",borderRadius:"20px",height:"40px",marginTop:"20px"}}
      >
        <b>Search</b>
      </button>
    </div>
  );
}

export default FilterSection;
