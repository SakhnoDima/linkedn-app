"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const Page = ({ params }) => {
  const { id } = params;
  const [filter, seFilter] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserLinkedinTasks = async (userId) => {
      try {
        if (!userId) {
          return;
        }

        const { data } = await axios.get("/api/linkedin-task", {
          params: {
            userId,
          },
        });

        console.log(data.results);
        seFilter(data.results);
      } catch (error) {
        console.log(error);
        return;
      } finally {
        setLoading(false);
      }
    };

    getUserLinkedinTasks(id);
  }, [id]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>
            Task name: <span>{filter.taskName}</span>
          </h2>
          <p>
            Date:
            <span>{new Date(filter.date).toISOString().split("T")[0]}</span>
          </p>
          <p>
            Search Tags: <span>{filter.searchTags}</span>
          </p>
          <p>Total clicks licks: {filter.totalClicks}</p>
          <p>Planed Connections: {filter.totalInvitationSent}</p>
          <p>Sended Connections: {filter.totalLettersPerDay}</p>
          <p>Connected Users:</p>
          <ul className="ml-[8px]">
            {filter.userNames.map((name, index) => (
              <li key={index}>- {name}</li>
            ))}
          </ul>
          {filter.error && <p>{filter.error}</p>}
        </>
      )}
    </div>
  );
};

export default Page;
