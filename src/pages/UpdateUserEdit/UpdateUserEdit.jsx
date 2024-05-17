import React, { useEffect, useState } from "react";
import Input from "../../components/input";
import Select from "react-select";
import { ApiHandle } from "../../utils/ApiHandle";
import { REGISTRATION } from "../../utils/constants";
import { useParams } from "react-router-dom";
import Title from "../../utils/Title";

import { useDispatch } from "react-redux";
import { PasswordChangeModal } from "../../redux/reducers/modalsReducer";
import { setLoading } from "../../redux/reducers/commonReducer";
import Toaster from "../../utils/toaster/Toaster";

const UpdateUserEdit = () => {
  const dispatch = useDispatch();
  // const openModal =
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
    dispatch(setLoading(true));
    const res = await ApiHandle(`${REGISTRATION}${id}/`, {}, "GET");
    if (res.statusCode === 200) {
      dispatch(setLoading(false));

      console.log(res.responsePayload);
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
      Toaster("success","Update Successfully")
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <Title text={"Update User Form"} />
      <div
        className="space-y-4 mx-auto outer-div-whole"
        style={{ padding: "2%" }}
      >
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
        <div className="flex justify-around">
          <button
            type="button"
            className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 shadow-lg transition duration-300"
            onClick={() => dispatch(PasswordChangeModal(true))}
          >
            Change Password
          </button>
          <button
            type="button"
            className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 shadow-lg transition duration-300"
            onClick={updateInfo}
          >
            Update
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateUserEdit;
