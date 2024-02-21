/** @format */

import React, { useEffect, useState } from "react";
import { ApiHandle } from "../../utils/ApiHandle";
import {
  FORM_REQUEST,
  APPROVE_REQUEST,
  VIEW_ATTACHMENTS,
} from "../../utils/constants";
import Toaster from "../../utils/toaster/Toaster";
import { useNavigate } from "react-router";
import FilterSection from "./filterSection";
import { useDispatch, useSelector } from "react-redux";
import {
  openRejectModal,
  openViewLogModal,
  otpValidationModal,
  updateRequestList,
} from "../../redux/reducers/modalsReducer";
import { FiEye } from "react-icons/fi";
import { async } from "q";
import VisibilityIcon from "@mui/icons-material/Visibility";
import OtpValidationModal from "../../modals/otpValidationModal";
import { setLoading } from "../../redux/reducers/commonReducer";

function UnverifiedFormList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { rank } = useSelector((state) => state.user?.userData);
  const { updateReqList } = useSelector((state) => state.modal);
  const [current, setCurrent] = useState(0);
  const [isNext, setIsNext] = useState(false);
  const [isPrevious, setIsPrevious] = useState(false);
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
        `?case_type=${filter?.case_type}&is_otp_verified=${false}&fir_no=${filter?.case_ref}&decision_type=PENDING${filter.form_status}&page=${active}&sys_date=${date_range}`,
      {},
      "GET"
    );
    if (res.statusCode === 200) {
      
      setRequestList(res?.responsePayload);
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
    setCurrent(current + 1);
    getAllRequest({ active: current + 1 });
  };
  const handlePrevious = () => {
    setCurrent(current - 1);
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
  });
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
  const clearFilter= async ({ active = 1 }) => {
    
    const res = await ApiHandle(
      FORM_REQUEST +
        `?decision_type=&page=${active}&is_otp_verified=${true}&sys_date=`,
      {},
      "GET"
    );
    if (res.statusCode === 200) {
      setRequestList(res?.responsePayload);
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

  return (
    <>
      <FilterSection
        filter={filter}
        getAllRequest={getAllRequest}
        setFilter={setFilter}
        clearFilter={clearFilter}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />
      <div>
        <div className="relative overflow-x-auto p-3">
          <table
            className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 "
            style={{ border: "1px solid black" }}
          >
            <thead
              className="text-center text-xs text-black uppercase bg-red-200 "
            //   style={{ backgroundColor: "red", color: "white" }}
            >
              <tr>
                <th scope="col" className="px-6 py-3">
                  DATE OF REQUEST
                </th>
               
                <th scope="col" className="px-6 py-3">
                  REQUESTED TYPE(CDR, IMEI,TDR,IPDR,CAF)
                </th>
                <th scope="col" className="px-6 py-3">
                  TARGET TYPE(MOBILE NO./IP ADDRESS/IMEI/CELL ID)
                </th>
                <th scope="col" className="px-6 py-3">
                  I/O Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Fir No.
                </th>
                {/* <th scope="col" className="px-6 py-3">
                  View Attachment
                </th> */}
                <th scope="col" className="px-6 py-3">
                  ACTION{" "}
                </th>
               
              
              </tr>
            </thead>
            <tbody>
              {requestList?.results?.map((item) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item?.created_on?.split("T")[0]}
                  </th>
                 
                  <td
                    className="px-6 py-4 font-semibold"
                    style={{ color: "black" }}
                  >
                    {String(item?.request_to_provide).replace("_", ' ')}
                   
                  </td>
                  <td
                    className="px-6 py-4 font-semibold"
                    style={{ color: "black" }}
                  >
                    {String(item?.target_type).replace("_", ' ')}
                   
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
                    {["ACP", "DCP"].includes(rank) &&
                      item?.decision == "PENDING" && (
                        <button
                          onClick={() => {
                            approveRequest({
                              requestId: item?.id,
                              approved_desion_id: item?.approve_decision_id,
                            });
                          }}
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
                       item.is_otp_verified?  navigate(
                          `/request/view/${item?.request_to_provide[0]}/${item?.id}`
                        ):dispatch(otpValidationModal({ id: item?.id }));
                      }}
                      className="bg-blue-300 p-2 rounded-lg font-bold"
                      style={{
                        color: "black",
                        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                      }}
                    >
                    {item?.is_otp_verified?"View":"Verify"}
                    </button>
                    <button
                      onClick={() => {
                        !item.is_otp_verified? navigate(
                          `/request/edit/${item?.request_to_provide[0]}/${item?.id}`
                        )
                        :dispatch(otpValidationModal({ id: item?.id }));
                      }}
                       
                      
                      className="bg-green-300 p-2 rounded-lg font-bold"
                      style={{
                        color: "black",
                        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                      }}
                    >
            
                      Edit
                    </button>
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
                 
                </tr>
              ))}
            </tbody>
          </table>
          {requestList?.results?.length>0?"" : <div className="flex justify-center items-center m-[10rem]"> <span className="text-[3rem] text-red-400 text-center"> No Data Found</span></div>      }
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

export default UnverifiedFormList;
