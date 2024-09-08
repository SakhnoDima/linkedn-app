import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "../api/auth/[...nextauth]/route";
import ActiveDashboards from "./components/set-actie-dashboard";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }
  return (
    <div>
      <h2 className="font-bold text-3xl text-center mb-4">DashboardPage</h2>
      <ActiveDashboards />
    </div>
  );
};

export default DashboardPage;
