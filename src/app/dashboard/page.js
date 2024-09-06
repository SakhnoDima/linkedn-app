import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LinkedinTasksTable from "./components/linkedin-tasks-table";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { TableInfoEventsMixpanel } from "../components/table-info-events-mixpanel";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }
  return (
    <div>
      <h2>DashboardPage</h2>
      <TableInfoEventsMixpanel />
      {/* <LinkedinTasksTable userId={session?.user.id} /> */}
    </div>
  );
};

export default DashboardPage;
