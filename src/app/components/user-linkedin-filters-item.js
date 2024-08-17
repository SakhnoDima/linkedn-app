import axios from "axios";
import { useToastContext } from "../context/toast-context";
import StatusBadge from "./status-badge";
import { useEffect, useState } from "react";
import mixpanel from "mixpanel-browser";
import Toggle from "./toggle";

const statusState = {
  pending: "Paused",
  progress: "Active",
};

const UserLinkedinFiltersItem = ({
  data,
  setCurrentTarget,
  isLoading,
  setIsLoading,
}) => {
  const showToast = useToastContext();

  const [isChecked, setIsChecked] = useState(data.status);

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

  const handleChange = async (event) => {
    if (!isChecked) {
      console.log("Init");
      try {
        const linkedinAuthorization = await axios.post(
          "/api/linkedin-connections",
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
        localStorage.setItem(
          "checkingStatus",
          JSON.stringify({ targetId: data._id })
        );

        showToast(linkedinAuthorization.data.message, "success");
        mixpanel.track("start connections");
      } catch (error) {
        console.log("Error in Init", error);
        setIsLoading(null);
        showToast(error?.response.data.message || "Server error", "error"); //! обробити
      }
    } else {
      console.log("Close");
      try {
        const response = await axios.delete("/api/linkedin-connections", {
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            userId: data.userId,
            taskId: data._id,
          },
        });
        showToast(response.data.message, "success");
      } catch (error) {
        console.log("Error in Delete", error);
      }
    }

    setIsChecked(!isChecked);
  };
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          className="checkbox"
          disabled={isChecked}
          onChange={handleOnChange}
        />
      </td>
      <td>{data.targetName}</td>
      <td>{data.connections}</td>
      <td>{data.keyWords}</td>
      <td>{data.locations.join("; ")}</td>
      <td>{data.title}</td>
      <td>{data.industries.join("; ")}</td>
      <td>{data.languages.join("; ")}</td>
      <td>{data.serviceCategories.join("; ")}</td>
      {/* <td
        onClick={handBotInit}
        className={`underline ${
          isLoading
            ? "text-gray-400 cursor-not-allowed"
            : "hover:text-blue-600 hover:cursor-pointer"
        }`}
      >
        Click to start connections
      </td> */}
      <td>
        <Toggle field={{ checked: isChecked, onChange: handleChange }} />
      </td>
      <td>
        {
          <StatusBadge active={isChecked ? true : false} className="w-[60px]">
            {isChecked ? statusState.progress : statusState.pending}
          </StatusBadge>
        }
      </td>
    </tr>
  );
};

export default UserLinkedinFiltersItem;
