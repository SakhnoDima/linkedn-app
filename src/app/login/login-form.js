"use client";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Input from "../components/input";
import Button from "../components/button";
import { useToastContext } from "../context/toast-context";

const LoginForm = () => {
  const showToast = useToastContext()
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDate = new FormData(e.target);

    const response = await signIn("credentials", {
      email: formDate.get("email"),
      password: formDate.get("password"),
      redirect: false,
    });

    if (response.status === 401) {
      showToast("Email or password is wrong", "error");
    }
    // тут мне нужен userId
    if (!response?.error) {
      router.push("/");
      router.refresh();
    }
  };
  return (
    <>
      <h2 className="text-center text-2xl mb-[20px]">Login Form</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 items-center"
      >
        <Input required name="email" type="email" />
        <Input required name="password" type="password" />
        <Button className="w-[200px]" type="submit">
          Login
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
