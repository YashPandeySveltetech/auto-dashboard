import { useState, useEffect } from "react";
import { ApiHandle } from "../../utils/ApiHandle";
import { FORM_REQUEST } from "../../utils/constants";
import { setLoading } from "../../redux/reducers/commonReducer";
import { useDispatch } from "react-redux";

const useRequestList = () => {
  const dispatch = useDispatch();

  const [filter, setFilter] = useState({
    case_type: "",
    case_ref: "",
    form_status: "",
    police_station: "",
    target_type: "",
    target_type_value: "",
    auto_approved: "",
  });

  const [dateRange, setDateRange] = useState({});
  const [requestList, setRequestList] = useState([]);

  const getAllRequest = async () => {
    try {
      dispatch(setLoading(true));

      let date_range = "";
      if (dateRange?.startDate && dateRange?.endDate) {
        date_range = `${dateRange.startDate}--${dateRange.endDate}`;
      }

      const queryParams = new URLSearchParams({
        case_type: filter?.case_type || "",
        fir_no: filter?.case_ref || "",
        decision_type: filter?.form_status !== "All" ? filter.form_status : "",
        is_otp_verified: true,
        sys_date: date_range,
        police_station: filter?.police_station || "",
        target_type: filter?.target_type || "",
        target_type_value: filter?.target_type_value || "",
        automatic_approved: filter?.auto_approved || "",
      });

      const res = await ApiHandle(
        `${FORM_REQUEST}?${queryParams.toString()}`,
        {},
        "get"
      );

      if (res.statusCode === 200) {
        setRequestList(res.responsePayload?.results || []);
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const clearFilter = async () => {
    try {
      dispatch(setLoading(true));
      const res = await ApiHandle(
        `${FORM_REQUEST}?is_otp_verified=true&page=1`,
        {},
        "get"
      );

      if (res.statusCode === 200) {
        setRequestList(res?.responsePayload.results || []);
        setFilter({
          req_to_provider: "",
          form_status: "",
          case_ref: "",
          case_type: "",
          police_station: "",
          target_type: "",
          target_type_value: "",
          auto_approved: "",
          fir_no: "",
        });
        setDateRange({ startDate: null, endDate: null });
      }
    } catch (error) {
      console.error("Error clearing filters:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getAllRequest();
  }, []);

  return {
    filter,
    setFilter,
    dateRange,
    setDateRange,
    requestList,
    getAllRequest,
    clearFilter,
  };
};

export default useRequestList;
