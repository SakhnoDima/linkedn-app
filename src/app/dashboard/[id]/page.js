"use client";

import GoBack from "@/app/components/go-back";
import axios from "axios";
import Link from "next/link";

import { useEffect, useState } from "react";
import { RiArrowGoBackFill } from "react-icons/ri";

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

        const { data } = await axios.get("/api/linkedin-task-result", {
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
      <GoBack>
        Go back <RiArrowGoBackFill />
      </GoBack>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="mx-auto">
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
          <p>Planed Connections: {filter.totalLettersPerDay}</p>
          <p>Sended Connections: {filter.totalInvitationSent}</p>
          {filter.taskType === "send-connections" && (
            <>
              <p>Connected Users:</p>
              <ul className="ml-[8px]">
                {filter.userNames.map((name, index) => (
                  <li key={index}>
                    <Link
                      className="underline hover:text-blue-600"
                      href={name?.url}
                    >
                      {name.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
          {filter.taskType === "send-companies-messages" && (
            <>
              <p>Connected companies:</p>
              <ul className="ml-[8px]">
                {filter.invitedCompanies.map((company, index) => (
                  <li key={index}>
                    <Link
                      className="underline hover:text-blue-600"
                      href={company?.link}
                    >
                      {company.name}
                    </Link>
                    <p>
                      Linked posts:
                      <span className="ml-1">
                        {company.likedPosts ? company.likedPosts : "0"}
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            </>
          )}
          {filter.error && <p>{filter.error}</p>}
        </div>
      )}
    </div>
  );
};

export default Page;
