"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import LinkedinTasksTableItem from "./linkedin-tasks-table-item";

const LinkedinTasksTable = ({ userId }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getUserLinkedinTasks = async (userId) => {
      try {
        if (!userId) {
          throw new Error("Not active session");
        }
        const { data } = await axios.get("/api/linkedin-tasks-result", {
          params: {
            userId,
          },
        });
        setTasks([...data.results].reverse());
        console.log(data.results);
      } catch (error) {
        console.log(error);
        return;
      }
    };

    getUserLinkedinTasks(userId);
  }, [userId]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-h-[700px] overflow-y-auto">
      <table className="w-full text-sm text-left rtl:text-right ">
        <thead className="sticky top-0 text-xs uppercase bg-gray-200 ">
          <tr className="text-lg">
            <th className="px-6 py-3">Task Name</th>
            <th className="px-6 py-3">Search Tags</th>
            <th className="px-6 py-3">Planned Connections</th>
            <th className="px-6 py-3">Connections Sent</th>
            <th className="px-6 py-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((data) => (
            <LinkedinTasksTableItem task={data} key={data._id} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LinkedinTasksTable;
