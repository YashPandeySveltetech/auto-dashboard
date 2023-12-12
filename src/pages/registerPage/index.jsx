// RegistrationPage.js
import React, { useState } from "react";
// import axios from "axios";
import Input from "../../components/input"; // Adjust the path based on your file structure
import DropDown from "../../components/dropdown";
import { REGISTRATION } from "../../utils/constants";
import { ApiHandle } from "../../utils/ApiHandle";
import Toaster from "../../utils/toaster/Toaster";

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    mobile_no: "",
    password: "",
    email: "",
    rank: "SHO",
    is_active: false,
    user_profile: {
      id: "",
      user: "",
      reporting_to: "",
      district: "",
      state: "",
      police_station: "",
    },
  });
  const [districtOptions, setDistrictOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [policeStationOptions, setPoliceStationOptions] = useState([]);
  const [reportingToOptions, setReportingToOptions] = useState([]);

  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleUserProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      user_profile: {
        ...formData.user_profile,
        [name]: value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    let payload = {
      //   email: user.email,
      //   password: user.password,
    };
    const res = await ApiHandle(REGISTRATION, payload, "POST");
    if (res.statusCode === 200) {
      //   const token = res?.responsePayload?.data?.accessToken;
      Toaster("success", "User Registered Successfully!");

      return;
    }

    // try {
    //   const response = await axios.post("YOUR_API_ENDPOINT", formData);
    //   console.log("Registration successful:", response.data);
    // } catch (error) {
    //   console.error("Registration failed:", error.message);
    // } finally {
    //   setSubmitting(false);
    // }
  };

  //   useEffect(() => {
  //     fetch("API_ENDPOINT_1")
  //       .then((response) => response.json())
  //       .then((data) => setDistrictOptions(data));

  //     fetch("API_ENDPOINT_2")
  //       .then((response) => response.json())
  //       .then((data) => setStateOptions(data));

  //     fetch("API_ENDPOINT_3")
  //       .then((response) => response.json())
  //       .then((data) => setPoliceStationOptions(data));

  //     fetch("API_ENDPOINT_4")
  //       .then((response) => response.json())
  //       .then((data) => setReportingToOptions(data));
  //   }, []);

  const rankOptions = ["INSPECTOR", "SHO", "ACP", "DCP"];

  return (
    <div className="min-h-screen flex items-center justify-center custom-background">
      <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-96 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Registration Page</h1>

        <form
          onSubmit={handleSubmit}
          className="w-full overflow-y-scroll h-[30rem] p-2"
        >
          <Input
            label="Username"
            type="text"
            name="username"
            onChange={handleInputChange}
            value={formData.username}
            maxLength={250}
            minLength={1}
          />

          <Input
            label="Mobile Number"
            type="text"
            name="mobile_no"
            onChange={handleInputChange}
            value={formData.mobile_no}
            maxLength={20}
            minLength={1}
            pattern="^\+?1?\d{9,15}$"
          />

          <Input
            label="Password"
            type="password"
            name="password"
            onChange={handleInputChange}
            value={formData.password}
            minLength={6}
          />

          <Input
            label="Email"
            type="email"
            name="email"
            onChange={handleInputChange}
            value={formData.email}
            maxLength={250}
            minLength={1}
          />

          <DropDown
            label="Rank"
            options={rankOptions}
            onChange={handleInputChange}
            value={formData.rank}
          />

          <label className="mb-4 flex gap-5 items-center mt-4">
            <span className="text-sm font-medium text-gray-900 ">
              Is Active:
            </span>

            <input
              type="checkbox"
              name="is_active"
              className=" accent-blue-500  h-4 w-4 cursor-pointer  rounded-md border "
              //   className=" "
              checked={formData.is_active}
              onChange={() =>
                setFormData({
                  ...formData,
                  is_active: !formData.is_active,
                })
              }
            />
          </label>
          <div className="mt-2">
            <label className="text-[16px] font-bold mb-4">User Profile</label>

            <Input
              label="User"
              type="text"
              name="user_profile.user"
              onChange={handleUserProfileChange}
              value={formData.user_profile.user}
            />
            <DropDown
              label="Reporting To"
              options={reportingToOptions}
              onChange={handleUserProfileChange}
              value={formData.user_profile.reporting_to}
            />
            <DropDown
              label="District"
              options={districtOptions}
              onChange={handleUserProfileChange}
              value={formData.user_profile.district}
            />

            <DropDown
              label="State"
              options={stateOptions}
              onChange={handleUserProfileChange}
              value={formData.user_profile.state}
            />

            <DropDown
              label="Police Station"
              options={policeStationOptions}
              onChange={handleUserProfileChange}
              value={formData.user_profile.police_station}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full p-2.5 mb-4 border border-gray-300 text-gray-900 rounded-lg bg-blue-500  cursor-pointer mt-4"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
