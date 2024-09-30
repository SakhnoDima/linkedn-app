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
  const [page, setPage] = useState(null);
  const [totalPage, setTotalPage] = useState(null);

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
        const { data } = await axios.get("/api/linkedin-filters", {
          params: {
            userId,
            page: 1,
          },
        });
        if (userId) {
          setFilters([...data.filters.reverse()]);
          setTotalPage(data.totalPages);
          // console.log(data.totalPages);
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
  console.log(totalPage);

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
      {!loading && totalPage > 1 ? (
        <TablePagination totalPage={totalPage} />
      ) : (
        ""
      )}
    </>
  );
};
