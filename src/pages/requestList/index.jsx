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
} from "../../redux/reducers/modalsReducer";
import { async } from "q";
import VisibilityIcon from "@mui/icons-material/Visibility";

function RequestList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { rank } = useSelector((state) => state.user?.userData);

  const [current,setCurrent]=useState(0)
  const [isNext,setIsNext]=useState(false)
  const [isPrevious,setIsPrevious]=useState(false)




  useEffect(() => {
    getAllRequest({active:1});
  }, []);
  const [requestList, setRequestList] = useState([]);

  const getAllRequest = async ({active=1}) => {
    const res = await ApiHandle(
      FORM_REQUEST +
        `?case_type=${filter?.case_type}&request_to_provide=${filter?.req_to_provider}&fir_no=${filter?.case_ref}&decision_type=${filter.form_status}&page=${active}`,
      {},
      "GET"
    );
    if (res.statusCode === 200) {
     
      setRequestList(res?.responsePayload);
	  if(res?.responsePayload?.next){

		
		// setCurrentpage(currentpage+1)
		setIsNext(true)
	}
	if(!res?.responsePayload?.next){
		
		
		// setCurrentpage(currentpage+1)
		setIsNext(false)
	}

	
	if(res?.responsePayload?.previous){
	
		
		// setCurrentpage(currentpage+1)
		setIsPrevious(true)
	}
	if(!res?.responsePayload?.previous){

		
		// setCurrentpage(currentpage+1)
		setIsPrevious(false)
	}
      // setIsOtp(true);
      // Toaster('success', 'OTP SENT Successfully!');

      return;
    }
  };
  const handleNext=()=>{

	
	setCurrent(current+1)
	getAllRequest({active:current+1})
  }
  const handlePrevious=()=>{
	setCurrent(current-1)
	getAllRequest({active:current-1})
  }


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
      getAllRequest();
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
     
     if(res?.responsePayload?.results[0].file){ window.open(
        process.env.REACT_APP_MEDIA_URI + res?.responsePayload?.results[0].file
      );}
      // getAllRequest()
      // Toaster("success", "Request Approved Successfully!");

      return;
    }
  };

  return (
    <>
      <FilterSection
        filter={filter}
        getAllRequest={getAllRequest}
        setFilter={setFilter}
      />
      <div>
        <div class="relative overflow-x-auto p-3">
          <table
            class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 "
            style={{ border: "1px solid black" }}
          >
            <thead
              class="text-center text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
              style={{ backgroundColor: "black", color: "white" }}
            >
              <tr>
                <th scope="col" class="px-6 py-3">
                  DATE OF REQUEST
                </th>
                <th scope="col" class="px-6 py-3">
                  NAME OF DIST/ORGN.
                </th>
                <th scope="col" class="px-6 py-3">
                  REQUESTED TYPE(CDR, IMEI,TDR,IPDR,CAF)
                </th>
                <th scope="col" class="px-6 py-3">
                  TARGET TYPE(MOBILE NO./IP ADDRESS/IMEI/CELL ID)
                </th>
                <th scope="col" class="px-6 py-3">
                  I/O Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Fir No.
                </th>
                <th scope="col" class="px-6 py-3">
                  View Attachment
                </th>
                <th scope="col" class="px-6 py-3">
                  ACTION{" "}
                </th>
                <th scope="col" class="px-6 py-3">
                  REMARKS(REASON FOR REJECTION){" "}
                </th>
              </tr>
            </thead>
            <tbody>
              {requestList?.results?.map((item) => (
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item?.created_on?.split("T")[0]}
                  </th>
                  <td
                    class="px-6 py-4 font-semibold"
                    style={{ color: "black" }}
                  >
                    {item?.district}
                  </td>
                  <td
                    class="px-6 py-4 font-semibold"
                    style={{ color: "black" }}
                  >
                    {item?.request_to_provide}
                  </td>
                  <td
                    class="px-6 py-4 font-semibold"
                    style={{ color: "black" }}
                  >
                    {item?.target_type}
                  </td>
                  <td
                    class="px-6 py-4 font-semibold"
                    style={{ color: "black" }}
                  >
                    {item?.io_name}
                  </td>
                  <td
                    class="px-6 py-4 font-semibold"
                    style={{ color: "black" }}
                  >
                    {item?.fir_no}
                  </td>
                  <td class="px-6 py-4 text-center">
                    {/* <button className='bg-green-300'>Approve</button> */}
                    <button
                      onClick={() =>
                        viewAttachment({ requets_form_id: item?.id })
                      }
                    >
                      <VisibilityIcon className="text-green-800" />
                    </button>
                    {/* <button className='bg-red-900'>Reject</button> */}
                  </td>
                  <td class="px-6 py-4 flex gap-2">
                    {(["ACP", "DCP"].includes(rank) &&
                      (item?.decision == "PENDING")&& (
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
                      ))}
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
                    {(["ACP", "DCP"].includes(rank) &&
                      (item?.decision == "PENDING")&&(
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
                      ))}
                  </td>
                  <td class="px-6 py-4">
					<div>
                    {item?.decision}
					</div>
					<div>

					
                    {item?.decision == "REJECT" && (
                      <button
                        onClick={() => dispatch(openViewLogModal(item?.id))}
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="card-footer flex justify-between p-3 mb-2 mt-2">

       {isPrevious? <button  onClick={()=>handlePrevious()}className="bg-green-400 px-4 py-2 rounded-lg font-bold text-black shadow-md">
          PREV
        </button>:<div></div>}
       {isNext&& <button onClick={()=>handleNext()} className="bg-green-400 px-4 py-2 rounded-lg font-bold text-black shadow-md">
          NEXT
        </button>}
      </div>
    </>
  ); 
}

export default RequestList;
