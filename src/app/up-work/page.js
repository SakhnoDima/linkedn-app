import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import UpWorkLoginForm from "./components/up-work-login-form";

const page = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <div>
      <UpWorkLoginForm />
    </div>
  );
};

export default page;
