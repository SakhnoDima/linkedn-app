"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import LinkedinTasksTableItem from "./linkedin-tasks-table-item";
import { TableComponent } from "@/app/components/Tables/table-component";
import { TablePagination } from "@/app/components/Tables/table-pagination";
import { useToastContext } from "@/app/context/toast-context";

const LinkedinTasksTable = ({ userId }) => {
  const searchParams = useSearchParams();
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(+searchParams.get("page") || 1);
  const [totalPage, setTotalPage] = useState(null);
  const [loading, setLoading] = useState(false);

  const showToast = useToastContext();

  const linkedinDashboardHeaderItems = [
    "Task Name",
    "Task Type",
    "Search Tags",
    "Planned Connections",
    "Connections Sent",
    "Date",
  ];

  useEffect(() => {
    const getUserLinkedinTasks = async (userId) => {
      try {
        if (!userId) {
          throw new Error("Not active session");
        }
        setLoading(true);

        const { data } = await axios.get("/api/linkedin-tasks-result", {
          params: {
            userId,
            page,
          },
        });
        console.log(data.totalPages);

        setTasks([...data.results]);
        setTotalPage(data.totalPages);
      } catch (error) {
        console.log(error);
        showToast(error.response?.data.message, "error");
      } finally {
        setLoading(false);
      }
    };

    getUserLinkedinTasks(userId);
  }, [userId, page]);

  return (
    <>
      <TableComponent
        loading={loading}
        headerItems={linkedinDashboardHeaderItems}
      >
        {tasks.map((data) => (
          <LinkedinTasksTableItem task={data} key={data._id} />
        ))}
      </TableComponent>
      {!loading && totalPage > 1 ? (
        <TablePagination
          totalPage={totalPage}
          currentPage={page}
          setCurrentPage={setPage}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default LinkedinTasksTable;
