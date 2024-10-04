import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const formatTime = (unixTime, timeAgoString = null) => {
  const biddingDate = new Date(unixTime * 1000);
  const createdDate = new Date(unixTime * 1000);

  if (timeAgoString) {
    const [_, amount, unit] = timeAgoString.match(/(\d+)\s(\w+)/);

    const timeToSubtract = parseInt(amount);

    switch (unit) {
      case "seconds":
      case "second":
        createdDate.setSeconds(createdDate.getSeconds() - timeToSubtract);
        break;
      case "minutes":
      case "minute":
        createdDate.setMinutes(createdDate.getMinutes() - timeToSubtract);
        break;
      case "hours":
      case "hour":
        createdDate.setHours(createdDate.getHours() - timeToSubtract);
        break;
      default:
        console.error("Unsupported time unit in the string");
        break;
    }
  }

  const biddingHours = String(biddingDate.getHours()).padStart(2, "0");
  const biddingMinutes = String(biddingDate.getMinutes()).padStart(2, "0");
  const biddingSeconds = String(biddingDate.getSeconds()).padStart(2, "0");

  const createdHours = String(createdDate.getHours()).padStart(2, "0");
  const createdMinutes = String(createdDate.getMinutes()).padStart(2, "0");
  const createdSeconds = String(createdDate.getSeconds()).padStart(2, "0");

  return {
    formattedTime: `${biddingHours}:${biddingMinutes}:${biddingSeconds}`,
    modifiedTime: timeAgoString
      ? `${createdHours}:${createdMinutes}:${createdSeconds}`
      : null,
  };
};

const UpWorkTasksTableItem = ({ data }) => {
  return (
    <AnimatePresence mode="wait">
      {data.map((item, index) => {
        const { formattedTime, modifiedTime } = formatTime(
          item.properties.time,
          item.properties.publishedDate
        );
        return (
          <motion.tr
            key={item.properties.mp_processing_time_ms}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white border-b "
          >
            <td className="px-6 py-4 text-xl text-gray-900 whitespace-nowrap text-center">
              {item.event}
            </td>
            <td className="px-6 py-4 text-xl text-gray-900 whitespace-nowrap text-center">
              {item.properties.scanName}
            </td>
            <td className="px-6 py-4 text-center">
              {item.properties.freelancer}
            </td>
            <td className="px-6 py-4 text-center">
              {item.properties.targetLink ? (
                <a
                  className="underline hover:cursor-pointer hover:text-main-blue"
                  href={item.properties.targetLink}
                >
                  View job posting
                </a>
              ) : (
                "-"
              )}
            </td>
            <td className="px-6 py-4 text-center">{formattedTime}</td>
            <td className="px-6 py-4 text-center">
              {modifiedTime ? modifiedTime : "-"}
            </td>
            <td className="px-6 py-4 text-center">
              {item.properties.requiredConnects
                ? item.properties.requiredConnects
                : "-"}
            </td>
          </motion.tr>
        );
      })}
    </AnimatePresence>
  );
};

export default UpWorkTasksTableItem;
