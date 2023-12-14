import React, { useEffect, useState } from "react";
import RequestForm from "../requestPage";
import { useLocation, useParams } from "react-router";
import { ApiHandle } from "../../utils/ApiHandle";
import { FORM_REQUEST } from "../../utils/constants";

const RequestView = () => {
  const { id } = useParams();

  const [requestData, setRequestData] = useState(null);
  useEffect(() => {
    getAllRequest();
  }, []);
  const getAllRequest = async () => {
    const res = await ApiHandle(`${FORM_REQUEST}${id}/`, {}, "GET");
    if (res.statusCode === 200) {
      setRequestData(res.responsePayload);
      return;
    }
  };
  return <div>{requestData && <RequestForm requestData={requestData} />}</div>;
};

export default RequestView;
