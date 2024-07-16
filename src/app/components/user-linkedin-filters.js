"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useToastContext } from "../context/toast-context";
import { useEffect, useState } from "react";
import UserLinkedinFiltersItem from "./user-linkedin-filters-item";
import Button from "./button";
import { useModalContext } from "../context/modal-context";
import ConnectionForm from "./connection-form";

const UsersLinkedinFilters = () => {
  const { data: session } = useSession();
  const { openModal } = useModalContext();
  const showToast = useToastContext();
  const [filters, setFilters] = useState([]);

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

  const handleClick = () => {
    openModal(<ConnectionForm setFilters={setFilters} />);
  };

  return (
    <div className="overflow-x-auto">
      <div>
        <Button onClick={handleClick}>
          <p>Add Targets</p>
        </Button>
      </div>
      <table className="table">
        <thead>
          <tr>
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
