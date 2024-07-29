import { useRouter } from "next/navigation";

const LinkedinTasksTableItem = ({ task }) => {
  const router = useRouter();
  return (
    <tr
      className="hover:cursor-pointer"
      onClick={() => {
        router.push(`/dashboard/${task._id}`);
      }}
    >
      <td>{task.taskName}</td>
      <td>{task.searchTags}</td>
      <td>{task.totalLettersPerDay}</td>
      <td>{task.totalInvitationSent}</td>
      <td>{task.totalClicks}</td>
      <td>{new Date(task.date).toISOString().split("T")[0]}</td>
    </tr>
  );
};

export default LinkedinTasksTableItem;
