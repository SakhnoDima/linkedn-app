import React from "react";
import ThreeScene from "./scenes/wave.js";

const Home = () => {
  return (
    <div>
      <h1 className="block max-w-[80%] mb-[30px] text-8xl font-semibold font-poppins">
        Welcome to LeadFlow
      </h1>
      <span className="block max-w-[50%] w-[50%] text-xl font-light font-poppins">
        Solution designed to streamline and optimize lead generation and client
        engagement processes for businesses.
      </span>
      <ThreeScene />
    </div>
  );
};

export default Home;
