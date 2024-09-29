"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import LinkedinTasksTableItem from "./linkedin-tasks-table-item";
import { TableComponent } from "@/app/components/Tables/table-component";

const LinkedinTasksTable = ({ userId }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

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
          },
        });
        setTasks([...data.results].reverse());
        console.log(data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getUserLinkedinTasks(userId);
  }, [userId]);

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
    </>
  );
};

export default LinkedinTasksTable;
