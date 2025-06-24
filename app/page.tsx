import Link from "next/link";
import React from "react";
import hero from "../public/hero.svg";
import Image from "next/image";

const Home = async () => {
  return (
    <>
      <main className="flex flex-col gap-3 items-center justify-center p-10">
        <h1 className="text-3xl font-bold bg-violet-500 py-2 px-4 text-white relative after:absolute after:content-['💡'] after:-rotate-45 after:-left-6 after:-top-4 before:absolute before:content-['📝'] before:rotate-45 before:-right-6 before:-bottom-4">
          Feedback Board
        </h1>
        <p className="text-center mt-6 md:text-xl max-w-xl">
          Give feedback, share tips, and make a real impact on your dev
          projects. Make them better, one idea at a time.
        </p>
        <Image src={hero} alt="hero" className="w-md" />
        <Link
          href="/dashboard"
          className="bg-violet-500 py-2 px-4 rounded-md cursor-pointer text-white transition-colors hover:bg-violet-400 font-semibold">
          Get started
        </Link>
      </main>
    </>
  );
};

export default Home;

