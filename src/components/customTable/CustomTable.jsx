import React, { memo } from "react";

const CustomTable = memo(
  ({ columns, data, actions, pagination, onPageChange }) => {
    return (
      <div className="overflow-auto">
        <table className="w-full min-w-max border border-gray-200 rounded-md">
          <thead>
            <tr className="bg-gray-100 text-left">
              {columns.map((col) => (
                <th key={col.key} className="p-2 border">
                  {col.label}
                </th>
              ))}
              {actions && <th className="p-2 border">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index} className="border hover:bg-gray-50">
                  {columns.map((col) => (
                    <td key={col.key} className="p-2 border">
                      {col.render
                        ? col.render(item[col.key], item)
                        : item[col.key]}
                    </td>
                  ))}
                  {actions && <td className="p-2 border">{actions(item)}</td>}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="p-2 text-center text-gray-500"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Add pagination controls */}
        {pagination && (
          <div className="flex items-center justify-between mt-4 px-2">
            <div className="text-sm text-gray-700">
              Showing {data.length} of {pagination.totalCount} results
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onPageChange(pagination.currentPage - 1)}
                disabled={!pagination.hasPrevious}
                className={`px-3 py-1 rounded ${
                  pagination.hasPrevious
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Previous
              </button>
              <span className="px-3 py-1">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              <button
                onClick={() => onPageChange(pagination.currentPage + 1)}
                disabled={!pagination.hasNext}
                className={`px-3 py-1 rounded ${
                  pagination.hasNext
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default CustomTable;
