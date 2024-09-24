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

const UserLinkedinFiltersItem = ({ data, setCurrentTarget }) => {
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

  return (
    <tr className="text-center">
      <td>
        <input type="checkbox" className="checkbox" onChange={handleOnChange} />
      </td>
      <td>{data.targetName}</td>
      <td>{data.event}</td>
      <td>{data.connections}</td>
      <td>{data.keyWords}</td>
      <td>{data.locations.join("; ")}</td>
      <td>{data.title ? data.title : "-"}</td>
      <td>{data.industries.length > 0 ? data.industries.join("; ") : "-"}</td>
      <td>{data.languages.length > 0 ? data.languages.join("; ") : "-"}</td>
      <td>
        {data.serviceCategories.length > 0
          ? data.serviceCategories.join("; ")
          : "-"}
      </td>
      <td>
        {
          <StatusBadge
            active={data.autoBidding ? true : false}
            className="w-[60px]"
          >
            {data.autoBidding ? statusState.progress : statusState.pending}
          </StatusBadge>
        }
      </td>
    </tr>
  );
};

export default UserLinkedinFiltersItem;
