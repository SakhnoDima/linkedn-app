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

  const handlePageChange = (action) => {
    switch (action) {
      case "increase":
        addQueryParams({ [pageParamName]: currentPage + 1 });
        setCurrentPage((prev) => prev + 1);
        break;
      case "decrees":
        setCurrentPage((prev) => prev - 1);
        addQueryParams({ [pageParamName]: currentPage - 1 });
        break;
      default:
        break;
    }
  };

  return (
    <div className="mt-8 flex justify-end">
      <div className="join">
        <button
          disabled={currentPage === 1}
          className="join-item btn hover:text-main-blue"
          onClick={() => handlePageChange("decrees")}
        >
          «
        </button>
        <div className="join-item btn hover:cursor-auto hover:bg-gray-100">
          Page {currentPage}
        </div>
        <button
          disabled={currentPage === totalPage}
          className="join-item btn"
          onClick={() => handlePageChange("increase")}
        >
          »
        </button>
      </div>
    </div>
  );
};
