import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import UpWorkLogin from "./components/up-work-login";
import ScannersForm from "./components/scanner-form";

const page = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div>
      {!session?.user.isUpWorkAuth && (
        <UpWorkLogin session={session?.user.isUpWorkAuth} />
      )}
      <ScannersForm />
    </div>
  );
};

export default page;
