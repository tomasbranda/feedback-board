"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import TagsMenu from "./TagsMenu";
import SignOutBtn from "./SignOutBtn";

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  status: "planned" | "ongoing" | "finished" | null;
  author: {
    id: string;
    name: string;
  } | null;
  tag: {
    name: string;
  } | null;
  upvoteCount: number;
  commentCount: number;
}
[];

const DashboardHeader = ({ posts }: { posts: Post[] }) => {
  const [open, setOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    setIsSmallScreen(!mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setIsSmallScreen(!event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const statusCounts = {
    planned: posts.filter((post) => post.status === "planned").length,
    ongoing: posts.filter((post) => post.status === "ongoing").length,
    completed: posts.filter((post) => post.status === "finished").length,
  };

  return (
    <>
      <div className="flex items-center justify-between md:grid md:grid-cols-3 md:gap-4 md:items-stretch lg:flex lg:flex-col lg:items-start lg:gap-4 lg:justify-stretch lg:max-w-sm md:bg-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 md:from-transparent md:via-transparent md:to-transparent p-6 md:p-0 shrink-0 rounded-lg md:rounded-none">
        <Link
          href="/dashboard"
          className="block text-xl font-bold md:p-6 text-white bg-gradient-to-r md:from-indigo-500 md:via-purple-500 md:to-pink-500 md:h-full lg:h-auto lg:w-full md:rounded-lg">
          Feedback Board
        </Link>

        {!isSmallScreen && <NavContent counts={statusCounts} />}

        {open && (
          <div className="fixed top-0 right-0 p-2 w-screen h-screen bg-black/50 z-50 flex flex-col items-end gap-4 md:hidden">
            <button
              onClick={() => setOpen(false)}
              className="bg-white py-1 rounded-lg p-2 text-black font-bold hover:text-red-500 transition-colors text-2xl md:hidden cursor-pointer">
              ✖
            </button>
            <NavContent counts={statusCounts} />
          </div>
        )}
        <button
          className="bg-white py-2 px-3 text-black rounded cursor-pointer transition-opacity hover:opacity-50 font-semibold text-sm md:hidden"
          onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>
    </>
  );
};

const NavContent = ({
  counts,
}: {
  counts: { planned: number; ongoing: number; completed: number };
}) => {
  return (
    <>
      <TagsMenu />
      <div className="p-4 bg-white rounded-lg md:w-full">
        <div className="flex gap-8 justify-between">
          <h2 className="font-bold text-lg">Roadmap</h2>
          <Link
            href="/dashboard/roadmap"
            className="text-blue-500 font-semibold underline hover:opacity-50 transition-opacity">
            View
          </Link>
        </div>
        <ul className="mt-4 space-y-1">
          <li className="before:content-['●'] before:absolute relative before:left-0 before:text-orange-500 pl-4 flex justify-between">
            Planned: <span className="font-semibold">{counts.planned}</span>
          </li>
          <li className="before:content-['●'] before:text-green-500 before:absolute relative before:left-0 pl-4 flex justify-between">
            Ongoing: <span className="font-semibold">{counts.ongoing}</span>
          </li>
          <li className="before:content-['●'] before:text-blue-500 before:absolute relative before:left-0 pl-4 flex justify-between">
            Completed: <span className="font-semibold">{counts.completed}</span>
          </li>
        </ul>
      </div>
      <div className="md:hidden">
        <SignOutBtn />
      </div>
    </>
  );
};

export default DashboardHeader;
