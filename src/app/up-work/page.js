import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import UpWorkLogin from "./components/up-work-login";

const page = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="py-[50px]">
      {!session?.user.isUpWorkAuth && (
        <UpWorkLogin session={session?.user.isUpWorkAuth} />
      )}
    </div>
  );
};

export default page;
