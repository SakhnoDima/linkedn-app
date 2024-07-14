import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LoginForm from "./login-form";
import { authOptions } from "../api/auth/[...nextauth]/route";


const LoginPage = async () => {
  const session = await getServerSession(authOptions)
  console.log(session);
  if (session) {
    redirect("/")
  }
 return(
  <LoginForm/>
 )
};

export default LoginPage;
