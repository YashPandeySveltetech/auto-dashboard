import React, { useEffect, useState } from "react";
import Input from "../../components/input";
import DropDown from "../../components/dropdown";
import {
  GET_DISTRICT,
  GET_POLICE_STATION_LIST,
  GET_STATES,
  REGISTRATION,
} from "../../utils/constants";
import { ApiHandle } from "../../utils/ApiHandle";
import Toaster from "../../utils/toaster/Toaster";
import "./style.css";
import { useDispatch } from "react-redux";

import { setLoading } from "../../redux/reducers/commonReducer";
const RegistrationPage = () => {
  const dispatch = useDispatch();
  const defaultFormaData={
    username: "",
    mobile_no: "",
    password: "",
    email: "",
    rank: "SHO",
    user_profile: {
      reporting_to: "",
      district: "",
      state: "",
      police_station: "",
    }}
  
  const [formData, setFormData] = useState(defaultFormaData);
 
  const [districtOptions, setDistrictOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [policeStationOptions, setPoliceStationOptions] = useState([]);
 
  const [selectedRank, setSelectedRank] = useState("");
  const [userData, setUserData] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedReportingTo, setSelectedReportingTo] = useState("");
  const [userOptions, setUserOptions] = useState([]);

 

  const handleUserProfileChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("user_profile.")) {
      setFormData({
        ...formData,
        user_profile: {
          ...formData.user_profile,
          [name.substring("user_profile.".length)]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const handleUserSelect = (e) => {
    const { name, value } = e.target;
   
    setSelectedUser(value);
    setFormData({
      ...formData,
      user_profile: {
        ...formData.user_profile,
        reporting_to: value,
      },
    });
    setSelectedRank("");
  };

  const handleReportingToSelect = async (e) => {
    const { name, value } = e.target;
    setSelectedReportingTo(value);
    setSelectedRank("");
    const res = await ApiHandle(`${REGISTRATION}?rank=${value}`, {}, "GET");

    if (res.statusCode === 200) {
      const data = res.responsePayload.results;
      setUserOptions(data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    setSubmitting(true);
    const res = await ApiHandle(REGISTRATION, formData, "POST");
    if (res.statusCode === 201) {
      setFormData(defaultFormaData)
      setSelectedReportingTo("")
      Toaster("success", "User Registered Successfully!");
    }
    dispatch(setLoading(false));
  };

  useEffect(() => {
    getStates();
    // getDistrict();
    // getPoliceStaionList();
  }, []);


  const getDistrict = async (StateValue) => {
    const res = await ApiHandle(`${GET_DISTRICT}?state_id=${StateValue}`, {}, "GET");
    if (res.statusCode === 200) {
      const data = res?.responsePayload;
      setDistrictOptions(data);
      return;
    }
  };
  const getPoliceStaionList = async (DistrictValue) => {
    const res = await ApiHandle(`${GET_POLICE_STATION_LIST}?district_id=${DistrictValue}`, {}, "GET");
    if (res.statusCode === 200) {
      const data = res?.responsePayload;
      setPoliceStationOptions(data);
      return;
    }
  };
  const getStates = async () => {
    const res = await ApiHandle(GET_STATES, {}, "GET");
    if (res.statusCode === 200) {
      const data = res?.responsePayload;
      setStateOptions(data);
      return;
    }
  };

  const rankOptions = [
    { id: 1, name: "SHO" },
    { id: 2, name: "INSPECTOR" },
    { id: 3, name: "ACP" },
    { id: 4, name: "DCP" },
  ];

  const handleRankClick = async (rank) => {
    setSelectedRank(rank);
    const res = await ApiHandle(`${REGISTRATION}?rank=${rank}`, {}, "GET");

    if (res.statusCode === 200) {
      const data = res.responsePayload.results;
      setUserData(data);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center custom-background">
      <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-96 flex flex-col items-center" style={{width:"35rem"}}>
        <h1 className="text-2xl font-bold mb-4">Registration Page</h1>

        <form
          onSubmit={handleSubmit}
          className="w-full overflow-y-scroll h-[30rem] p-2"
        >
          <Input
            label="Username"
            type="text"
            name="username"
            onChange={handleUserProfileChange}
            value={formData.username}
            maxLength={250}
            minLength={1}
            star={true}
            required={true}
          />

          <Input
            label="Mobile Number"
            type="text"
            name="mobile_no"
            onChange={handleUserProfileChange}
            value={formData.mobile_no}
            maxLength={20}
            minLength={1}
            pattern="^\+?1?\d{9,15}$"
            star={true}
            required={true}
          />

          <Input
            label="Password"
            type="password"
            name="password"
            onChange={handleUserProfileChange}
            value={formData.password}
            minLength={6}
            star={true}
            required={true}
          />

          <Input
            label="Email"
            type="email"
            name="email"
            onChange={handleUserProfileChange}
            value={formData.email}
            maxLength={250}
            minLength={1}
            star={true}
            required={true}
          />

          <DropDown
            label="Rank"
            options={rankOptions}
            onChange={handleUserProfileChange}
            value={formData.rank}
            name="rank"
          />

          <div className="mt-2">
            <span className="text-[16px] font-bold mb-8">User Profile</span>

            <DropDown
              label="Reporting To"
              options={rankOptions}
              onChange={handleReportingToSelect}
              value={selectedReportingTo}
              name="selectedReportingTo"
            />

            {selectedReportingTo && (
              <DropDown
                label="Select User"
                options={userOptions}
                onChange={handleUserSelect}
                value={selectedUser}
                checkId={true}
                name="user_profile.reporting_to"
              />
            )}

          <DropDown
              label="State"
              options={stateOptions}
              onChange={(e)=>{handleUserProfileChange(e);
                e?.target?.value &&  getDistrict(e.target.value);      
                setFormData((prev)=>({
                  ...prev,
                  user_profile: {
                    ...prev.user_profile,
                    "district": "",
                    "police_station":""
                  },
                }));
                setPoliceStationOptions([]);
                
              }}
              value={formData.user_profile.state}
              name="user_profile.state"
              checkId={true}
              star={true}
              required={true}
              
            />

            <DropDown
              label="District"
              options={districtOptions}
              onChange={(e)=> {handleUserProfileChange(e);
                e?.target?.value && getPoliceStaionList(e.target.value); 
                setFormData((prev)=>({
                  ...prev,
                  user_profile: {
                    ...prev.user_profile,
                    "police_station":""
                  },
                }));
              }}
              value={formData.user_profile.district}
              name="user_profile.district"
              checkId={true}
              disabledSelect={!formData.user_profile.state}
              star={true}
              required={true}
            />
            

            <DropDown
              label="Police Station"
              options={policeStationOptions}
              onChange={handleUserProfileChange}
              value={formData.user_profile.police_station}
              name="user_profile.police_station"
              checkId={true}
              disabledSelect={!formData.user_profile.district}
              star={true} 
              required={true} 
            />
          </div>

          <button
            type="submit"
            // disabled={submitting}
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
