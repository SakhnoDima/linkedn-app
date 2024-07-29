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
        const { data } = await axios.get("/api/linkedin-tasks", {
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
    <div className="overflow-x-auto">
      <table className="table table-xs">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Search Tags</th>
            <th>Planned Connections</th>
            <th>Connections Sent</th>
            <th>Total Clicks</th>
            <th>Date</th>
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
