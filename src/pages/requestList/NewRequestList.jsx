import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import FilterPanel from "./FilterPanel";
import Title from "../../utils/Title";
import RequestTable from "./RequestTable";
import useRequestList from "./useRequestList";

const NewRequestList = () => {
  const navigate = useNavigate();

  const { rank } = useSelector((state) => state.user?.userData);
  console.log(rank, "rank");

  // Use custom hook for state management
  const {
    filter,
    setFilter,
    dateRange,
    setDateRange,
    requestList,
    getAllRequest,
    clearFilter,
  } = useRequestList();

  const handleView = (item) => {
    navigate(`/request/view/${item?.request_to_provide}/${item?.id}`);
  };

  const columns = [
    { key: "updated_on", label: "DATE OF REQUEST" },
    { key: "added_by", label: "Police Station" },
    { key: "io_name", label: "Requested Officer Name" },
    { key: "fir_no", label: "FIR No." },
    {
      key: "request_to_provide",
      label: "REQUESTED TYPE (CDR, IMEI, TDR, IPDR, CAF)",
    },
    {
      key: "target_type",
      label: "TARGET TYPE (MOBILE NO./IP ADDRESS/IMEI/CELL ID)",
    },
  ];

  if (["ACP", "DCP"].includes(rank)) {
    columns.push({ key: "remarks", label: "REMARKS (REASON FOR REJECTION)" });
  } else {
    columns.push({ key: "acp_status", label: "ACP Status" });
  }

  if (!["DCP"].includes(rank)) {
    columns.push({ key: "dcp_status", label: "DCP Status" });
  }

  return (
    <div>
      <Title text={"Dashboard"} />
      <FilterPanel
        filter={filter}
        getAllRequest={getAllRequest}
        setFilter={setFilter}
        dateRange={dateRange}
        setDateRange={setDateRange}
        clearFilter={clearFilter}
      />
      <RequestTable
        columns={columns}
        data={requestList}
        handleView={handleView}
      />
    </div>
  );
};

export default NewRequestList;
