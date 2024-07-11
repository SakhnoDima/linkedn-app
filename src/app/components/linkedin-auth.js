import SignUpForm from "./sign-up-form";

const LinkedinAuth = ({ setAuth }) => {
  return (
    <div className="w-[500px] mt-[50px] mx-auto">
      <h2 className="mb-3 text-center">
        To start work, please authorize your account first
      </h2>
      <SignUpForm setAuth={setAuth}/>
    </div>
  );
};

export default LinkedinAuth;
