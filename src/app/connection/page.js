import ConnectionForm from "../components/connection-form";

const ConnectionPage = () => {
  return (
    <div className="py-[50px] ">
        <h2 className="text-3xl text-center mb-[8px] font-bold ">Connecting Form</h2>
        <p className="text-center mb-[12px]">Here you can specify the filters you need for the target and send requests</p>
       <ConnectionForm/>
    </div>
  );
};

export default ConnectionPage;
