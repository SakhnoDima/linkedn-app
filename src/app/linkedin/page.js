import { getServerSession } from "next-auth";

import LinkedinAuth from "../components/linkedin-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import FiltersBlock from "./filters-block";
import { redirect } from "next/navigation";

const ConnectionPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <div>
      <LinkedinAuth />
      <FiltersBlock />
    </div>
  );
};

export default ConnectionPage;
