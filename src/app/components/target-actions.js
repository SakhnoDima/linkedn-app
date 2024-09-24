"use client";
import axios from "axios";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import ConnectionForm from "./connection-form";
import { useToastContext } from "../context/toast-context";
import Button from "./button";
import { activeLineBtn } from "../dashboard/components/set-actie-dashboard";
import { JobLetterForm } from "./company-proposal-form";

export const events = {
  connects: "connects",
  companies: "companies invite",
};

const TargetActions = ({
  setFilters,
  currentTarget,
  setCurrentTarget,
  actions,
}) => {
  const [event, setEvent] = useState(
    currentTarget ? currentTarget[0].event : events.connects
  );
  const showToast = useToastContext();

  const handleSave = async (values, userId) => {
    console.log("values", values);

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
  console.log(actions);

  return (
    <div className="min-w-[50vh]">
      <h2 className="text-3xl text-center mb-[8px] font-bold px-2">
        Create your event
      </h2>
      {actions === "add" && (
        <div className="my-3 flex gap-4 justify-center">
          <Button className="btn-sm" onClick={() => setEvent(events.connects)}>
            <span className={event === events.connects ? activeLineBtn : ""}>
              Connects
            </span>
          </Button>
          <Button className="btn-sm" onClick={() => setEvent(events.companies)}>
            <span className={event === events.companies ? activeLineBtn : ""}>
              Companies Invite
            </span>
          </Button>
        </div>
      )}

      <AnimatePresence mode="wait">
        {event === events.companies && (
          <motion.div
            key={events.companies}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="text-center font-medium">
              Here you can specify filters and messages to be used in your
              request.
            </p>
            <JobLetterForm
              currentTarget={currentTarget ? currentTarget[0] : ""}
              handler={handlers[actions]}
            />
          </motion.div>
        )}
        {event === events.connects && (
          <motion.div
            key={events.connects}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="text-center font-medium">
              Here you can specify the filters you need for the target and send
              requests.
            </p>
            <ConnectionForm
              setFilters={setFilters}
              currentTarget={currentTarget ? currentTarget[0] : ""}
              handler={handlers[actions]}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TargetActions;
