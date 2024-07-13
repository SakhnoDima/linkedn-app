"use client";
import { useRouter } from "next/navigation";
import Input from "../components/input";
import Button from "../components/button";

const SignUpForm = () => {
    const router = useRouter();
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const formDate = new FormData(e.target);
  
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          email: formDate.get("email"),
          password: formDate.get("password"),
        }),
      });
      const data = await response.json();
  
      if (!response.ok) {
        console.log(data.error);
      } else {
        router.push("/login");
        router.refresh();
      }
    };
    return (
      <>
        <h2 className="text-center text-2xl mb-[20px]">Authorization Form</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 items-center"
        >
          <Input name="email" type="email" />
          <Input name="password" type="password" />
          <Button className="w-[200px]" type="submit">
            Register
          </Button>
        </form>
      </>
    );
}
export default SignUpForm