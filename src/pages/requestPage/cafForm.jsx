import React, { useCallback, useState } from "react";
import DropDown from "../../components/dropdown";
import Input from "../../components/input";
import Radio from "../../components/radio";
function CAFform() {
  return (
    <div>
       <div className="flex gap-5 items-center">
            <Input label={"Mobile no. "} />
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
            </div>
    </div>
  )
}

export default CAFform