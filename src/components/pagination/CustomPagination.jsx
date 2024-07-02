import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import './CustomPagination.css'; // Import the CSS file

const CustomPagination = ({ totalItems, getAllRequest, setCurrent,clearFilter }) => {
  const pageCount = Math.ceil(totalItems / 10); // Assuming 10 items per page
  const [jumpPage, setJumpPage] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageJump = () => {
    const pageNumber = Number(jumpPage) - 1;
    if (pageNumber >= 0 && pageNumber < pageCount) {
      handlePageChange({ selected: pageNumber });
    }
  };

  const handlePageChange = ({ selected }) => {
    clearFilter({active:selected + 1})
    setCurrentPage(selected);
    setCurrent(selected + 1); // Since selected is zero-based index
    // getAllRequest({ active: selected + 1 }); // Ensure selected is a number
  };

  return (
    <div className="pagination-container">
      <ReactPaginate
        breakLabel="..."
        nextLabel=" >"
        onPageChange={handlePageChange}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="< "
        renderOnZeroPageCount={null}
        containerClassName="custom-pagination"
        activeClassName="active"
        pageClassName="custom-pagination-item"
        pageLinkClassName="custom-pagination-link"
        previousClassName="custom-pagination-previous"
        nextClassName="custom-pagination-next"
        breakClassName="custom-pagination-break"
        forcePage={currentPage}
      />
      <div className="jump-to-container">
        <input
          type="number"
          min="1"
          max={pageCount}
          value={jumpPage}
          onChange={(e) => setJumpPage(e.target.value)}
          className="jump-to-input"
          placeholder="Jump to"
        />
        <button onClick={handlePageJump} className="jump-to-button">
          Go
        </button>
      </div>
    </div>
  );
};

export default CustomPagination;
