import Loader from "../loader";

export const TableComponent = ({
  headerItems,
  children,
  loading,
  noResult = false,
}) => {
  return (
    <div
      className={`min-h-[665px] relative overflow-x-auto shadow-md sm:rounded-lg overflow-y-auto border`}
    >
      <table className="w-full text-sm text-left rtl:text-right ">
        <thead className="sticky top-0 text-xs uppercase bg-gray-200 ">
          <tr className="text-lg">
            {headerItems.map((item, index) => (
              <th key={index} className="px-6 py-3 text-center">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        {!loading && <tbody>{children}</tbody>}
      </table>
      {loading && (
        <div className="flex gap-2 justify-center mt-4">
          <p className="px-6 py-4 text-xl">Loading</p>
          <Loader />
        </div>
      )}
      {noResult && !loading ? (
        <div className="flex gap-2 justify-center mt-4">
          <p className="px-6 py-4 text-xl">Not have any result</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
