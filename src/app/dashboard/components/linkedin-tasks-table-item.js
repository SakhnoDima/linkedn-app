import { useRouter } from "next/navigation";

const LinkedinTasksTableItem = ({ task }) => {
  const router = useRouter();
  return (
    <tr
      className="bg-white border-b hover:bg-gray-100 hover:cursor-pointer"
      onClick={() => {
        router.push(`/dashboard/${task._id}`);
      }}
    >
      <td className="px-6 py-4 text-xl text-gray-900 whitespace-nowrap ">
        {task.taskName}
      </td>
      <td className="px-6 py-4 text-base">{task.searchTags}</td>
      <td className="px-6 py-4 text-base">{task.totalLettersPerDay}</td>
      <td className="px-6 py-4 ">{task.totalInvitationSent}</td>
      <td className="px-6 py-4 text-base">
        {new Date(task.date).toISOString().split("T")[0]}
      </td>
    </tr>
  );
};

export default LinkedinTasksTableItem;
