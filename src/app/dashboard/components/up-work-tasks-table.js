"use client";
import { TableComponent } from "@/app/components/Tables/table-component";
import React, { useState } from "react";
import UpWorkTasksTableItem from "./items-info-events-mixpanel";

import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import { TablePagination } from "@/app/components/Tables/table-pagination";

const upWorkDashboardHeaderItems = [
  "Event",
  "Scanner",
  "Freelancer",
  "Link",
  "Bidding Time",
  "Сreated Time",
  "Required Connects",
];

export const UpWorkTasksTable = ({
  data,
  totalPage,
  currentPage,
  setCurrentPage,
}) => {
  const [showTable, setShowTable] = useState(false);
  return (
    <div className="relative">
      <button
        className="absolute top-[11px] left-[11px] z-50 hover:cursor-pointer hover:text-main-blue"
        onClick={() => setShowTable(!showTable)}
      >
        {showTable ? (
          <IoIosArrowDropdown className="w-[30px] h-[30px]" />
        ) : (
          <IoIosArrowDropup className="w-[30px] h-[30px]" />
        )}
      </button>

      <TableComponent
        loading={false}
        showChildren={showTable}
        headerItems={upWorkDashboardHeaderItems}
        noResult={data.length === 0}
      >
        {showTable && <UpWorkTasksTableItem data={data} />}
      </TableComponent>
      {showTable && (
        <TablePagination
          totalPage={totalPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageParamName="page-up-work"
        />
      )}
    </div>
  );
};
