import React, { useEffect, useState } from "react";
import Input from "../../components/input";
import Select from "react-select";

const UpdateUserEdit = () => {
  const [formField, setFormField] = useState({
    email: "",
    username: "",
    mobile: "",
  });
  const ranks = [
    { value: "SHO", label: "SHO" },
    { value: "DCP", label: "DCP" },
    { value: "ACP", label: "ACP" },
  ];
  const [rank, setRank] = useState("");
const handleChange=(e)=>{
const {name, value}=e.target
console.log(name, value)
setFormField({
...formField,
[name]:value
})
}
  useEffect(() => {

  });
  return (
    <div>
      <h1>Update User Form</h1>
      <label htmlFor="" className="font-bold required">
        Rank
      </label>
      <Select
        name="rank"
        options={ranks}
        //  value={requestprovide?.filter((obj) =>
        //    MobileList[i]?.request_to_provide?.includes(obj?.id)
        //  )}
        value={rank}
        onChange={(e) => handleChange(e)}
        // disabledSelect={!isEditable && requestData}
      />
      <label htmlFor="" className="font-bold required">
        Username
      </label>
      <Input
        label={""}
        name="username"
        type="text"
        value={formField.username}
        onChange={(e) => handleChange(e)}
        // disabledSelect={!isEditable && requestData}
      />
      <label htmlFor="" className="font-bold required">
        Mobile
      </label>
      <Input
        label={""}
        name="mobile_no"
        type="number"
        value={formField.mobile}
        onChange={(e) => handleChange(e)}
        // disabledSelect={!isEditable && requestData}
      />
      <label htmlFor="" className="font-bold required">
        Email
      </label>
      <Input
        label={""}
        name="email"
        type="email"
        value={formField.email}
        onChange={(e) => handleChange(e)}
        // disabledSelect={!isEditable && requestData}
      />
    </div>
  );
};

export default UpdateUserEdit;
