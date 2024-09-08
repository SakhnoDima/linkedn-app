"use client";
import React, { useState } from "react";
import { TableInfoEventsMixpanel } from "./table-info-events-mixpanel";
import LinkedinTasksTable from "./linkedin-tasks-table";
import { useSession } from "next-auth/react";
import Button from "@/app/components/button";

const dashboards = {
  upWork: "upWork",
  linkedin: "linkedin",
};

const SetActiveDashboard = ({ setDashboard, dashboard }) => {
  const activeLineAfterClass =
    "relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[2px] after:bg-blue-500";
  return (
    <div className="flex items-center gap-4 mb-4">
      <Button
        whileHover={{ scale: 1.2 }}
        className="btn-sm"
        onClick={() => setDashboard(dashboards.upWork)}
      >
        <span
          className={dashboard === dashboards.upWork && activeLineAfterClass}
        >
          Linkedin
        </span>
      </Button>
      <Button
        whileHover={{ scale: 1.2 }}
        className="btn-sm"
        onClick={() => setDashboard(dashboards.linkedin)}
      >
        <span
          className={dashboard === dashboards.linkedin && activeLineAfterClass}
        >
          UpWork
        </span>
      </Button>
    </div>
  );
};

const ActiveDashboards = () => {
  const [dashboard, setDashboard] = useState(dashboards.upWork);
  const { data: session } = useSession();

  return (
    <div>
      <SetActiveDashboard setDashboard={setDashboard} dashboard={dashboard} />
      <div>
        {dashboard === dashboards.upWork && <TableInfoEventsMixpanel />}
        {dashboard === dashboards.linkedin && (
          <LinkedinTasksTable userId={session?.user.id} />
        )}
      </div>
    </div>
  );
};

export default ActiveDashboards;
