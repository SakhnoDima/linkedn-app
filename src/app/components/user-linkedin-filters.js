"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useToastContext } from "../context/toast-context";
import { useEffect, useState } from "react";
import UserLinkedinFiltersItem from "./user-linkedin-filters-item";
import TargetActionButton from "./target-action-button";

const UsersLinkedinFilters = () => {
  const { data: session } = useSession();
  const showToast = useToastContext();
  const [filters, setFilters] = useState([]);
  const [currentTarget, setCurrentTarget] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
      <div className="flex gap-[8px]">
        <TargetActionButton setFilters={setFilters} actions="add" />
        {currentTarget?.length === 1 && (
          <TargetActionButton
            setFilters={setFilters}
            actions="edit"
            currentTarget={currentTarget}
            setCurrentTarget={setCurrentTarget}
          />
        )}
        {currentTarget.length > 0 && (
          <TargetActionButton
            setFilters={setFilters}
            actions="delete"
            currentTarget={currentTarget}
            setCurrentTarget={setCurrentTarget}
          />
        )}
      </div>
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Connections</th>
            <th>Keywords</th>
            <th>Locations</th>
            <th>Title</th>
            <th>Industry</th>
            <th>Language</th>
            <th>Categories</th>
            <th>Send Connections</th>
          </tr>
        </thead>
        <tbody>
          {filters.length > 0 ? (
            filters.map((data, index) => (
              <UserLinkedinFiltersItem
                key={data._id}
                data={data}
                setCurrentTarget={setCurrentTarget}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            ))
          ) : (
            <tr>
              <td colSpan="10">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersLinkedinFilters;
