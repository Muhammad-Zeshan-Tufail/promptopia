import Feed from "@/components/Feed";
import React from "react";

const Home = () => {
  return (
    <section className="w-full flex flex-col items-center justify-center">
      <h1 className="text-[48px] text-gray-600 font-bold mt-5 text-center">
        Discover & Share
      </h1>
      <br className="max-md:hidden" />
      <span className="text-[48px] text-center font-bold bg-gradient-to-r from-orange-300 via-orange-600 to-orange-300 text-transparent bg-clip-text">
        AI Powered Prompts
      </span>
      <p className="text-[20px] text-gray-600 text-center md:w-1/2">
        Experience the power of AI with Promptopia - the ultimate AI tool for
        businesses of all sizes. With Promptopia, you can streamline your
        workflow, automate repetitive tasks, and make data-driven decisions with
        ease.
      </p>
      <Feed />
    </section>
  );
};

export default Home;
