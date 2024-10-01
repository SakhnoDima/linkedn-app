import React from "react";

export const TablePagination = ({ totalPage, currentPage, setCurrentPage }) => {
  return (
    <div className="mt-8 flex justify-end">
      <div className="join">
        {Array.from({ length: totalPage }, (_, index) => (
          <input
            className="join-item btn btn-square checked:bg-main-blue"
            type="radio"
            name="options"
            aria-label={index + 1}
            checked={index + 1 === currentPage}
            onChange={() => setCurrentPage(index + 1)}
          />
        ))}
      </div>
    </div>
  );
};
