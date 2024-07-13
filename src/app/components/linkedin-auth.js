import LinkedinSignUpForm from "./linkedin-sign-up-form";
import ShowPopUp from "./show-pop-up";

const LinkedinAuth = () => {
  return (
    <div className="w-[500px] mt-[50px] mx-auto">
      <h2 className="mb-3 text-center">
        To start work, please authorize your account first
      </h2>
      <LinkedinSignUpForm />
      <ShowPopUp/>
    </div>
  );
};

export default LinkedinAuth;
