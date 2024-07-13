"use client"
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Input from '../components/input';
import Button from '../components/button';

const LoginForm = () => {

    const router = useRouter();
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const formDate = new FormData(e.target);

      const response = await signIn("credentials", {
        email: formDate.get("email"),
        password: formDate.get("password"),
        redirect: false,
      });
    
      console.log(response);
      // тут мне нужен userId
      if(!response?.error){
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
          <Input name="email" type="email" />
          <Input name="password" type="password" />
          <Button className="w-[200px]" type="submit">
            Login
          </Button>
        </form>
      </>
    );
}

export default LoginForm