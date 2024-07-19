import axios from "axios";
import { useToastContext } from "../context/toast-context";
import StatusBadge from "./status-badge";

const statusState = {
  available: "Available",
  pending: "Pending",
  progress: "In Progress ",
};

const UserLinkedinFiltersItem = ({
  data,
  setCurrentTarget,
  isLoading,
  setIsLoading,
}) => {
  const showToast = useToastContext();

  const handBotInit = async () => {
    if (isLoading) return;

    setIsLoading(data._id);

    try {
      const linkedinAuthorization = await axios.post(
        "/api/connections",
        {
          data,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 600000,
        }
      );

      showToast(linkedinAuthorization.data.message, "success");
    } catch (error) {
      console.log(error);
      showToast(error?.response.data.message || "Server error", "error");
    } finally {
      setIsLoading(null);
    }
  };

  const handleOnChange = (event) => {
    const checked = event.target.checked;
    checked
      ? setCurrentTarget((prev) => [...prev, data])
      : setCurrentTarget((prev) =>
          prev.filter((elements) => elements._id !== data._id)
        );
  };

  const getStatus = () => {
    if (isLoading === data._id)
      return (
        <StatusBadge className="badge-accent badge-outline ">
          {statusState.progress}
        </StatusBadge>
      );
    if (isLoading && isLoading !== data._id)
      return (
        <StatusBadge className="badge-secondary">
          {statusState.pending}
        </StatusBadge>
      );
    return <StatusBadge>{statusState.available}</StatusBadge>;
  };

  return (
    <tr>
      <td>
        <input type="checkbox" className="checkbox" onChange={handleOnChange} />
      </td>
      <td>{data.targetName}</td>
      <td>{data.connections}</td>
      <td>{data.keyWords}</td>
      <td>{data.locations.join("; ")}</td>
      <td>{data.title}</td>
      <td>{data.industries.join("; ")}</td>
      <td>{data.languages.join("; ")}</td>
      <td>{data.serviceCategories.join("; ")}</td>
      <td
        onClick={handBotInit}
        className={`underline ${
          isLoading
            ? "text-gray-400 cursor-not-allowed"
            : "hover:text-blue-600 hover:cursor-pointer"
        }`}
      >
        Click to start connections
      </td>
      <td>{getStatus()}</td>
    </tr>
  );
};

export default UserLinkedinFiltersItem;
