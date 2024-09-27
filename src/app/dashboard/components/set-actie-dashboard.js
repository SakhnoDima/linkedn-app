"use client";
import React, { useState } from "react";
import { TableInfoEventsMixpanel } from "./table-info-events-mixpanel";
import LinkedinTasksTable from "./linkedin-tasks-table";
import Button from "@/app/components/button";

export const activeLineBtn = "text-main-blue";

const dashboards = {
  upWork: "upWork",
  linkedin: "linkedin",
};

const SetActiveDashboard = ({ setDashboard, dashboard }) => {
  return (
    <div className="flex items-center gap-4 mb-4">
      <Button
        whileHover={{ scale: 1.2 }}
        className="btn-sm"
        onClick={() => setDashboard(dashboards.upWork)}
      >
        <span className={dashboard === dashboards.upWork && activeLineBtn}>
          UpWork
        </span>
      </Button>
      <Button
        whileHover={{ scale: 1.2 }}
        className="btn-sm"
        onClick={() => setDashboard(dashboards.linkedin)}
      >
        <span className={dashboard === dashboards.linkedin && activeLineBtn}>
          Linkedin
        </span>
      </Button>
    </div>
  );
};

const ActiveDashboards = ({ session }) => {
  const [dashboard, setDashboard] = useState(dashboards.linkedin);

  return (
    <div>
      <SetActiveDashboard setDashboard={setDashboard} dashboard={dashboard} />
      <div>
        {dashboard === dashboards.upWork && (
          <TableInfoEventsMixpanel userId={session?.user.id} />
        )}
        {dashboard === dashboards.linkedin && (
          <LinkedinTasksTable userId={session?.user.id} />
        )}
      </div>
    </div>
  );
};

export default ActiveDashboards;
