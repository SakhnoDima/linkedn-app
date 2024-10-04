"use client";
import React from "react";

import { useAddQueryParams } from "@/app/hooks/useAddQueryParams";

export const TablePagination = ({
  totalPage,
  currentPage,
  setCurrentPage,
  pageParamName,
}) => {
  const addQueryParams = useAddQueryParams();

  const handlePageChange = (index) => {
    setCurrentPage(index);

    addQueryParams({ [pageParamName]: index });
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
            onChange={() => handlePageChange(index + 1)}
          />
        ))}
      </div>
    </div>
  );
};
