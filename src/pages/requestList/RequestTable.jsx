import React from "react";
import CustomTable from "../../components/customTable/CustomTable";

const RequestTable = ({ columns, data, handleView }) => {
  return (
    <div className="overflow-x-auto p-3">
      <CustomTable
        columns={columns}
        data={data}
        actions={(item) => (
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded"
            onClick={() => handleView(item)}
          >
            View
          </button>
        )}
      />
    </div>
  );
};

export default RequestTable;
