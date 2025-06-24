"use client";

import { useSearchParams, useRouter } from "next/navigation";
import ArrowIcon from "./ArrowIcon";

const SortMenu = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") ?? "newest";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", newSort);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-4">
      <label htmlFor="sort">Sort by:</label>
      <div className="grid grid-cols-1">
        <select
          id="sort"
          name="sort"
          className="col-start-1 row-start-1 w-full appearance-none rounded-md  py-1.5 pr-8 pl-3  outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-500 text-sm bg-slate-800"
          onChange={handleChange}
          value={currentSort}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="upvotes">Upvotes</option>
          <option value="comments">Comments</option>
        </select>
        <ArrowIcon
          stroke="#fff"
          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 rotate-180"
        />
      </div>
    </div>
  );
};

export default SortMenu;
