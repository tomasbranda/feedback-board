"use client";

import { useSearchParams, useRouter } from "next/navigation";

const TagsMenu = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = (tag: string) => () => {
    const params = new URLSearchParams(searchParams.toString());
    if (tag === "all") {
      params.delete("tag");
      router.push(`?${params.toString()}`);
      return;
    } else {
      params.set("tag", tag);
      router.push(`?${params.toString()}`);
    }
  };

  return (
    <div className="bg-white p-4 flex flex-wrap gap-2 text-blue-500 rounded-lg text-sm max-w-xs items-center">
      <button
        className="bg-sky-100 rounded-full py-1 px-3 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={handleClick("all")}>
        All
      </button>
      <button
        className="bg-sky-100 rounded-full py-1 px-3 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={handleClick("ui")}>
        UI
      </button>
      <button
        className="bg-sky-100 rounded-full py-1 px-3 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={handleClick("ux")}>
        UX
      </button>
      <button
        className="bg-sky-100 rounded-full py-1 px-3 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={handleClick("enhancement")}>
        Enhancement
      </button>
      <button
        className="bg-sky-100 rounded-full py-1 px-3 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={handleClick("feature")}>
        Feature
      </button>
      <button
        className="bg-sky-100 rounded-full py-1 px-3 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={handleClick("bug")}>
        Bug
      </button>
    </div>
  );
};

export default TagsMenu;
