import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();

  const [page, setPage] = useState(+searchParams.get("page") || 1);
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
            page,
          },
        });
        if (userId) {
          setFilters([...data.filters]);
          setTotalPage(data.totalPages);
        }
      } catch (error) {
        console.log(error);
        showToast(error.response?.data.message, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchLinkedinFilters();
  }, [userId, page]);
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
        <TablePagination
          totalPage={totalPage}
          currentPage={page}
          setCurrentPage={setPage}
          pageParamName="page"
        />
      ) : (
        ""
      )}
    </>
  );
};
