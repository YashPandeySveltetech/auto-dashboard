import React, { useEffect, useState } from "react";
import RequestForm from "../requestPage";
import {  useParams } from "react-router";
import { ApiHandle } from "../../utils/ApiHandle";
import { FORM_REQUEST } from "../../utils/constants";
import { otpValidationModal } from "../../redux/reducers/modalsReducer";
import { useDispatch } from "react-redux";

const RequestView = () => {
  const { id } = useParams();
  const dispatch=useDispatch()
  const [requestData, setRequestData] = useState(null);
  useEffect(() => {
    getAllRequest();
  }, []);

  const getAllRequest = async () => {
    const res = await ApiHandle(`${FORM_REQUEST}${id}/`, {}, "GET");
    if (res.statusCode === 200) {
      setRequestData(res?.responsePayload);
      !res?.responsePayload?.is_otp_verified&& dispatch(otpValidationModal({id:res?.responsePayload?.id,form_verified:res?.responsePayload?.is_otp_verified}))
      return;
    }
  };
  return <div>{requestData && <RequestForm requestData={requestData} />}</div>;
};

export default RequestView;
