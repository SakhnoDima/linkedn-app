"use client"
import axios from "axios";

export default function Home() {
  const handleClick = async () => {
    try {
      const res = await axios.post(
        "/api/linkedin", // URL вашого API маршруту
        { message: "Hello" },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data);
    } catch (error) {
      console.error("Error making request:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <button type="button" onClick={handleClick}>Hello</button>
      </div>
    </main>
  );
}

