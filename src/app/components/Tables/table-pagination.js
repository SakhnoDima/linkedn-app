"use client";
import React from "react";

import { useAddQueryParams } from "@/app/hooks/useAddQueryParams";

export const TablePagination = ({ totalPage, currentPage, setCurrentPage }) => {
  const addQueryParams = useAddQueryParams();

  const handlePageChange = (page, index) => {
    setCurrentPage(index + 1);

    addQueryParams({ page: index + 1 });
  };

  return (
    <div className="mt-8 flex justify-end">
      <div className="join">
        {Array.from({ length: totalPage }, (_, index) => (
          <input
            key={index} // Make sure each input has a unique key
            className="join-item btn btn-square checked:bg-main-blue"
            type="radio"
            name="options"
            aria-label={index + 1}
            checked={index + 1 === currentPage}
            onChange={() => handlePageChange(index + 1, index)}
          />
        ))}
      </div>
    </div>
  );
};
