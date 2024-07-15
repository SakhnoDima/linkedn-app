"use client";
import axios from "axios";
import { useRouter } from "next/navigation";

import Input from "../components/input";
import Button from "../components/button";
import { useToastContext } from "../context/toast-context";

const SignUpForm = () => {
  const showToast = useToastContext()
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDate = new FormData(e.target);

    try {
      const response = await axios.post("/api/auth/register", {
        email: formDate.get("email"),
        password: formDate.get("password"),
      });

      if (response.status == 200) {
        showToast(response?.data.message, "success");
        router.push("/login");
        router.refresh();
      }
    } catch (error) {
     showToast(error.response?.data.error, "error");
    }
  };

  return (
    <>
      <h2 className="text-center text-2xl mb-[20px]">Authorization Form</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 items-center"
      >
        <Input required name="email" type="email" />
        <Input required name="password" type="password" />
        <Button className="w-[200px]" type="submit">
          Register
        </Button>
      </form>
    </>
  );
};

export default SignUpForm;
