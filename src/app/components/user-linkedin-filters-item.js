import { AnimatePresence, motion } from "framer-motion";

import StatusBadge from "./status-badge";
import { useEffect } from "react";
import mixpanel from "mixpanel-browser";

const statusState = {
  pending: "Paused",
  progress: "Active",
};

const UserLinkedinFiltersItem = ({ data, setCurrentTarget, index }) => {
  useEffect(() => {
    mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_SECRET_KEY, { debug: true });
  }, []);

  const handleOnChange = (event) => {
    const checked = event.target.checked;
    checked
      ? setCurrentTarget((prev) => [...prev, data])
      : setCurrentTarget((prev) =>
          prev.filter((elements) => elements._id !== data._id)
        );
  };

  return (
    <AnimatePresence mode="wait">
      <motion.tr
        key={data._id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        //exit={{ opacity: 0 }}
        transition={{ delay: index * 0.2 }}
        className="bg-white border-b "
      >
        <td className="px-6 py-4 text-center">
          <input
            type="checkbox"
            className="checkbox"
            onChange={handleOnChange}
          />
        </td>
        <td className="px-6 py-4 text-xl text-gray-900 whitespace-nowrap text-center">
          {data.targetName}
        </td>
        <td className="px-6 py-4 text-xl text-gray-900 whitespace-nowrap text-center">
          {data.event}
        </td>
        <td className="px-6 py-4 text-center">{data.connections}</td>
        <td className="px-6 py-4 text-center">{data.keyWords}</td>
        <td className="px-6 py-4 text-center">{data.locations.join("; ")}</td>
        <td className="px-6 py-4 text-center">
          {data.title ? data.title : "-"}
        </td>
        <td className="px-6 py-4 text-center">
          {data.industries.length > 0 ? data.industries.join("; ") : "-"}
        </td>
        <td className="px-6 py-4 text-center">
          {data.languages.length > 0 ? data.languages.join("; ") : "-"}
        </td>
        <td className="px-6 py-4 text-center">
          {data.serviceCategories.length > 0
            ? data.serviceCategories.join("; ")
            : "-"}
        </td>
        <td>
          {
            <StatusBadge
              active={data.autoBidding ? true : false}
              className="w-[60px]"
            >
              {data.autoBidding ? statusState.progress : statusState.pending}
            </StatusBadge>
          }
        </td>
      </motion.tr>
    </AnimatePresence>
  );
};

export default UserLinkedinFiltersItem;
