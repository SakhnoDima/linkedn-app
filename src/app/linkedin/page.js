import { getServerSession } from "next-auth";

import LinkedinAuth from "../components/linkedin-auth";
import { authOptions }  from "../api/auth/[...nextauth]/route";
import FiltersBlock from "./filters-block";



const ConnectionPage = async() => {
  const session = await getServerSession(authOptions); 
console.log(session?.user.isLinkedinAuth);
  return (<>
   {!session?.user.isLinkedinAuth && <LinkedinAuth />} 
    <FiltersBlock /> 
  </>

  );
};

export default ConnectionPage;
