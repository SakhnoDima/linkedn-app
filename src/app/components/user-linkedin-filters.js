"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useToastContext } from "../context/toast-context";
import { useEffect, useState } from "react";
import ConnectionSender from "./connection-sender";
import UserLinkedinFiltersItem from "./user-linkedin-filters-item";

const UsersLinkedinFilters = ({ filters, setFilters }) => {
  const { data: session } = useSession();
  const showToast = useToastContext();

  useEffect(() => {
    const fetchLinkedinFilters = async () => {
      try {
        const linkedinFilters = await axios.get("/api/linkedin-filters", {
          params: {
            userId: session?.user.id,
          },
        });
        if (session?.user.id) {
          setFilters([...linkedinFilters.data.reverse()]);
        }
      } catch (error) {
        console.log(error);
        showToast(error.response.data.message, "error");
      }
    };

    fetchLinkedinFilters();
  }, [session?.user.id]);

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Connections</th>
            <th>Keywords</th>
            <th>Locations</th>
            <th>Title</th>
            <th>Industry</th>
            <th>Language</th>
          </tr>
        </thead>
        <tbody>
          {filters.length > 0 ? (
            filters.map((data, index) => (
              <UserLinkedinFiltersItem
                key={index}
                data={data}
                index={index}
                filters={filters}
                setFilters={setFilters}
              />
            ))
          ) : (
            <tr>
              <td colSpan="8">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersLinkedinFilters;
