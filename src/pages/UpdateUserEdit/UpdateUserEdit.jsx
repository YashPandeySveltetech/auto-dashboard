import React, { useEffect, useState } from "react";
import Input from "../../components/input";
import Select from "react-select";
import { ApiHandle } from "../../utils/ApiHandle";
import { REGISTRATION } from "../../utils/constants";
import { useParams } from "react-router-dom";
import Title from "../../utils/Title";

const UpdateUserEdit = () => {
  const { id } = useParams();
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormField({
      ...formField,
      [name]: value,
    });
  };
  const getUser = async () => {
    const res = await ApiHandle(`${REGISTRATION}${id}/`, {}, "GET");
    if (res.statusCode === 200) {
      console.log(res.responsePayload);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <Title text={"Update User Form"} />
      <div className="space-y-4 mx-auto outer-div-whole" style={{padding:"2%"}}>
        <label htmlFor="rank" className="font-bold required block">
          Rank
        </label>
        <Select
          id="rank"
          name="rank"
          options={ranks}
          value={rank}
          onChange={(e) => handleChange(e)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
        />

        <label htmlFor="username" className="font-bold required block">
          Username
        </label>
        <Input
          id="username"
          label=""
          name="username"
          type="text"
          value={formField.username}
          onChange={(e) => handleChange(e)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
        />

        <label htmlFor="mobile_no" className="font-bold required block">
          Mobile
        </label>
        <Input
          id="mobile_no"
          label=""
          name="mobile_no"
          type="number"
          value={formField.mobile}
          onChange={(e) => handleChange(e)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
        />

        <label htmlFor="email" className="font-bold required block">
          Email
        </label>
        <Input
          id="email"
          label=""
          name="email"
          type="email"
          value={formField.email}
          onChange={(e) => handleChange(e)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
        />

        <label htmlFor="district" className="font-bold required block">
          District
        </label>
        <Input
          id="district"
          label=""
          name="district"
          type="text"
          value={formField.district}
          onChange={(e) => handleChange(e)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
      </div>
    </>
  );
};

export default UpdateUserEdit;
