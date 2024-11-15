//import React, { useEffect, useState } from "react";
// import Input from "../../components/input";
// import DropDown from "../../components/dropdown";
// import {
//   GET_DISTRICT,
//   GET_POLICE_STATION_LIST,
//   GET_STATES,
//   REGISTRATION,
// } from "../../utils/constants";
// import { ApiHandle } from "../../utils/ApiHandle";
// import Toaster from "../../utils/toaster/Toaster";
// import "./style.css";
// import { useDispatch } from "react-redux";
// import { setLoading } from "../../redux/reducers/commonReducer";

// const RegistrationPage = () => {
//   const dispatch = useDispatch();
//   const defaultFormaData = {
//     username: "",
//     mobile_no: "",
//     password: "",
//     email: "",
//     rank: "SHO",
//     user_profile: {
//       reporting_to: "",
//       state: "",
//       police_station: "",
//     },
//   };

//   const [formData, setFormData] = useState(defaultFormaData);
//   const [districtOptions, setDistrictOptions] = useState([]);
//   const [stateOptions, setStateOptions] = useState([]);
//   const [policeStationOptions, setPoliceStationOptions] = useState([]);
//   const [selectedRank, setSelectedRank] = useState("");
//   const [userData, setUserData] = useState([]);
//   const [submitting, setSubmitting] = useState(false);
//   const [selectedUser, setSelectedUser] = useState("");
//   const [selectedReportingTo, setSelectedReportingTo] = useState("");
//   const [userOptions, setUserOptions] = useState([]);
//   const [step, setStep] = useState(1); // Manage the current step of the form

//   const handleNextStep = () => {
//     setStep(step + 1);
//   };

//   const handlePreviousStep = () => {
//     setStep(step - 1);
//   };

//   const handleUserProfileChange = (e) => {
//     const { name, value } = e.target;

//     if (name.startsWith("user_profile.")) {
//       setFormData({
//         ...formData,
//         user_profile: {
//           ...formData.user_profile,
//           [name.substring("user_profile.".length)]: value,
//         },
//       });
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//     }
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     dispatch(setLoading(true));
//     setSubmitting(true);
//     const res = await ApiHandle(REGISTRATION, formData, "post");
//     if (res.statusCode === 201) {
//       setFormData(defaultFormaData);
//       setSelectedReportingTo("");
//       Toaster("success", "User Registered Successfully!");
//     }
//     dispatch(setLoading(false));
//   };
//   const rankOptions = [
//     { id: 1, name: "SHO" },
//     { id: 2, name: "INSPECTOR" },
//     { id: 3, name: "ACP" },
//     { id: 4, name: "DCP" },
//   ];
//   const handleReportingToSelect = async (e) => {
//     const { name, value } = e.target;
//     setSelectedReportingTo(value);
//     setSelectedRank("");
//     const res = await ApiHandle(`${REGISTRATION}?rank=${value}`, {}, "get");

//     if (res.statusCode === 200) {
//       const data = res.responsePayload.results;
//       setUserOptions(data);
//     }
//   };
//   const [selectedOption, setSelectedOption] = useState("");

//   const handleOptionChange = (event) => {
//     setSelectedOption(event.target.value);
//     console.log("Selected option:", event.target.value);
//   };
//   const handleUserSelect = (e) => {
//     const { name, value } = e.target;

//     setSelectedUser(value);
//     setFormData({
//       ...formData,
//       user_profile: {
//         ...formData.user_profile,
//         reporting_to: value,
//       },
//     });
//     setSelectedRank("");
//   };
//   const getPoliceStaionList = async (DistrictValue) => {
//     const res = await ApiHandle(
//       `${GET_POLICE_STATION_LIST}?district_id=${DistrictValue}`,
//       {},
//       "get"
//     );
//     if (res.statusCode === 200) {
//       const data = res?.responsePayload;
//       setPoliceStationOptions(data);
//       return;
//     }
//   };
//   const getStates = async () => {
//     const res = await ApiHandle(GET_STATES, {}, "get");
//     if (res.statusCode === 200) {
//       const data = res?.responsePayload;
//       setStateOptions(data);
//       return;
//     }
//   };
//   useEffect(() => {
//     getStates();
//     // getDistrict();
//     // getPoliceStaionList();
//   }, []);

//   // Other functions and useEffect remain the same...

//   return (
//     <div className="min-h-screen flex items-center justify-center custom-background from-inherit">
//       <div
//         className="bg-blue-200 p-8 rounded-lg shadow-md w-full md:w-96 flex flex-col items-center"
//         style={{ width: "35rem" }}
//       >
//         <h1 className="text-2xl font-bold mb-4 text-black">
//           Registration Page
//         </h1>

