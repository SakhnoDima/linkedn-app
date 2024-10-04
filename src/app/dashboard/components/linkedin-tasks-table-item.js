import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const LinkedinTasksTableItem = ({ task }) => {
  const router = useRouter();

  const taskTypes = {
    "send-companies-messages": "COMPANIES",
    "send-connections": "CONNECTIONS",
  };

  return (
    <tr
      className="bg-white border-b hover:bg-gray-100 hover:cursor-pointer"
      onClick={() => {
        router.push(`/dashboard/${task._id}`);
      }}
    >
      <td className="px-6 py-4 text-xl text-gray-900 whitespace-nowrap text-center">
        {task.taskName}
      </td>
      <td className="px-6 py-4 text-center">{taskTypes[task.taskType]}</td>
      <td className="px-6 py-4 text-base text-center">{task.searchTags}</td>
      <td className="px-6 py-4 text-base text-center">
        {task.totalLettersPerDay}
      </td>
      <td className="px-6 py-4 text-base text-center">
        {task.totalInvitationSent}
      </td>
      <td className="px-6 py-4 text-base text-center">
        {new Date(task.date).toISOString().split("T")[0]}
      </td>
    </tr>
  );
};

export default LinkedinTasksTableItem;
