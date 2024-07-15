import { getServerSession } from "next-auth";

import LinkedinAuth from "../components/linkedin-auth";
import { authOptions }  from "../api/auth/[...nextauth]/route";
import FiltersBlock from "./filters-block";




const ConnectionPage = async() => {
  const session = await getServerSession(authOptions); 

  return (<>
   {!session?.user.isLinkedinAuth && <LinkedinAuth isAuth={session?.user.isLinkedinAuth}/>} 
    <FiltersBlock /> 
  </>

  );
};

export default ConnectionPage;
