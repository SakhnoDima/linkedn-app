"use client";

import axios from "axios";
import { useEffect, useState } from "react";

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
        setTasks([...data.results]);
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
            <th>Planned connections</th>
            <th>Connections sent</th>
            <th>Total Clics on Page</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((data) => (
            <tr key={data._id}>
              <td>{data.taskName}</td>
              <td>{data.searchTags}</td>
              <td>{data.totalLettersPerDay}</td>
              <td>{data.totalInvitationSent}</td>
              <td>{data.totalClicks}</td>
              <td>{data.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LinkedinTasksTable;