//         {/ Step 1: Before User Profile Inputs /}
//         {step === 1 && (
//           <form onSubmit={handleSubmit} className="w-full  h-[20rem] p-2">
//             <Input
//               label="Username"
//               type="text"
//               name="username"
//               onChange={handleUserProfileChange}
//               value={formData.username}
//               maxLength={250}
//               minLength={1}
//               star={true}
//               required={true}
//             />
//             <Input
//               label="Mobile Number"
//               type="text"
//               name="mobile_no"
//               onChange={handleUserProfileChange}
//               value={formData.mobile_no}
//               maxLength={20}
//               minLength={1}
//               pattern="^\+?1?\d{9,15}$"
//               star={true}
//               required={true}
//             />
//             <Input
//               label="Password"
//               type="password"
//               name="password"
//               onChange={handleUserProfileChange}
//               value={formData.password}
//               minLength={6}
//               star={true}
//               required={true}
//             />

//             <Input
//               label="Email"
//               type="email"
//               name="email"
//               onChange={handleUserProfileChange}
//               value={formData.email}
//               maxLength={250}
//               minLength={1}
//               star={true}
//               required={true}
//             />
//        <div className="flex justify-between items-center">
//   <div className="flex flex-row space-x-4 mt-4">
//     <label className="inline-flex items-center border-double border-4 border-indigo-300 bg-lime-100 p-2 rounded-md">
//       <input
//         type="radio"
//         className="form-radio text-indigo-600"
//         value="SHO"
//         checked={selectedOption === "SHO"}
//         onChange={handleOptionChange}
//       />
//       <span className="ml-2">SHO</span>
//     </label>
//     <label className="inline-flex items-center border-double border-4 border-indigo-300 bg-lime-100 p-2 rounded-md">
//       <input
//         type="radio"
//         className="form-radio text-indigo-600"
//         value="ACP"
//         checked={selectedOption === "ACP"}
//         onChange={handleOptionChange}
//       />
//       <span className="ml-2">ACP</span>
//     </label>
//   </div>
//   {/ Other inputs before user profile /}
//   <button
//     type="button"
//     onClick={handleNextStep}
//     className="border border-gray-300 text-gray-900 rounded-lg bg-sky-400 cursor-pointer ml-4 px-4 py-2"
//   >
//     Next
//   </button>
// </div>

//           </form>
//         )}

//         {/ Step 2: After User Profile Inputs /}
//         {step === 2 && (
//           <form
//             onSubmit={handleSubmit}
//             className="w-full overflow-y-scroll h-[30rem] p-2"
//           >
//             {/ User profile inputs /}
//             <DropDown
//               label="Reporting To"
//               options={rankOptions}
//               onChange={handleReportingToSelect}
//               value={selectedReportingTo}
//               name="selectedReportingTo"
//             />
//             {selectedReportingTo && (
//               <DropDown
//                 label="Select User"
//                 options={userOptions}
//                 onChange={handleUserSelect}
//                 value={selectedUser}
//                 checkId={true}
//                 name="user_profile.reporting_to"
//               />
//             )}
//             <DropDown
//               label="State"
//               options={stateOptions}
//               onChange={(e) => {
//                 handleUserProfileChange(e);
//                 e?.target?.value && getPoliceStaionList(e.target.value);
//                 setFormData((prev) => ({
//                   ...prev,
//                   user_profile: {
//                     ...prev.user_profile,
//                     // "district": "",
//                     police_station: "",
//                   },
//                 }));
//                 setPoliceStationOptions([]);
//               }}
//               value={formData.user_profile.state}
//               name="user_profile.state"
//               checkId={true}
//               star={true}
//               required={true}
//             />
//             <DropDown
//               label="Police Station"
//               options={policeStationOptions}
//               onChange={handleUserProfileChange}
//               value={formData.user_profile.police_station}
//               name="user_profile.police_station"
//               checkId={true}
//               disabledSelect={!formData.user_profile.state}
//               star={true}
//               required={true}
//             />

//             {/ Other inputs after user profile /}
//             <button
//               type="button"
//               onClick={handlePreviousStep}
//               className="w-full p-2.5 mb-4 border border-gray-300 text-gray-900 rounded-lg bg-blue-500  cursor-pointer mt-4"
//             >
//               Previous
//             </button>
//             <button
//               type="submit"
//               className="w-full p-2.5 mb-4 border border-gray-300 text-gray-900 rounded-lg bg-blue-500  cursor-pointer mt-4"
//             >
//               Register
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RegistrationPage;

import React, { useEffect, useState } from "react";
import index from "./index.css";
import Card from "./card";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/reducers/commonReducer";
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
import { setRank } from "../../redux/reducers/modalsReducer";
import Title from "../../utils/Title";

const RegisterForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [selectedReportingTo, setSelectedReportingTo] = useState("");
  const [selectedRank, setSelectedRank] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [policeStationOptions, setPoliceStationOptions] = useState([]);
  const [userOptions, setUserOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const dispatch = useDispatch();
  const defaultFormaData = {
    username: "",
    mobile_no: "",
    password: "",
    email: "",
    rank: "",
    user_profile: {
      reporting_to: "",
      state: "",
      police_station: "",
    },
  };
  const [formData, setFormData] = useState(defaultFormaData);
  const { isACP } = useSelector((state) => state.modal);
  const handleClick = ({ is_ACP }) => {
    dispatch(setRank(is_ACP));
    setIsModalOpen(true);
    console.log(isACP, "acp");
    setFormData((prev) => ({ ...prev, rank: isACP ? "ACP" : "SHO" }));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData(defaultFormaData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    setSubmitting(true);
    const res = await ApiHandle(REGISTRATION, formData, "post");
    if (res.statusCode === 201) {
      setFormData(defaultFormaData);
      setSelectedReportingTo("");
      Toaster("success", "User Registered Successfully!");
      setIsModalOpen(false);
    }
    dispatch(setLoading(false));
  };
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
  const rankOptions = [
    { id: 1, name: "SHO" },
    { id: 2, name: "INSPECTOR" },
    { id: 3, name: "ACP" },
    { id: 4, name: "DCP" },
  ];
  const handleReportingToSelect = async (rank) => {
    // const { name} = e.target;
    // const value = isACP ? "DCP" : "ACP";
    // value = isACP ? "DCP" : "ACP";
    // setSelectedReportingTo(value);
    setSelectedRank("");
    const res = await ApiHandle(`${REGISTRATION}?rank=${rank}`, {}, "get");

    if (res.statusCode === 200) {
      const data = res.responsePayload.results;
      setUserOptions(data);
    }
  };
  const getPoliceStaionList = async (DistrictValue) => {
    const res = await ApiHandle(
      `${GET_POLICE_STATION_LIST}?district_id=${DistrictValue}`,
      {},
      "get"
    );
    if (res.statusCode === 200) {
      const data = res?.responsePayload;
      setPoliceStationOptions(data);
      return;
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    console.log("Selected option:", event.target.value);
  };

  const getStates = async () => {
    const res = await ApiHandle(GET_STATES, {}, "get");
    if (res.statusCode === 200) {
      const data = res?.responsePayload;
      setStateOptions(data);
      return;
    }
  };
  useEffect(() => {
    getStates();
    // handleReportingToSelect()
    // getDistrict();
    // getPoliceStaionList();
  }, []);
  return (
    <>
      <Title text={"Registration"} />
      <div
        className="outer-div-whole flex flex-col min-h-screen justify-center bg-img"
        style={{ margin: "10px" }}
      >
        <div className="flex justify-center items-center">
          <div
            className="grid grid-cols-1 w-full md:grid-cols-2 lg:grid-cols-2 gap-8"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "43px",
              flexWrap: "wrap",
            }}
          >
            <div className="w-[90%] md:w-[30%]">
              <Card
                title="SHO"
                imageSrc="./police-officer.png"
                onclick={(e) => {
                  handleClick({ is_ACP: true });
                  handleReportingToSelect("ACP");
                }}
              />
            </div>
            <div className="w-[90%] md:w-[30%] ">
              <Card
                title="ACP"
                imageSrc="./dcp.png"
                onclick={() => {
                  handleClick({ is_ACP: false });
                  handleReportingToSelect("DCP");
                }}
              />
            </div>
          </div>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg p-4 shadow-md w-full md:w-1/2 lg:w-1/2 max- sm:ml-[80px]">
              <h2 className="text-2xl font-semibold mb-2 text-center">
                Registration Form
              </h2>
              <form
                onSubmit={handleSubmit}
                className="w-full p-2 overflow-scroll"
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
                  label="Reporting To"
                  options={userOptions}
                  onChange={handleUserSelect}
                  value={selectedUser}
                  checkId={true}
                  name="user_profile.reporting_to"
                />
                {isACP && (
                  <>
                    {/* <DropDown
                      label="Reporting To"
                      options={rankOptions}
                      onChange={handleReportingToSelect}
                      value={selectedReportingTo}
                      name="selectedReportingTo"
                    /> */}
                    {/* {selectedReportingTo && ( */}

                    {/* // )} */}
                    <DropDown
                      label="State"
                      options={stateOptions}
                      onChange={(e) => {
                        handleUserProfileChange(e);
                        e?.target?.value && getPoliceStaionList(e.target.value);
                        setFormData((prev) => ({
                          ...prev,
                          user_profile: {
                            ...prev.user_profile,
                            // "district": "",
                            police_station: "",
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
                      label="Police Station"
                      options={policeStationOptions}
                      onChange={handleUserProfileChange}
                      value={formData.user_profile.police_station}
                      name="user_profile.police_station"
                      checkId={true}
                      disabledSelect={!formData.user_profile.state}
                      star={true}
                      required={true}
                    />
                  </>
                )}

                <div className="flex justify-between">
                  <button
                    className="w-full sm:w-auto p-2.5 mb-4 border border-gray-300 text-white rounded-lg bg-blue-400 cursor-pointer mt-4 sm:mr-4"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="w-full sm:w-auto p-2.5 mb-4 border border-gray-300 text-white rounded-lg bg-green-400 cursor-pointer mt-4"
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RegisterForm;
