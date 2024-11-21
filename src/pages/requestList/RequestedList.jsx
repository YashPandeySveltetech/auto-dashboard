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
import { useDispatch, useSelector } from "react-redux";

import { setLoading } from "../../redux/reducers/commonReducer";
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
import Title from "../../utils/Title";
import { EyeFill } from "react-bootstrap-icons";
import { Pagination } from "@mui/material";
import CustomPagination from "../../components/pagination/CustomPagination";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import Modal from "react-modal";
import FilterPanel from "./FilterPanel";

function RequestList() {
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_API_KEY;
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const { rank } = useSelector((state) => state.user?.userData);
  const Loading = useSelector((state) => state?.common?.loading);
  const { updateReqList, isDcpPassword, dcpStatus } = useSelector(
    (state) => state.modal
  );
  const [isNext, setIsNext] = useState(false);
  const [isPrevious, setIsPrevious] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  //   const [value, setValue] = useState({
  //     startDate: new Date(),
  //     endDate: new Date().setMonth(11)
  //     });

  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
    const res = await ApiHandle(
      FORM_REQUEST +
        `?case_type=${filter?.case_type}&fir_no=${
          filter?.case_ref
        }&decision_type=${
          filter.form_status == "All" ? "" : filter.form_status
        }&page=${active}&is_otp_verified=${true}&sys_date=${date_range}&police_station=${
          filter?.police_station
        }&target_type=${filter?.target_type}&target_type_value=${
          filter?.target_type_value
        }&automatic_approved=${filter?.auto_approved}`,
      {},
      "get"
    );

    if (res.statusCode === 200) {
      setRequestList(res?.responsePayload.results);
      setTotalPageCount(res?.responsePayload?.count);
      dispatch(setLoading(false));
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
  //   setCurrent((prev) => prev + 1);
  //   getAllRequest({ active: current + 1 });
  // };

  // const handlePrevious = () => {
  //   setCurrent((prev) => prev - 1);
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
    police_station: "",
    target_type: "",
    target_type_value: "",
  });

  useEffect(() => {
    if (isDcpPassword) {
      approveRequest({
        requestId: dcpStatus?.id,
        approved_desion_id: dcpStatus?.approve_decision_id,
      });
    }
  }, [isDcpPassword]);
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
      "get"
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
  const handleVerify = (item) => {
    if (["DCP"].includes(rank)) {
      dispatch(openDcpPasswordVerifyModal(item));
    } else {
      approveRequest({
        requestId: item?.id,
        approved_desion_id: item?.approve_decision_id,
      });
    }
  };

  const [tableData, setTableData] = useState([]);
  const [date, setDate] = useState([]);
  const [selectedHeaders, setSelectedHeaders] = useState({
    "Date of Request": true,
    "Police Station": true,
    "Requesting Officer": true,
    "FIR-Complaint": true,
    "FIR No": true,
    "Target Type": true,
    "Requested For": true,
    "Requested Number": true,
    "AUTOMATIC APPROVE": true,
    "Date Of Approval": true,
  });

  const allHeaders = [
    "Date of Request",
    "Date Of Approval",
    "Police Station",
    "Requesting Officer",
    "FIR-Complaint",
    "FIR No",
    "Target Type",
    "Requested For",
    "Requested Number",
    "AUTOMATIC APPROVE",
  ];

  const handleCheckboxChange = (header) => {
    setSelectedHeaders((prevState) => ({
      ...prevState,
      [header]: !prevState[header],
    }));
  };

  console.log(filter, "ghdgsjdgjsgh");
  useEffect(() => {
    if (tableData.length > 0) {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // Draw the border
      const margin = 3;
      doc.rect(
        margin,
        margin,
        pageWidth - 2 * margin,
        pageHeight - 2 * margin,
        "S"
      );

      // Add form data to PDF
      let yOffset = 13;
      doc.setFontSize(10);

      if (filter.form_status) {
        doc.setFont("helvetica", "bold");
        doc.text(`Form Status:`, 10, yOffset);
        doc.setFont("helvetica", "normal");
        doc.text(` ${filter.form_status}`, 50, yOffset);
        yOffset += 10;
      }

      if (filter.target_type) {
        doc.setFont("helvetica", "bold");
        doc.text(`Target Type:`, 10, yOffset);
        doc.setFont("helvetica", "normal");
        doc.text(` ${filter.target_type}`, 50, yOffset);
        yOffset += 10;
      }

      doc.setFont("helvetica", "bold");
      doc.text(`Date Range:`, 10, yOffset);
      doc.setFont("helvetica", "normal");
      doc.text(` ${date}`, 50, yOffset);
      yOffset += 10;

      if (filter.case_ref) {
        doc.setFont("helvetica", "bold");
        doc.text(`FIR NO:`, 10, yOffset);
        doc.setFont("helvetica", "normal");
        doc.text(` ${filter.case_ref}`, 50, yOffset);
        yOffset += 10;
      }

      if (filter.case_type) {
        doc.setFont("helvetica", "bold");
        doc.text(`Crime Head:`, 10, yOffset);
        doc.setFont("helvetica", "normal");
        doc.text(` ${filter.case_type}`, 50, yOffset);
        yOffset += 10;
      }

      if (filter.auto_approved) {
        doc.setFont("helvetica", "bold");
        doc.text(`Auto Approved:`, 10, yOffset);
        doc.setFont("helvetica", "normal");
        doc.text(` ${filter.auto_approved}`, 50, yOffset);
        yOffset += 10;
      }

      if (filter.police_station) {
        doc.setFont("helvetica", "bold");
        doc.text(`Police Station:`, 10, yOffset);
        doc.setFont("helvetica", "normal");
        doc.text(` ${filter.police_station}`, 50, yOffset);
        yOffset += 10;
      }

      if (filter.target_type_value) {
        doc.setFont("helvetica", "bold");
        doc.text(`Target Type Value:`, 10, yOffset);
        doc.setFont("helvetica", "normal");
        doc.text(` ${filter.target_type_value}`, 50, yOffset);
        yOffset += 10;
      }

      const filteredHeaders = allHeaders.filter(
        (header) => selectedHeaders[header]
      );
      const tableDataFormatted = tableData.map((item) =>
        filteredHeaders.map((header) => {
          switch (header) {
            case "Date of Request":
              return item.DATE_OF_REQUEST;
            case "Date Of Approval":
              return new Date(item.Date_OF_APPROVAL).toLocaleString("en-US");
            case "Police Station":
              return item.POLICE_STATION;
            case "Requesting Officer":
              return item.REQUESTING_OFFICER;
            case "FIR-Complaint":
              return item.FIR_COMPLAINT;
            case "FIR No":
              return item.FIR_NO;
            case "Target Type":
              return item.TARGET_TYPE === "MOBILE_NUMBER" ? "Mobile" : "IMEI";
            case "Requested For":
              return item.REQUESTED_FOR;
            case "Requested Number":
              return item.REQUESTED_NUMBER_VALUE;
            case "AUTOMATIC APPROVE":
              return item.AUTOMATIC_APPROVE === false ? "False" : "True";
            default:
              return "";
          }
        })
      );

      const margins = 4 + 5;
      const availableWidth = pageWidth - margins;
      const numColumns = filteredHeaders.length;
      const cellWidth = availableWidth / numColumns;

      doc.autoTable({
        startY: yOffset,
        head: [filteredHeaders],
        body: tableDataFormatted,
        margin: { left: 4, right: 5 },
        headStyles: {
          fillColor: "#000000",
          textColor: "#FFFFFF",
          fontStyle: "bold",
          fontSize: 8,
        },
        styles: {
          overflow: "linebreak",
          cellWidth: "wrap",
          minCellHeight: 10,
          fontSize: 8,
        },
        columnStyles: (() => {
          let styles = {};
          for (let i = 0; i < numColumns; i++) {
            styles[i] = { cellWidth: cellWidth };
          }
          return styles;
        })(),
      });

      doc.save("form_and_table.pdf");
    }
  }, [tableData]);

  const pdfHeaderModal = () => {
    setModalIsOpen(true);
    // console.log("modal clik");
  };

  const PdfExport = async () => {
    setModalIsOpen(false);
    dispatch(setLoading(true));
    let date_range =
      dateRange.startDate && dateRange.endDate && "--" + dateRange.endDate;
    date_range = dateRange.startDate + date_range;
    setDate(date_range);
    if (date_range === 0) {
      dateRange = "";
    } else if (dateRange?.startDate === "") {
      Toaster("", "Please Select Date");
      dispatch(setLoading(false));
    } else {
      const res = await ApiHandle(
        EXPORT_DCP_FILE +
          `?case_type=${filter?.case_type}&is_otp_verified=${true}&fir_no=${
            filter?.case_ref
          }&decision_type=${
            filter.form_status == "All" ? "" : filter.form_status
          }&sys_date=${date_range}&police_station=${
            filter?.police_station
          }&target_type=${filter?.target_type}&target_type_value=${
            filter?.target_type_value
          }&automatic_approved=${filter?.auto_approved}`,
        {},
        "get"
      );
      if (Object.keys(res?.responsePayload?.details).length > 0) {
        setTableData(res?.responsePayload?.details);
        dispatch(setLoading(false));
      } else {
        Toaster("", "No Data Found");
        dispatch(setLoading(false));
      }
    }
  };

  const exportReport = async () => {
    dispatch(setLoading(true));
    let date_range =
      dateRange.startDate && dateRange.endDate && "--" + dateRange.endDate;
    date_range = dateRange.startDate + date_range;

    if (date_range === 0) {
      dateRange = "";
    } else if (dateRange?.startDate === "") {
      Toaster("", "Please Select Date");
      dispatch(setLoading(false));
    } else {
      const res = await ApiHandle(
        EXPORT_DCP_FILE +
          `?case_type=${filter?.case_type}&is_otp_verified=${true}&fir_no=${
            filter?.case_ref
          }&decision_type=${
            filter.form_status == "All" ? "" : filter.form_status
          }&sys_date=${date_range}&police_station=${
            filter?.police_station
          }&target_type=${filter?.target_type}&target_type_value=${
            filter?.target_type_value
          }&automatic_approved=${filter?.auto_approved}`,
        {},
        "get"
      );

      if (res?.responsePayload?.details?.length > 0) {
        exportExcel(res?.responsePayload?.details);
        dispatch(setLoading(false));
      } else {
        Toaster("", "No Data Found");
      }
    }
  };
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
    FileSaver.saveAs(
      fileData,
      "file" + new Date().toLocaleDateString("en-GB") + fileExtension
    );
  };
  const clearFilter = async ({ active = 1 }) => {
    const res = await ApiHandle(
      FORM_REQUEST +
        `?decision_type=&page=${active}&is_otp_verified=${true}&sys_date=`,
      {},
      "get"
    );
    if (res.statusCode === 200) {
      setRequestList(res?.responsePayload.results);
      setTotalPageCount(res?.responsePayload?.count);
      setCurrentPage(0);

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

  // const handlePageChange = ({selected}) => {
  //   const selectedPageIndex = selected;
  //   setCurrent(selectedPageIndex + 1); // Since selectedPageIndex is zero-based index
  //   getAllRequest({active: selectedPageIndex + 1}); // Ensure selectedPageIndex is a number
  // };

  const filtersection = useCallback(() => {
    return (
      <FilterPanel
        filter={filter}
        getAllRequest={getAllRequest}
        setFilter={setFilter}
        dateRange={dateRange}
        setDateRange={setDateRange}
        exportReport={exportReport}
        clearFilter={clearFilter}
        PdfExport={PdfExport}
        pdfHeaderModal={pdfHeaderModal}
      />
    );
  }, [filter, dateRange]);

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Select Headers"
        style={{
          content: {
            width: "40%",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            backgroundColor: "#f7f7f7",
            borderRadius: "10px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
            opacity: "1",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(5px)",
          },
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
          <b>
            <u>Select Headers to Export</u>
          </b>
        </h1>
        <div style={{ marginBottom: "20px", marginLeft: "30px" }}>
          {Object.keys(selectedHeaders).map((header) => (
            <div key={header} style={{ marginBottom: "10px" }}>
              <input
                type="checkbox"
                checked={selectedHeaders[header]}
                onChange={() => handleCheckboxChange(header)}
                style={{ marginRight: "10px" }}
              />
              <label>{header}</label>
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginTop: "10%",
          }}
        >
          <button
            onClick={PdfExport}
            style={{
              padding: "10px 20px",
              border: "none",
              backgroundColor: "#007BFF",
              color: "#FFF",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#0056b3")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#007BFF")
            }
          >
            Export PDF
          </button>
          <button
            onClick={() => setModalIsOpen(false)}
            style={{
              padding: "10px 20px",
              border: "1px solid #ccc",
              backgroundColor: "#FFF",
              color: "#333",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#f1f1f1")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#FFF")
            }
          >
            Cancel
          </button>
        </div>
      </Modal>

      <Title text={"Dashboard"} />
      <div className="outer-div-whole mx-auto ">
        {filtersection()}

        <div className="inner-div-table">
          <div className=" overflow-x-auto p-3 z-[-1]">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 border">
              <thead
                className="text-center text-xs text-gray-700 uppercase bg-gray-50"
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
              <tbody className="text-center">
                {requestList?.map((item) => (
                  <tr className="bg-white border-b ">
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap d"
                      style={{ color: "black" }}
                    >
                      {new Date(item?.created_on).toLocaleString("en-GB")}
                    </td>
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

                    <td className="px-6 py-4 flex gap-2">
                      {["ACP", "DCP"].includes(rank) &&
                        item?.decision == "PENDING" && (
                          <button
                            onClick={() => handleVerify(item)}
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
                      <td className="px-6 py-4  ">
                        {/* <div>{item?.decision}</div> */}
                        <div className="flex gap-2 justify-center items-center">
                          <span
                            className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ring-pink-700/10
    ${
      item?.decision === "REJECT"
        ? "bg-red-100 text-red-700"
        : item?.decision === "PENDING"
        ? "bg-yellow-100 text-yellow-700"
        : item?.decision === "APPROVE"
        ? "bg-green-100 text-yellow-700"
        : ""
    }`}
                          >
                            {item?.decision}
                          </span>

                          <div>
                            {item?.decision == "REJECT" && (
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
                        </div>
                      </td>
                    )}

                    {!["ACP", "DCP"].includes(rank) && (
                      <td>
                        <div className="flex gap-2 justify-center items-center">
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
                            {item?.acp_status == "REJECT" && (
                              <button
                                onClick={() => {
                                  dispatch(openViewLogModal(item?.id));
                                  dispatch(updateRequestList(false));
                                }}
                                //   className="bg-red-900 p-2 rounded-lg font-bold"
                                //   style={{
                                //     color: "white",
                                //     boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                                //   }}
                              >
                                <EyeFill color="blue" title="view log" />
                              </button>
                            )}
                          </div>
                        </div>
                        {/* {item?.acp_status == "REJECT" && (
                            <button
                              onClick={() => {
                                dispatch(openViewLogModal(item?.id));
                                dispatch(updateRequestList(false));
                              }}
                              //   className="bg-red-900 p-2 rounded-lg font-bold"
                              //   style={{
                              //     color: "white",
                              //     boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                              //   }}
                            >
                              <EyeFill color="blue" title="view log" />
                            </button>
                          )} */}
                      </td>
                    )}

                    {!["DCP"].includes(rank) && (
                      <td className="px-6 py-4 flex gap-2 justify-center items-center">
                        {/* <div>{item?.dcp_status}</div> */}
                        <span
                          className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ring-pink-700/10
    ${
      item?.dcp_status === "REJECT"
        ? "bg-red-100 text-red-700"
        : item?.dcp_status === "PENDING"
        ? "bg-yellow-100 text-yellow-700"
        : item?.dcp_status === "APPROVE"
        ? "bg-green-100 text-yellow-700"
        : ""
    }`}
                        >
                          {item?.dcp_status}
                        </span>
                        <div>
                          {item?.dcp_status == "REJECT" && (
                            <button
                              onClick={() => {
                                dispatch(openViewLogModal(item?.id));
                                dispatch(updateRequestList(false));
                              }}
                              //   className="bg-red-900 p-2 rounded-lg font-bold"
                              //   style={{
                              //     color: "white",
                              //     boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                              //   }}
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

            {requestList.length > 0 ? (
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
      <div className=" flex justify-center mb-2 mt-2">
        {/* {isPrevious ? (
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
        )} */}

        <CustomPagination
          totalItems={totalPageCount}
          getAllRequest={getAllRequest}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
}

export default RequestList;
