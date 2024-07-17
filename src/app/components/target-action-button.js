import React from "react";
import { useModalContext } from "../context/modal-context";
import Button from "./button";
import TargetActions from "./target-actions";
import axios from "axios";
import { useToastContext } from "../context/toast-context";

const buttonNames = {
  add: "Add Targets",
  edit: "Edit Targets",
  delete: "Delete Targets",
};

const TargetActionButton = ({
  setFilters,
  actions,
  currentTarget,
  setCurrentTarget,
}) => {
  const { openModal } = useModalContext();
  const showToast = useToastContext();

  const handleClick = () => {
    openModal(
      <TargetActions
        setFilters={setFilters}
        actions={actions}
        currentTarget={currentTarget}
        setCurrentTarget={setCurrentTarget}
      />
    );
  };

  const handleDelete = async () => {
    const arrayForDeleted = currentTarget.map((elem) => elem._id);
    try {
      await axios.delete("/api/linkedin-filters", {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          ids: arrayForDeleted,
        },
      });

      setFilters((prev) =>
        prev.filter((element) => !arrayForDeleted.includes(element._id))
      );
      showToast("Filter removed successfully", "success");
    } catch (error) {
      console.log(error);
      showToast(error?.response?.data.message, "error");
    }
  };

  return (
    <Button
      className="btn-sm"
      onClick={actions === "delete" ? handleDelete : handleClick}
    >
      <p>{buttonNames[actions]}</p>
    </Button>
  );
};

export default TargetActionButton;
