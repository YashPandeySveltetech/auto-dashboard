/** @format */

import React, { useCallback, useEffect, useState } from "react";
import { ApiHandle } from "../../utils/ApiHandle";
import {
  FORM_REQUEST,
  APPROVE_REQUEST,
  VIEW_ATTACHMENTS,
  EXPORT_DCP_FILE,
} from "../../utils/constants";
import Toaster from "../../utils/toaster/Toaster";
import { useNavigate } from "react-router";
import FilterSection from "./filterSection";
import { useDispatch, useSelector } from "react-redux";
import {
	DcpPassowrdConfirm,
  openDcpPasswordVerifyModal,
  openRejectModal,
  openViewLogModal,
  updateRequestList,
} from "../../redux/reducers/modalsReducer";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import VisibilityIcon from "@mui/icons-material/Visibility";

function RequestList() {
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_API_KEY;
  const dispatch = useDispatch();
  const { rank } = useSelector((state) => state.user?.userData);
  const { updateReqList ,isDcpPassword,dcpStatus} = useSelector((state) => state.modal);
  const [current, setCurrent] = useState(1);
  const [isNext, setIsNext] = useState(false);
  const [isPrevious, setIsPrevious] = useState(false);
  //   const [value, setValue] = useState({
  //     startDate: new Date(),
  //     endDate: new Date().setMonth(11)
  //     });

  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    getAllRequest({ active: 1 });
  }, []);
  const [requestList, setRequestList] = useState([]);

  const getAllRequest = async ({ active = 1 }) => {
    let date_range =
      dateRange.startDate && dateRange.endDate && "--" + dateRange.endDate;
    date_range = dateRange.startDate + date_range;
    if (date_range === 0) {
      dateRange = "";
    }
    const res = await ApiHandle(
      FORM_REQUEST +
        `?case_type=${filter?.case_type}&fir_no=${
          filter?.case_ref
        }&decision_type=${
          filter.form_status
        }&page=${active}&is_otp_verified=${true}&sys_date=${date_range}&police_station_id=${
          filter?.police_station
        }`,
      {},
      "GET"
    );
    if (res.statusCode === 200) {
      setRequestList(res?.responsePayload.results);
      if (res?.responsePayload?.next) {
        // setCurrentpage(currentpage+1)
        setIsNext(true);
      }
      if (!res?.responsePayload?.next) {
        // setCurrentpage(currentpage+1)
        setIsNext(false);
      }

      if (res?.responsePayload?.previous) {
        // setCurrentpage(currentpage+1)
        setIsPrevious(true);
      }
      if (!res?.responsePayload?.previous) {
        // setCurrentpage(currentpage+1)
        setIsPrevious(false);
      }
      // setIsOtp(true);
      // Toaster('success', 'OTP SENT Successfully!');

      return;
    }
  };
  const handleNext = () => {
    setCurrent((prev)=>prev+1 );
    getAllRequest({ active: current + 1 });
  };

  const handlePrevious = () => {
    setCurrent((prev)=>prev-1 );
    getAllRequest({ active: current - 1 });
  };
  useEffect(() => {
    if (updateReqList) {
      getAllRequest({ active: 1 });
    }
  }, [updateReqList]);

  const [filter, setFilter] = useState({
    req_to_provider: "",
    form_status: "",
    case_ref: "",
    case_type: "",
    police_station: "",
  });


  useEffect(()=>{
if(isDcpPassword){
	approveRequest({
		requestId: dcpStatus?.id,
		approved_desion_id: dcpStatus?.approve_decision_id,
	  })
}
  },[isDcpPassword])
  const approveRequest = async ({ requestId, approved_desion_id }) => {
    const res = await ApiHandle(
      APPROVE_REQUEST + `${approved_desion_id}/`,
      { request_form: requestId },
      "PATCH"
    );
    if (res.statusCode === 200) {
      // setRequestList(res?.responsePayload);
      // setIsOtp(true);
      getAllRequest({ active: 1 });
	  dispatch(DcpPassowrdConfirm(false));
      Toaster("success", "Request Approved Successfully!");

      return;
    }
  };

  const viewAttachment = async ({ requets_form_id }) => {
    const res = await ApiHandle(
      VIEW_ATTACHMENTS + `?request_form=${requets_form_id}`,
      {},
      "GET"
    );
    if (res.statusCode === 200) {
      if (res?.responsePayload?.results[0].file) {
        window.open(
          process.env.REACT_APP_MEDIA_URI +
            res?.responsePayload?.results[0].file
        );
      }
      // getAllRequest()
      // Toaster("success", "Request Approved Successfully!");

      return;
    }
  };
 const handleVerify= (item) => {
	if(["DCP"].includes(rank) ){
		
		dispatch(openDcpPasswordVerifyModal(item))
	}
	else{
		approveRequest({
			requestId: item?.id,
			approved_desion_id: item?.approve_decision_id,
		  });
	}
    
     
  };

  const exportReport=async()=>{
    let date_range =
    dateRange.startDate && dateRange.endDate && "--" + dateRange.endDate;
  date_range = dateRange.startDate + date_range;
  if (date_range === 0) {
    dateRange = "";
  }
   else if(dateRange?.startDate ==="" ){
      Toaster("","Please Select Date")
    }
    else{
      const res = await ApiHandle(
        EXPORT_DCP_FILE +
          `?decision_type=APPROVE&sys_date=${date_range}`,
        {},
        "GET"
      );
    if ( res?.responsePayload?.details?.length>0 ) {
        exportExcel(res?.responsePayload?.details)
      }
      else{
        Toaster("","No Data Found")
      }
   
    }

  }
  const exportExcel = (data) => {
    const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const first_file_data = XLSX.utils.json_to_sheet(data);
  const new_sheet = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(new_sheet, first_file_data, "file");
  const excelBuffer = XLSX.write(new_sheet, {
    bookType: "xlsx",
    type: "array",
  });
  const fileData = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(fileData, "file"+new Date().toLocaleDateString("en-GB") + fileExtension);
   
  };
  const clearFilter= async ({ active = 1 }) => {
    
    const res = await ApiHandle(
      FORM_REQUEST +
        `?decision_type=&page=${active}&is_otp_verified=${true}&sys_date=`,
      {},
      "GET"
    );
    if (res.statusCode === 200) {
      setRequestList(res?.responsePayload.results);
      setFilter({req_to_provider: '', form_status: '', case_ref: '', case_type: '', police_station: ''})
      setDateRange({startDate: '', endDate: ''})
      if (res?.responsePayload?.next) {
        // setCurrentpage(currentpage+1)
        setIsNext(true);
      }
      if (!res?.responsePayload?.next) {
        // setCurrentpage(currentpage+1)
        setIsNext(false);
      }

      if (res?.responsePayload?.previous) {
        // setCurrentpage(currentpage+1)
        setIsPrevious(true);
      }
      if (!res?.responsePayload?.previous) {
        // setCurrentpage(currentpage+1)
        setIsPrevious(false);
      }
      // setIsOtp(true);
      // Toaster('success', 'OTP SENT Successfully!');

      return;
    }
   
  };

  const filtersection=useCallback(()=>{
return(
  <FilterSection
  filter={filter}
  getAllRequest={getAllRequest}
  setFilter={setFilter}
  dateRange={dateRange}
  setDateRange={setDateRange}
  exportReport={exportReport}
  clearFilter={clearFilter}
/>
)
  },[filter,dateRange])

  return (
    <>
     {filtersection()}
      <div>
        <div className="relative overflow-x-auto p-3">
          <table
            className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 "
            style={{ border: "1px solid black" }}
          >
            <thead
              className="text-center text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
              style={{ backgroundColor: "black", color: "white" }}
            >
              <tr>
                <th scope="col" className="px-6 py-3">
                  DATE OF REQUEST
                </th>
                <th scope="col" className="px-6 py-3">
                  Police Station
                </th>
                <th scope="col" className="px-6 py-3">
                  Requested Officer Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Fir No.
                </th>
                <th scope="col" className="px-6 py-3">
                  REQUESTED TYPE(CDR, IMEI,TDR,IPDR,CAF)
                </th>
                <th scope="col" className="px-6 py-3">
                  TARGET TYPE(MOBILE NO./IP ADDRESS/IMEI/CELL ID)
                </th>

                {/* <th scope="col" className="px-6 py-3">
                  View Attachment
                </th> */}
                <th scope="col" className="px-6 py-3">
                  ACTION{" "}
                </th>
                {["ACP", "DCP"].includes(rank) && (
                  <th scope="col" className="px-6 py-3">
                    REMARKS(REASON FOR REJECTION)
                  </th>
                )}
                {!["ACP", "DCP"].includes(rank) && (
                  <th scope="col" className="px-6 py-3">
                    ACP Status
                  </th>
                )}
                {!["DCP"].includes(rank) && (
                  <th scope="col" className="px-6 py-3">
                    DCP Status
                  </th>
                )}
              </tr>
            </thead>
       <tbody>
              { requestList?.map((item) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {/* {item?.created_on?.split("T")[0]} */}
                    {new Date(item?.created_on).toLocaleString("en-GB")}
                  </th>
                  <td
                    className="px-6 py-4 font-semibold"
                    style={{ color: "black" }}
                  >
                    {item?.added_by}
                  </td>
                  <td
                    className="px-6 py-4 font-semibold"
                    style={{ color: "black" }}
                  >
                    {item?.io_name}
                  </td>
                  <td
                    className="px-6 py-4 font-semibold"
                    style={{ color: "black" }}
                  >
                    {item?.fir_no}
                  </td>
                  <td
                    className="px-6 py-4 font-semibold"
                    style={{ color: "black" }}
                  >
                    {String(item?.request_to_provide).replace("_", " ")}
                  </td>
                  <td
                    className="px-6 py-4 font-semibold"
                    style={{ color: "black" }}
                  >
                    {String(item?.target_type).replace("_", " ")}
                  </td>

                  {/* <td className="px-6 py-4 text-center">
                   
                    <button
                      onClick={() =>
                        viewAttachment({ requets_form_id: item?.id })
                      }
                    >
                      <VisibilityIcon className="text-green-800" />
                    </button>
                   
                  </td> */}
                  <td className="px-6 py-4 flex gap-2">
                    {(["ACP", "DCP"].includes(rank) &&
                      item?.decision == "PENDING" )&& (
                        <button
                          onClick={()=>handleVerify(item)}
                          className="bg-green-300 p-2 rounded-lg font-bold"
                          style={{
                            color: "black",
                            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                          }}
                        >
                          Approve
                        </button>
                      )}
                    <button
                      onClick={() => {
                        navigate(
                          `/request/view/${item?.request_to_provide}/${item?.id}`
                        );
                      }}
                      className="bg-blue-300 p-2 rounded-lg font-bold"
                      style={{
                        color: "black",
                        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                      }}
                    >
                      View
                    </button>
                    {!item?.is_otp_verified && (
                      <button
                        onClick={() => {
                          navigate(
                            `/request/edit/${item?.request_to_provide}/${item?.id}`
                          );
                        }}
                        className="bg-green-300 p-2 rounded-lg font-bold"
                        style={{
                          color: "black",
                          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                        }}
                      >
                        Edit
                      </button>
                    )}
                    {["ACP", "DCP"].includes(rank) &&
                      item?.decision == "PENDING" && (
                        <button
                          onClick={() => dispatch(openRejectModal(item?.id))}
                          className="bg-red-900 p-2 rounded-lg font-bold"
                          style={{
                            color: "white",
                            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                          }}
                        >
                          Reject
                        </button>
                      )}
                  </td>

                  {["ACP", "DCP"].includes(rank) && (
                    <td className="px-6 py-4">
                      <div>{item?.decision}</div>
                      <div>
                        {item?.decision == "REJECT" && (
                          <button
                            onClick={() => {
                              dispatch(openViewLogModal(item?.id));
                              dispatch(updateRequestList(false));
                            }}
                            className="bg-red-900 p-2 rounded-lg font-bold"
                            style={{
                              color: "white",
                              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                            }}
                          >
                            View Log
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                  {!["ACP", "DCP"].includes(rank) && (
                    <td className="px-6 py-4">
                      <div>{item?.acp_status}</div>
                    </td>
                  )}
                  {!["DCP"].includes(rank) && (
                    <td className="px-6 py-4">
                      <div>{item?.dcp_status}</div>
                      <div>
                        {item?.dcp_status == "REJECT" && (
                          <button
                            onClick={() => {
                              dispatch(openViewLogModal(item?.id));
                              dispatch(updateRequestList(false));
                            }}
                            className="bg-red-900 p-2 rounded-lg font-bold"
                            style={{
                              color: "white",
                              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                            }}
                          >
                            View Log
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
                   
          </table>
          {requestList.length>0?"" : <div className="flex justify-center items-center m-[10rem]"> <span className="text-[3rem] text-red-400 text-center"> No Data Found</span></div>      }
        </div>
      </div>
      <div className="card-footer flex justify-between p-3 mb-2 mt-2">
        {isPrevious ? (
          <button
            onClick={() => handlePrevious()}
            className="bg-green-400 px-4 py-2 rounded-lg font-bold text-black shadow-md"
          >
            PREV
          </button>
        ) : (
          <div></div>
        )}
        {isNext && (
          <button
            onClick={() => handleNext()}
            className="bg-green-400 px-4 py-2 rounded-lg font-bold text-black shadow-md"
          >
            NEXT
          </button>
        )}
      </div>
    </>
  );
}

export default RequestList;
