"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useToastContext } from "../context/toast-context";
import { useEffect, useState } from "react";
import ConnectionSender from "./connection-sender";
import UserLinkedinFiltersItem from "./user-linkedin-filters-item";

const UsersLinkedinFilters = () => {
  const { data: session } = useSession();
  const showToast = useToastContext();
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    const fetchLinkedinFilters = async () => {
      try {
        const linkedinFilters = await axios.get("/api/linkedin-filters");

        setFilters([linkedinFilters.data]);
      } catch (error) {
        showToast(error.response.data.message, "error");
      }
    };

    fetchLinkedinFilters();
  }, []);

  console.log(filters);

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
           <UserLinkedinFiltersItem data={data} index={index}/>
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
