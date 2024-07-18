import axios from "axios";
import { useToastContext } from "../context/toast-context";

const UserLinkedinFiltersItem = ({
  data,
  setCurrentTarget,
  isLoading,
  setIsLoading,
}) => {
  const showToast = useToastContext();

  const handleClick = async () => {
    if (isLoading) return;

    setIsLoading(true);
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
      setIsLoading(false);
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

  return (
    <tr>
      <td>
        <input type="checkbox" className="checkbox" onChange={handleOnChange} />
      </td>
      <td>{data.targetName}</td>
      <td>{data.connections}</td>
      <td>{data.keyWords}</td>
      <td>{data.locations.join(", ")}</td>
      <td>{data.title}</td>
      <td>{data.industries.join(", ")}</td>
      <td>{data.languages.join(", ")}</td>
      <td>{data.serviceCategories.join(", ")}</td>
      <td
        onClick={handleClick}
        className={`underline ${
          isLoading
            ? "text-gray-400 cursor-not-allowed"
            : "hover:text-blue-600 hover:cursor-pointer"
        }`}
      >
        Click to start connections
      </td>
    </tr>
  );
};

export default UserLinkedinFiltersItem;
