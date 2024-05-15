import React, { useEffect, useState } from "react";
import { ApiHandle } from "../../utils/ApiHandle";
import { REGISTRATION } from "../../utils/constants";
import { useNavigate, useParams } from "react-router-dom";

const UpdateUser = () => {
  const [list, setList] = useState([]);
  const [rank, setRank] = useState('ACP');

  const navigate = useNavigate();

  const handleReportingToSelect = async (rank) => {
    const rankType = rank ? rank : "ACP";
    setRank(rankType)
    // const { name} = e.target;
    // const value =isACP ? "DCP" : "ACP";
    // value = isACP ? "DCP" : "ACP";
    // setSelectedReportingTo(value);
    // setSelectedRank("");
    const res = await ApiHandle(`${REGISTRATION}?rank=${rankType}`, {}, "GET");

    if (res.statusCode === 200) {
      const data = res.responsePayload.results;
      setList(data);
      //   setUserOptions(data);
    }
  };
  useEffect(() => {
    handleReportingToSelect();
  }, []);
  return (
    <div>
      <h6>User List</h6>
      <div>
        <div class="hidden flex justify-center sm:block">
          <div class="border-b flex justify-around border-gray-200 flex">
            <nav class="-mb-px   gap-6">
              <button
                onClick={(e) => handleReportingToSelect("ACP")}
                type="button"
                 className={`className="shrink-0 border  p-3 rounded-tl-md rounded-tr-md text-sm font-medium text-gray-500 mr-1"
                 ${
                    rank === "ACP"
                    ? " border-gray-400 border-b-white bg-[#FFFAFA] text-sky-700 "
                    : "hover:text-gray-700"
                }`}
                // class="shrink-0 border border-transparent p-3 text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                <span className="text-white-400">ACP</span>
              </button>
            </nav>
            <nav class="-mb-px flex gap-6">
              <button
                onClick={(e) => handleReportingToSelect("DCP")} //  disabled={
                //    (!isEditable &&
                //      requestData &&
                //      !requestData?.form_request_for[arry[val?.name]]
                //        ?.length > 0) ||
                //    (isEditable &&
                //      requestData &&
                //      !requestData?.form_request_for[arry[val?.name]]
                //        ?.length > 0)
                //  }
                type="button"
                 className={`className="shrink-0 border  p-3 rounded-tl-md rounded-tr-md text-sm font-medium text-gray-500 mr-1"
                 ${
                    rank === "DCP"
                    ? " border-gray-400 border-b-white bg-[#FFFAFA] text-sky-700 "
                    : "hover:text-gray-700"
                }`}
                // class="shrink-0 border border-transparent p-3 text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                {/* {String(val?.name).replace("_", " ")} */}
                <span className="text-white-400">DCP</span>
              </button>
            </nav>
            <nav class="-mb-px flex gap-6">
              <button
                onClick={(e) => handleReportingToSelect("SHO")}
                //  disabled={
                //    (!isEditable &&
                //      requestData &&
                //      !requestData?.form_request_for[arry[val?.name]]
                //        ?.length > 0) ||
                //    (isEditable &&
                //      requestData &&
                //      !requestData?.form_request_for[arry[val?.name]]
                //        ?.length > 0)
                //  }
                type="button"
                 className={`className="shrink-0 border   p-3 rounded-tl-md rounded-tr-md text-sm font-medium text-gray-500 mr-1"
                 ${
                    rank === "SHO"
                    ? " border-gray-400 border-b-white bg-[#FFFAFA] text-sky-700 "
                    : "hover:text-gray-700"
                }`}
                // class="shrink-0 border border-transparent p-3 text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                {/* {String(val?.name).replace("_", " ")} */}
                <span className="text-white-400">SHO</span>
              </button>
            </nav>
          </div>
        </div>
      </div>
      <div>
        <div className="overflow-x-auto p-3 z-[-1]">
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
                  Rank
                </th>
                <th scope="col" className="px-6 py-3">
                  Username
                </th>
                <th scope="col" className="px-6 py-3">
                  Mobile No.
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>

                {/* <th scope="col" className="px-6 py-3">
              View Attachment
            </th> */}
                <th scope="col" className="px-6 py-3">
                  ACTION{" "}
                </th>
                {/* {["ACP", "DCP"].includes(rank) && (
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
                )} */}
              </tr>
            </thead>
            <tbody>
              {list?.map((item) => (
                <tr className="bg-white border-b ">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {item?.rank}
                  </th>
                  <td
                    className="px-6 py-4 font-semibold text-gray-900"
                    style={{ color: "black" }}
                  >
                    {item?.username}
                  </td>
                  <td
                    className="px-6 py-4 font-semibold"
                    style={{ color: "black" }}
                  >
                    {item?.mobile_no}
                  </td>
                  <td
                    className="px-6 py-4 font-semibold"
                    style={{ color: "black" }}
                  >
                    {item?.email}
                  </td>

                  <td className="px-6 py-4 flex gap-2">
                    {/* {["ACP", "DCP"].includes(rank) &&
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
                      )} */}
                    {/* <button
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
                    </button> */}
                    <button
                      onClick={() => {
                        navigate(`/request/edit_user/${item?.id}`);
                      }}
                      className="bg-green-300 p-2 rounded-lg font-bold"
                      style={{
                        color: "black",
                        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                      }}
                    >
                      Edit
                    </button>
                    {/* {!item?.is_otp_verified && (
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
                      )} */}
                  </td>

                  {/* {["ACP", "DCP"].includes(rank) && (
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
                      <div>
                        {item?.acp_status == "REJECT" && (
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
                  )} */}
                </tr>
              ))}
            </tbody>
          </table>
          {list?.length > 0 ? (
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
      {/* <div className="card-footer flex justify-between p-3 mb-2 mt-2">
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
      </div> */}
    </div>
  );
};

export default UpdateUser;
