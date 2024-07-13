import { getServerSession } from "next-auth";
import ConnectionForm from "../components/connection-form";
import LinkedinAuth from "../components/linkedin-auth";
import { authOptions }  from "../api/auth/[...nextauth]/route";


const SendingRequestBlock = () => {
  return (
    <div className="py-[50px] ">
      <h2 className="text-3xl text-center mb-[8px] font-bold ">
        Connecting Form
      </h2>
      <p className="text-center mb-[12px]">
        Here you can specify the filters you need for the target and send
        requests
      </p>
      <ConnectionForm />
    </div>
  );
};

const ConnectionPage = async() => {
  const session = await getServerSession(authOptions); 

  return (<>
   {!session?.user.isLinkedinAuth && <LinkedinAuth />} 
    <SendingRequestBlock /> 
  
  </>

  );
};

export default ConnectionPage;
