import Loader from "./loader";

export const TableComponent = ({ headerItems, children, loading }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-h-[700px] overflow-y-auto">
      <table className="w-full text-sm text-left rtl:text-right ">
        <thead className="sticky top-0 text-xs uppercase bg-gray-200 ">
          <tr className="text-lg">
            {headerItems.map((item, index) => (
              <th key={index} className="px-6 py-3">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
      {loading && (
        <div className="flex gap-2 justify-center">
          <p className="px-6 py-4 text-xl">Loading</p>
          <Loader />
        </div>
      )}
    </div>
  );
};
