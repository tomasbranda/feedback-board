import Link from "next/link";
import React from "react";
import previewImage from "@/public/preview.png";

const Home = async () => {
  return (
    <>
      <div className="relative isolate overflow-hidden bg-white rounded-4xl">
        <div className="mx-auto max-w-7xl px-6 pt-10 pb-24 sm:pb-32 lg:flex lg:px-8 lg:py-32">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:shrink-0 lg:pt-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 16 16">
              <path
                fill="#8e51ff"
                fillRule="evenodd"
                d="M3 13.5a.5.5 0 0 1-.5-.5V3a.5.5 0 0 1 .5-.5h9.25a.75.75 0 0 0 0-1.5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9.75a.75.75 0 0 0-1.5 0V13a.5.5 0 0 1-.5.5zm12.78-8.82a.75.75 0 0 0-1.06-1.06L9.162 9.177L7.289 7.241a.75.75 0 1 0-1.078 1.043l2.403 2.484a.75.75 0 0 0 1.07.01z"
                clipRule="evenodd"
              />
            </svg>

            <h1 className="mt-10 text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl lg:animate-fade-in-right">
              Build Better Apps Together
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 lg:opacity-0 lg:animate-[2s_ease-in-out_1.5s_forwards_fade-in-up] ">
              Unleash your team’s creativity with a shared space for ideas,
              feedback, and collaboration. Whether you're brainstorming features
              or refining user flows, this app keeps everyone aligned and
              inspired from concept to launch.
            </p>
            <Link
              href="/dashboard"
              className="rounded-md bg-violet-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-violet-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 mt-10 cursor-pointer inline-block transition-colors">
              Get started
            </Link>
          </div>
          <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:mt-0 lg:mr-0 lg:ml-10 lg:max-w-none lg:flex-none xl:ml-32">
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-gray-900/10 ring-inset lg:-m-4 lg:rounded-2xl lg:p-4 lg:animate-fade-in-left">
                <img
                  alt="App screenshot"
                  src={previewImage.src}
                  className=" rounded-md ring-1 shadow-2xl ring-gray-900/10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-8 text-center text-sm text-gray-500">
        &copy; 2025 Tomáš Branda
      </p>
    </>
  );
};

export default Home;

