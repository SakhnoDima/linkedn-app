"use client";
import { TableComponent } from "@/app/components/Tables/table-component";

import UpWorkTasksTableItem from "./items-info-events-mixpanel";

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
  loading,
}) => {
  return (
    <div className="relative">
      <TableComponent
        loading={loading}
        headerItems={upWorkDashboardHeaderItems}
        noResult={data.length === 0}
      >
        <UpWorkTasksTableItem data={data} />
      </TableComponent>

      <TablePagination
        totalPage={totalPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageParamName="page-up-work"
      />
    </div>
  );
};
