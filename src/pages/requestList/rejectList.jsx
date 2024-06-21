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
import { setLoading } from "../../redux/reducers/commonReducer";
import Title from "../../utils/Title";
import { EyeFill } from "react-bootstrap-icons";
import CustomPagination from "../../components/pagination/CustomPagination";

function RejectList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { rank } = useSelector((state) => state.user?.userData);
  const { updateReqList } = useSelector((state) => state.modal);
  const [current, setCurrent] = useState(0);
  const [isNext, setIsNext] = useState(false);
  const [isPrevious, setIsPrevious] = useState(false);
  const [rejectPageCount, setRejectPageCount] = useState(0);

  useEffect(() => {
    getAllRequest({ active: 1 });
  }, []);
  const [requestList, setRequestList] = useState([]);

  const getAllRequest = async ({ active = 1 }) => {
    dispatch(setLoading(true));

    let date_range =
      dateRange.startDate && dateRange.endDate && "--" + dateRange.endDate;
    date_range = dateRange.startDate + date_range;
    if (date_range === 0) {
      date_range = "";
    }
    console.log(filter,"filter");
    const res = await ApiHandle(
      FORM_REQUEST +
        `?case_type=${filter?.case_type}&fir_no=${
          filter?.case_ref
        }&decision_type=${"REJECT"}&page=${active}&sys_date=${date_range}&target_type=${filter.target_type}&target_type_value=${filter.target_type_value}`,
      {},
      "GET"
    );
    if (res.statusCode === 200) {
      dispatch(setLoading(false));
      setRequestList(res?.responsePayload.results);
      setRejectPageCount(res.responsePayload.count);
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
  // const handleNext = () => {
  //   setCurrent(current + 1);
  //   getAllRequest({ active: current + 1 });
  // };
  // const handlePrevious = () => {
  //   setCurrent(current - 1);
  //   getAllRequest({ active: current - 1 });
  // };

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
    target_type: "",
    target_type_value: "",
  });
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
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
  const clearFilter = async ({ active = 1 }) => {
    setDateRange({
      startDate: null,
      endDate: null,
    });
    setFilter({
      req_to_provider: "",
      form_status: "",
      case_ref: "",
      case_type:"",
      target_type_value: "",
      target_type: "",
    });
    if (filter) {
      const res = await ApiHandle(
        FORM_REQUEST +
          `?decision_type=REJECT&page=${active}&is_otp_verified=&sys_date=`,
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
    }
  };

  return (
    <>
      <Title text={"Reject List"} />
      <div className="outer-div-whole mx-auto ">
        <FilterSection
          filter={filter}
          getAllRequest={getAllRequest}
          setFilter={setFilter}
          dateRange={dateRange}
          setDateRange={setDateRange}
          clearFilter={clearFilter}
        />
        <div className="inner-div-table z-[-1]">
          <div className=" overflow-x-auto p-3 ">
            <table
              className="w-full text-sm text-left rtl:text-right text-gray-500 "
              style={{ border: "1px solid black" }}
            >
              <thead
                className="text-center text-xs text-gray-700 uppercase bg-gray-50 "
                style={{ backgroundColor: "black", color: "white" }}
              >
                <tr>
                  <th scope="col" className="px-6 py-3">
                    DATE OF REQUEST
                  </th>
                  <th scope="col" className="px-6 py-3">
                    NAME OF DIST/ORGN.
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
                {requestList?.map((item) => (
                  <tr className="bg-white border-b ">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      {item?.created_on?.split("T")[0]}
                    </th>
                    <td
                      className="px-6 py-4 font-semibold text-gray-900"
                      style={{ color: "black" }}
                    >
                      {item?.district}
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
                      {["ACP", "DCP"].includes(rank) &&
                        item?.decision === "PENDING" && (
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
                      <button
                        onClick={() => {
                          navigate(
                            `/request/edit/${item?.request_to_provide[0]}/${item?.id}`
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
                          Otp Verified
                        </button>
                      )}
                      {["ACP", "DCP"].includes(rank) &&
                        item?.decision === "PENDING" && (
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
                      <td className="px-6 py-4 flex gap-2 justify-center items-center">
                        <div>{item?.decision}</div>
                        <div>
                          {item?.decision === "REJECT" && (
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
                    <td>
                      {" "}
                      {!["ACP", "DCP"].includes(rank) && (
                        <div className="flex gap-2 justify-center items-center">
                          {/* <div>{item?.acp_status}</div> */}

                          <span
                            className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ring-pink-700/10
    ${
      item?.acp_status === "REJECT"
        ? "bg-red-100 text-red-700"
        : item?.acp_status === "PENDING"
        ? "bg-yellow-100 text-yellow-700"
        : item?.acp_status === "APPROVE"
        ? "bg-green-100 text-yellow-700"
        : ""
    }`}
                          >
                            {item?.acp_status}
                          </span>
                          <div>
                            {item?.acp_status === "REJECT" && (
                              <button
                                onClick={() => {
                                  dispatch(openViewLogModal(item?.id));
                                  dispatch(updateRequestList(false));
                                }}
                                // className="bg-red-900 p-2 rounded-lg font-bold"
                                // style={{
                                //   color: "white",
                                //   boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                                // }}
                              >
                                <EyeFill color="blue" title="view log" />
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </td>

                    {!["DCP"].includes(rank) && (
                      <td className="px-6 py-4 flex gap-2 justify-center items-center">
                        <span
                          className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ring-pink-700/10
    ${
      item?.dcp_status === "REJECT"
        ? "bg-red-100 text-red-700"
        : item?.dcp_status === "PENDING"
        ? "bg-yellow-100 text-yellow-700"
        : item?.acp_status === "APPROVE"
        ? "bg-green-100 text-yellow-700"
        : ""
    }`}
                        >
                          {item?.dcp_status}
                        </span>

                        <div>
                          {item?.dcp_status === "REJECT" && (
                            <button
                              onClick={() => {
                                dispatch(openViewLogModal(item?.id));
                                dispatch(updateRequestList(false));
                              }}
                            >
                              <EyeFill color="blue" title="view log" />
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            {requestList?.length > 0 ? (
              ""
            ) : (
              <div className="flex justify-center items-center m-[10rem]">
                {" "}
                <span className="text-[3rem] text-red-400 text-center">
                  {" "}
                  No Data Found
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center mb-2 mt-2">
        <CustomPagination totalItems={rejectPageCount} />
      </div>
    </>
  );
}

export default RejectList;
