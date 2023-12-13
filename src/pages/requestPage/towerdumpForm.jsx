import React, { useCallback, useState } from "react";
import DropDown from "../../components/dropdown";
import Input from "../../components/input";
import Radio from "../../components/radio";

function TowerDumpForm() {
  const [tdrModelList, settdrModelList] = useState([
    {
      date_from: "",
      date_to: "",
      time_from: "",
      time_to: "",
      cell_id: "",
    },
  ]);

  const [tdrModel, setTdrModel] = useState({
    // case_ref: "",
    // case_type: "",
    cell_data: tdrModelList,
  });

  const tdrModelListChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...tdrModelList];
    list[index][name] = value;
    settdrModelList(list);
  };

  const tdrAddClick = () => {
    settdrModelList([
      ...tdrModelList,
      {
        ip: "",
        port: "",
        date: "",
        time: "",
      },
    ]);
  };

  const tdrRemoveClick = (index) => {
    const list = [...tdrModelList];
    list.splice(index, 1);
    settdrModelList(list);
  };
  const CellID = () => (
    <>
      {tdrModelList.map((val, i) => (
        <>
          <div key={i} className="flex gap-5 items-center justify-start">
            <Input
              label={"CELL ID"}
              type="text"
              
              name="CELL_ID "
             
            />
           
            {/* date  */}
            <div className="input-group flex items-center justify-start gap-5 m-3">
              <label className="form-label me-4 col-md-1 font-bold">
                Date :
              </label>

              <div className=" flex gap-5">
                <div className="w-15  input-group flex items-center gap-3">
                  <span className="input-group-text font-bold">From</span>
                  <Input label={" "} type="date" />
                </div>
              </div>
              <div className="col-md-3 ms-4">
                <div className="w-15  input-group flex items-center gap-3">
                  <span className="input-group-text font-bold">To</span>
                  <Input label={" "} type="date" />
                </div>
              </div>
            </div>

            {/*  Time */}
            <div className="flex items-center justify-start gap-5 m-3 ">
              <label className="form-label me-4 col-md-1 font-bold">
                Time :
              </label>

              <div className="col-md-3">
                <div className="flex items-center gap-3 ">
                  <span className="input-group-text font-bold">From</span>
                  <Input label={" "} type="time" name="time_from" />
                </div>
              </div>
              <div className="col-md-3 ms-4">
                <div className="flex items-center gap-3 ">
                  <span className="input-group-text font-bold">To</span>
                  <Input label={" "} type="time" name="time_to" />
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <select
                name="select_tsp"
                //   onChange={handleChange}
                className="form-control col-md-4"
                required
              >
                <option value="select " className="text-uppercase">
                  Select TSP
                </option>
                {/* {getTSPList.map((tspVal) => {
                        return (
                          <option
                            key={tspVal?.id}
                            value={tspVal?.id}
                            className="text-uppercase"
                            required
                          >
                            {tspVal?.name}
                          </option>
                        );
                      })} */}
              </select>
            </div>

            <div>
              <div className="flex gap-5">
                {tdrModelList.length !== 1 && (
                  <button
                    className="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={() => tdrRemoveClick(i)}
                  >
                    Remove
                  </button>
                )}
                {tdrModelList.length - 1 === i && (
                  <button
                    className="text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={tdrAddClick}
                  >
                    Add
                  </button>
                )}
              </div>
            </div>
          </div>
          <hr className="font-bold" />
        </>
      ))}
    </>
  );
  return (
    <div>
      {CellID()}
    </div>
  )
}

export default TowerDumpForm