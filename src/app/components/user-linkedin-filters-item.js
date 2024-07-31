import axios from "axios";
import { useToastContext } from "../context/toast-context";
import StatusBadge from "./status-badge";
import { useEffect } from "react";
import mixpanel from "mixpanel-browser";

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

  useEffect(() => {
    mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_SECRET_KEY, { debug: true });
  }, []);

  useEffect(() => {
    let interval;
    const checkStatus = async (targetId) => {
      interval = setInterval(async () => {
        try {
          const response = await axios.get("/api/connections", {
            params: {
              targetId,
            },
          });

          if (response.data.status === false) {
            clearInterval(interval);
            setIsLoading(null);
            localStorage.removeItem("checkingStatus"); // remove from LS
          } else {
            console.log("Status is still false, continuing checks");
          }
        } catch (error) {
          localStorage.removeItem("checkingStatus");
          setIsLoading(null);
          clearInterval(interval);
          console.error("Error checking connection status:", error);
          showToast(error?.response.data.message || "Server error", "error");
        }
      }, 10000);
    };

    const checkingStatus = JSON.parse(localStorage.getItem("checkingStatus"));
    if (
      checkingStatus &&
      checkingStatus.targetId &&
      checkingStatus.targetId === data._id
    ) {
      setIsLoading(checkingStatus.targetId);
      checkStatus(checkingStatus.targetId);
    }

    return () => clearInterval(interval);
  }, []);

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
      localStorage.setItem(
        "checkingStatus",
        JSON.stringify({ targetId: data._id })
      );

      showToast(linkedinAuthorization.data.message, "success");
      mixpanel.track("start connections");

      console.log(data._id);
      const interval = setInterval(async () => {
        try {
          const response = await axios.get("/api/connections", {
            params: {
              targetId: data._id,
            },
          });

          if (response.data.status === false) {
            console.log("Status is true, stopping checks");
            clearInterval(interval);
            setIsLoading(null);
            localStorage.removeItem("checkingStatus");
          }
        } catch (error) {
          localStorage.removeItem("checkingStatus");
          setIsLoading(null);
          clearInterval(interval);
          console.error("Error checking connection status:", error);
          showToast(error?.response.data.message || "Server error", "error");
        }
      }, 10000);
    } catch (error) {
      console.log(error);
      setIsLoading(null);
      showToast(error?.response.data.message || "Server error", "error"); //! обробити
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
    if (isLoading === data._id) {
      return (
        <StatusBadge className="badge-secondary badge-outline w-[60px]">
          {statusState.progress}
        </StatusBadge>
      );
    } else
      return (
        <StatusBadge className="badge-outline w-[60px]">
          {statusState.pending}
        </StatusBadge>
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
