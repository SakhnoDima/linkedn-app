import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import UpWorkLogin from "./components/up-work-login";

const page = async () => {
  const session = await getServerSession(authOptions);
  console.log(session?.user.isUpWorkAuth);
  return (
    <div>
      {!session?.user.isUpWorkAuth && (
        <UpWorkLogin session={session?.user.isUpWorkAuth} />
      )}
    </div>
  );
};

export default page;
