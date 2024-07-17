import axios from "axios";
import ConnectionForm from "./connection-form";
import { useToastContext } from "../context/toast-context";

const TargetActions = ({
  setFilters,
  currentTarget,
  setCurrentTarget,
  actions,
}) => {
  const showToast = useToastContext();

  const handleSave = async (values, userId) => {
    try {
      const response = await axios.post(
        "/api/linkedin-filters",
        { values, userId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setFilters((prev) => [response.data.filter, ...prev]);
      }
    } catch (error) {
      console.log(error);
      showToast(error?.response.data.message || "Server error", "error");
    }
  };

  const handleEdit = async (values, userId) => {
    try {
      const response = await axios.put(
        "/api/linkedin-filters",
        { values, fieldId: currentTarget[0]._id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setCurrentTarget([response.data.filter]);

        setFilters((prev) =>
          prev.map((elem) =>
            elem._id === response.data.filter._id ? response.data.filter : elem
          )
        );
      }
    } catch (error) {
      console.log(error);
      showToast(error?.response.data.message || "Server error", "error");
    }
  };

  const handlers = {
    add: handleSave,
    edit: handleEdit,
  };

  return (
    <ConnectionForm
      setFilters={setFilters}
      currentTarget={currentTarget ? currentTarget[0] : ""}
      handler={handlers[actions]}
    />
  );
};

export default TargetActions;
