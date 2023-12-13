import React, { useState } from "react";
import SearchBar from "../../components/searchComponent/searchBar";
import CommonDropDown from "../../components/dropdown";

function HomePage() {
  // const statusOption = [
  //   { id: 1, name: "APPROVE" },
  //   { id: 2, name: "PENDING" },
  //   { id: 3, name: "REJECT" },
  //   { id: 4, name: "ALL" },
  // ];
  // const [status, setStatus] = useState("");
  // const handleStatus = (e) => {
  //   const { name, value } = e.target;
  //   setStatus(value);
  // };
  // return (
  //   <div className="w-full bg-black h-full p-4">
  //     <div className="flex items-center justify-center ">
  //       <h2 className="text-[18px] text-[white] p-4 font-[600]">
  //         DISTRICT HOME PAGE
  //       </h2>
  //     </div>
  //     <div className="flex justify-between px-4 mb-4">
  //       <div className="bg-[#198754] text-white p-2 rounded-md">
  //         New Request Sent
  //       </div>
  //       <div className="bg-[#ffc107] text-white p-2 rounded-md">
  //         Replies Recived
  //       </div>
  //     </div>
  //     <div className="bg-[#2d3c53] text-black rounded p-2 px-4">
  //       <div className="flex items-center justify-between">
  //         <div className="text-white font-[500] text-[16px]">
  //           All Requested Form
  //         </div>
  //         <div>
  //           <CommonDropDown
  //             isLabel={true}
  //             options={statusOption}
  //             onChange={handleStatus}
  //             value={status}
  //             label="status"
  //           />
  //         </div>
  //       </div>
  //       <div className="flex justify-between mt-4">
  //         <div className="text-white text-[14]">
  //           Total Number of Pending : 12
  //         </div>
  //         <div className="text-white text-[14]">
  //           Total Number of Approved : 62
  //         </div>
  //         <div className="text-white text-[14]">
  //           Total Number of Reject : 11
  //         </div>
  //       </div>
  //       <div className="flex justify-between items-center border-[white] border-[2px] p-3 mt-4">
  //         <div className="text-[white] text-[15px]">
  //           System Date : 2023-10-12, System Time : 04:34:00, Target Type:
  //           MOBILE_NUMBER, Request To Provide : IPDR, Case Ref : 151/23U/S 67,
  //           Case Type : it act
  //         </div>
  //         <div>
  //           <div className="bg-[#198754] text-white p-2 rounded-md px-4">
  //             Success
  //           </div>
  //         </div>
  //       </div>
  //       <div className="flex justify-between items-center border-[white] border-[2px] p-3 mt-4">
  //         <div className="text-[white] text-[15px]">
  //           System Date : 2023-10-12, System Time : 04:34:00, Target Type:
  //           MOBILE_NUMBER, Request To Provide : IPDR, Case Ref : 151/23U/S 67,
  //           Case Type : it act
  //         </div>
  //         <div>
  //           <div className="bg-[#198754] text-white p-2 rounded-md px-4">
  //             Success
  //           </div>
  //         </div>
  //       </div>
  //       <div className="flex justify-between items-center border-[white] border-[2px] p-3 mt-4">
  //         <div className="text-[white] text-[15px]">
  //           System Date : 2023-10-12, System Time : 04:34:00, Target Type:
  //           MOBILE_NUMBER, Request To Provide : IPDR, Case Ref : 151/23U/S 67,
  //           Case Type : it act
  //         </div>
  //         <div>
  //           <div className="bg-[#198754] text-white p-2 rounded-md px-4">
  //             Success
  //           </div>
  //         </div>
  //       </div>
  //       <div className="flex justify-between items-center border-[white] border-[2px] p-3 mt-4">
  //         <div className="text-[white] text-[15px]">
  //           System Date : 2023-10-12, System Time : 04:34:00, Target Type:
  //           MOBILE_NUMBER, Request To Provide : IPDR, Case Ref : 151/23U/S 67,
  //           Case Type : it act
  //         </div>
  //         <div>
  //           <div className="bg-[#198754] text-white p-2 rounded-md px-4">
  //             Success
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
}
export default HomePage;
