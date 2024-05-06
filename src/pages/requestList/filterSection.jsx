import React, { useEffect, useState } from "react";
import CommonDropDown from "../../components/dropdown";
import Input from "../../components/input";
import Datepicker from "react-tailwindcss-datepicker"; 
import {  GET_POLICE_STATION_LIST } from "../../utils/constants";
import { ApiHandle } from "../../utils/ApiHandle";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

function FilterSection({ filter, setFilter, getAllRequest, dateRange, setDateRange, exportReport, clearFilter }) {
    const { rank } = useSelector((state) => state.user?.userData);
    const location = useLocation();

    const from_status_option = [
        { id: 1, name: "PENDING", value: "PENDING" },
        { id: 2, name: "APPROVE", value: "APPROVE" },
        { id: 3, name: "REJECT", value: "REJECT" },
    ];
    const req_to_provider_option = [
        { id: 1, name: "CDR", value: "CDR" },
        { id: 2, name: "IPDR", value: "IPDR" },
        { id: 3, name: "TDR", value: "TDR" },
        { id: 4, name: "CAF", value: "CAF" },
    ];
    const target_type_option = [
        { id: 1, name: "MOBILE_NUMBER", value: "MOBILE_NUMBER" },
        { id: 2, name: "IMEI_NUMBER", value: "IMEI_NUMBER" },
        { id: 3, name: "CELL_ID", value: "CELL_ID" },
        { id: 4, name: "IP_ADDRESS", value: "IP_ADDRESS" },
        { id: 5, name: "ILD", value: "ILD" },
    ];
    const [policeStation, setPoliceStation] = useState([]);

    useEffect(() => {
        getPoliceStationList();
    }, []);

    const getPoliceStationList = async () => {
        const res = await ApiHandle(`${GET_POLICE_STATION_LIST}`, {}, "GET");
        if (res.statusCode === 200) {
            const data = res?.responsePayload;

            let arr = [];
            if (data.length) {
                for (let i = 0; i <= data.length; i++) {
                    arr.push({ ...data[i], ['value']: data[i]?.id });
                }
                setPoliceStation(arr);
            }
            return;
        }
    };

    const handleValueChange = newValue => {
        setDateRange(newValue);
    };

    return (
        <div className="flex flex-col md:flex-row md:flex-wrap w-full">
            <div className="flex flex-col w-full md:w-3/4">
                <div className="flex flex-wrap justify-between p-5">
                    {["/unverified-form","/rejected-form"].includes(location.pathname) ? null : (
                        <div>
                            <label htmlFor=""> Form Status</label>
                            <CommonDropDown
                                name={"form_status"}
                                options={from_status_option}
                                onChange={(e) => setFilter({ ...filter, [e.target.name]: e.target.value })}
                                label=""
                                value={filter["form_status"]}
                            />
                        </div>
                    )}
                    <div>
                        <label htmlFor=""> Select Date</label>
                        <Datepicker
                            primaryColor={"blue"}
                            value={dateRange}
                            onChange={handleValueChange}
                            showShortcuts={true}
                        />
                    </div>
                    <div>
                        <label htmlFor=""> Select Type</label>
                        <CommonDropDown
                            name={"target_type"}
                            options={target_type_option}
                            onChange={(e) => setFilter({ ...filter, [e.target.name]: e.target.value })}
                            label=""
                            value={filter["target_type"]}
                        />
                    </div>
                    {filter["target_type"] !== "" && (
                        <div>
                            <label htmlFor="" className="mb-1"> Select Target Type Value</label>
                            <Input
                                type="text"
                                value={filter["target_type_value"]}
                                required={true}
                                name="target_type_value"
                                onChange={(e) => setFilter({ ...filter, [e.target.name]: e.target.value })}
                                className="w-full"
                            />
                        </div>
                    )}
                    <button
                        onClick={getAllRequest}
                        style={{ width: "100px", border: "2px solid green", borderRadius: "20px", height: "40px", marginTop: "20px" }}
                        className="m-5 mt-10"
                    >
                        <b>Search</b>
                    </button>
                    {['DCP'].includes(rank) && (
                        <button
                            onClick={exportReport}
                            style={{ width: "100px", border: "2px solid green", borderRadius: "20px", height: "40px", marginTop: "20px" }}
                            className="m-5 mt-10"
                            disabled={dateRange?.startDate === ""}
                        >
                            <b>Export File</b>
                        </button>
                    )}
                    <button
                        onClick={clearFilter}
                        type="button"
                        style={{ width: "100px", border: "2px solid green", borderRadius: "20px", height: "40px", marginTop: "20px" }}
                        className="m-5 mt-10"
                    >
                        <b>Clear Filter</b>
                    </button>
                </div>
            </div>
            <div className="flex w-full md:w-1/4 justify-between p-5">
                {['DCP'].includes(rank) && (
                    <div>
                        <CommonDropDown
                            name={"police_station"}
                            options={policeStation}
                            checkId={true}
                            onChange={(e) => setFilter({ ...filter, [e.target.name]: e.target.value })}
                            label="Police Station"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default FilterSection;
