import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import AthForm from "../components/auth-form";


const LoginPage = async () => {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect("/")
  }
 return(
  <AthForm/>
 )
};

export default LoginPage;
