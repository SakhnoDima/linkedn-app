import axios from "axios";
import { useEffect, useState } from "react";

import { TableComponent } from "@/app/components/Tables/table-component";
import { useToastContext } from "@/app/context/toast-context";
import UserLinkedinFiltersItem from "@/app/components/user-linkedin-filters-item";
import { TablePagination } from "@/app/components/Tables/table-pagination";

export const ScannersLinkedinTable = ({
  userId,
  filters,
  setFilters,
  setCurrentTarget,
}) => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const showToast = useToastContext();

  const headerLinkedinScannersItems = [
    "",
    "Name",
    "Event",
    "Connections",
    "Keywords",
    "Locations",
    "Title",
    "Industry",
    "Language",
    "Categories",
    "Status",
  ];

  useEffect(() => {
    const fetchLinkedinFilters = async () => {
      try {
        setLoading(true);
        const linkedinFilters = await axios.get("/api/linkedin-filters", {
          params: {
            userId,
            page,
          },
        });
        if (userId) {
          setFilters([...linkedinFilters.data.filters.reverse()]);
        }
      } catch (error) {
        console.log(error);
        showToast(error.response?.data.message, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchLinkedinFilters();
  }, [userId]);

  return (
    <>
      <TableComponent
        loading={loading}
        headerItems={headerLinkedinScannersItems}
      >
        {filters.map((data) => (
          <UserLinkedinFiltersItem
            key={data._id}
            data={data}
            setCurrentTarget={setCurrentTarget}
          />
        ))}
      </TableComponent>
      <TablePagination />
    </>
  );
};
