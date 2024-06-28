import React, {useEffect, useState} from "react";
import CommonDropDown from "../../components/dropdown";
import Input from "../../components/input";
import Datepicker from "react-tailwindcss-datepicker";
import {GET_POLICE_STATION_LIST} from "../../utils/constants";
import {ApiHandle} from "../../utils/ApiHandle";
import {useSelector} from "react-redux";
import {FaDownload} from "react-icons/fa";
import Select from "react-select";
import {CASE_TYPE} from "../../utils/constants";
import {useLocation} from "react-router-dom";

function FilterSection({
  filter,
  setFilter,
  getAllRequest,
  dateRange,
  setDateRange,
  exportReport,
  clearFilter,
  PdfExport,
  pdfHeaderModal,
}) {
  const {rank} = useSelector((state) => state.user?.userData);
  const [caseType, setCaseType] = useState([]);
  const location = useLocation();

  const Export_Option = [
    {id: "pdf", label: "PDF", name: "Export PDF"},
    {id: "excel", label: "Excel", name: "Export Excel"},
  ];

  const from_status_option = [
    // { id: 1, name: "All", value: "All" },
    {id: 1, name: "PENDING", value: "PENDING"},
    {id: 2, name: "APPROVE", value: "APPROVE"},
    {id: 3, name: "REJECT", value: "REJECT"},
  ];

  const req_to_provider_option = [
    {id: 1, name: "CDR", value: "CDR"},
    {id: 2, name: "IPDR", value: "IPDR"},
    {id: 3, name: "TDR", value: "TDR"},
    {id: 4, name: "CAF", value: "CAF"},
  ];
  const target_type_option = [
    {id: 1, name: "MOBILE_NUMBER", value: "MOBILE_NUMBER"},
    {id: 2, name: "IMEI_NUMBER", value: "IMEI_NUMBER"},
    {id: 3, name: "CELL_ID", value: "CELL_ID"},
    {id: 4, name: "IP_ADDRESS", value: "IP_ADDRESS"},
    {id: 5, name: "ILD", value: "ILD"},
  ];
  const [policeStation, setPoliceStation] = useState([]);
  useEffect(() => {
    getPoliceStaionList();
    getCaseType();
  }, []);
  const getPoliceStaionList = async () => {
    const res = await ApiHandle(`${GET_POLICE_STATION_LIST}`, {}, "GET");
    if (res.statusCode === 200) {
      const data = res?.responsePayload || [];
      const arr = data.map((station) => ({
        ...station,
        value: station.id,
        label: station.name, // Assuming 'name' is the label for the dropdown options
      }));
      setPoliceStation(arr);
    } else {
      console.error("Failed to fetch police stations:", res.error); // Handle error cases if necessary
    }

    return;
  };

  const handleValueChange = (newValue) => {
    setDateRange(newValue);
  };

  const [selectedOption, setSelectedOption] = useState("");
  const handleExportChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    setFilter({...filter, [e.target.name]: selectedValue});
  };
  const downloadData = () => {
    if (selectedOption === "pdf") {
      pdfHeaderModal();
      // PdfExport();
    } else if (selectedOption === "excel") {
      exportReport();
    } else {
      console.log("Invalid option selected");
    }
  };
  const autoApprovedOptions = [
    {id: true, name: "Yes"},
    {id: false, name: "No"},
    {id: "", name: "All"},
  ];

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);

    let selectedPoliceStation = "";
    selected.map((e) => {
      selectedPoliceStation = e.name + "," + selectedPoliceStation;
    });
    setFilter({...filter, police_station: selectedPoliceStation});

    // setFilter()
  };
  const getCaseType = async () => {
    try {
      const res = await ApiHandle(`${CASE_TYPE}`, "", "GET");
      if (res?.statusCode === 200) {
        let data = res?.responsePayload?.map((val) => ({
          id: val.id,
          value: val.name,
          name: val.name,
        }));
        setCaseType(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="inner-div-filter">
      <div className=" flex-flex-row w-[100%]">
        <div className="flex flex-col w-[100%] justify-between p-2 items-center">
          {/* <div>
        <CommonDropDown
          name={"req_to_provider"}
          options={req_to_provider_option}
          onChange={(e) => {
            setFilter({ ...filter, [e.target.name]: e.target.value });
          }}
          label="Request to provider"
        />
      </div> */}
          <div className="w-full flex justify-between gap-4">
            {["/unverified-form", "/rejected-form"].includes(
              location.pathname
            ) ? (
              ""
            ) : (
              <div className="w-full">
                <label htmlFor=""> Form Status</label>
                <CommonDropDown
                  name={"form_status"}
                  options={from_status_option}
                  onChange={(e) => {
                    setFilter({
                      ...filter,
                      [e.target.name]:
                        e.target.value == "All" ? "" : e.target.value,
                    });
                  }}
                  label={""}
                  value={filter["form_status"]}
                />
              </div>
            )}
            {/* //////////////////// */}
            <div className="w-full">
              <label htmlFor=""> Select Date</label>
              <div className="text-black-900 border border-gray-300 rounded-lg bg-blue-100 focus:ring-blue-500 focus:border-blue-500">
                <Datepicker
                  primaryColor={"teal"}
                  value={dateRange}
                  onChange={handleValueChange}
                  showShortcuts={true}
                  classNames="border border-solid"
                />
              </div>
            </div>
          </div>

          <div className="w-full flex justify-between gap-4">
            <div className="w-full">
              <label htmlFor=""> FIR NO.</label>
              <Input
                name="case_ref"
                onChange={(e) => {
                  setFilter({...filter, [e.target.name]: e.target.value});
                }}
                label=""
                value={filter.case_ref}
              />
            </div>
            {/* <div className="w-full">
              <label htmlFor=""> Case Type</label>

              <Input
                name="case_type"
                onChange={(e) => {
                  setFilter({...filter, [e.target.name]: e.target.value});
                }}
                label=""
              />
            </div> */}
            <div className="w-full ">
              <label className="font ">Crime Head:</label>

              <CommonDropDown
                name="case_type"
                options={caseType}
                value={filter["case_type"]}
                onChange={(e) => {
                  setFilter({...filter, [e.target.name]: e.target.value});
                }}
                label=""
                // isDisabled={!isEditable && requestData}
              />

              {/* <CommonDropDown
                  name={"form_status"}
                  options={from_status_option}
                  onChange={(e) => {
                    setFilter({
                      ...filter,
                      [e.target.name]:
                        e.target.value == "All" ? "" : e.target.value,
                    });
                  }}
                  label={""}
                  value={filter["form_status"]}
                /> */}
            </div>
          </div>

          <div className="flex justify-between w-full gap-4">
            <div className="w-full">
              {["DCP"].includes(rank) ? (
                <CommonDropDown
                  name={"auto_approved"}
                  options={autoApprovedOptions}
                  checkId={true}
                  onChange={(e) => {
                    setFilter({...filter, [e.target.name]: e.target.value});
                  }}
                  label="Auto Approved"
                  value={filter.auto_approved}
                />
              ) : (
                ""
              )}
            </div>
            {/* <div className="flex w-[100%] justify-between "> */}
            {/* <div className="w-full">
              {["DCP"].includes(rank) && (
                <CommonDropDown
                  name={"police_station"}
                  options={policeStation}
                  checkId={true}
                  onChange={(e) => {
                    setFilter({ ...filter, [e.target.name]: e.target.value });
                  }}
                  label="Police Station"
                />
              )}
            </div> */}
            <div className="w-full">
              {["DCP"].includes(rank) && (
                // <CommonDropDown
                //   name={"police_station"}
                //   options={policeStation}
                //   checkId={true}
                //   onChange={(e) => {
                //     setFilter({ ...filter, [e.target.name]: e.target.value });
                //   }}
                //   label="Police Station"
                // />
                <>
                  <label htmlFor=""> Police Station</label>

                  <Select
                    options={policeStation}
                    isMulti
                    onChange={handleSelectChange}
                    value={selectedOptions}
                    label={selectedOptions}
                    className="bg-blue-300"
                  />
                </>
              )}
            </div>
            {/* </div> */}
          </div>
          <div className="flex w-full justify-between gap-4  items-center">
            <div className="w-full">
              <label htmlFor=""> Search Type</label>
              <CommonDropDown
                name={"target_type"}
                options={target_type_option}
                onChange={(e) => {
                  setFilter({...filter, [e.target.name]: e.target.value});
                }}
                label=""
                value={filter["target_type"]}
              />
            </div>

            <div className="w-full  ">
              {filter["target_type"] !== "" && (
                <>
                  <label htmlFor=""> Select Target Type Value</label>
                  <Input
                    type="text"
                    value={filter["target_type_value"]}
                    required={true}
                    name="target_type_value"
                    onChange={(e) =>
                      setFilter({...filter, [e.target.name]: e.target.value})
                    }
                    className="w-[100%]"
                  />
                </>
              )}
            </div>
          </div>

          <div className=" flex mt-4 w-[100%] justify-around">
            <button
              onClick={getAllRequest}
              style={{
                width: "100px",
                border: "2px solid green",
                borderRadius: "20px",
                height: "40px",
                marginTop: "20px",
              }}
              className="m-5 mt-10"
            >
              <b>Search</b>
            </button>

            <button
              onClick={clearFilter}
              type="button"
              style={{
                width: "100px",
                border: "2px solid green",
                borderRadius: "20px",
                height: "40px",
                marginTop: "20px",
              }}
              className="m-5 mt-10"
            >
              <b>Clear Filter</b>
            </button>

            {["DCP"].includes(rank) && (
              <div style={{marginRight: "0", display: "flex"}}>
                <CommonDropDown
                  name={"Export_Data"}
                  options={Export_Option}
                  checkId={true}
                  onChange={handleExportChange}
                  label="Download Data"
                />
                <FaDownload
                  onClick={downloadData}
                  size={20}
                  className="download-icon"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterSection;
