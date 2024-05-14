import React, { useEffect, useState } from "react";
import Input from "../../components/input";
import Select from "react-select";
import { ApiHandle } from "../../utils/ApiHandle";
import { REGISTRATION } from "../../utils/constants";
import { useParams } from "react-router-dom";

const UpdateUserEdit = () => {
  const { id } = useParams();
  const [formField, setFormField] = useState({
    email: "",
    username: "",
    mobile: "",
  });
  const [modal, setModal] = useState(false);
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
      setFormField({
        email: res.responsePayload.email,
        username: res.responsePayload.username,
        mobile: res.responsePayload.mobile_no,
      });
    }
  };
  const updateInfo = async () => {
    const res = await ApiHandle(
      `${REGISTRATION}${id}/`,
      { username: formField.username },
      "PATCH"
    );
    if (res.statusCode === 200) {
      setFormField({
        email: res.responsePayload.email,
        username: res.responsePayload.username,
        mobile: res.responsePayload.mobile_no,
      });
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div>
      <h1>Update User Form</h1>
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
      <div className="flex justify-around">
        <button type="button" onClick={() => setModal(true)}>
          change password
        </button>
        <button type="button" onClick={updateInfo}>
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdateUserEdit;
