"use client";

import { movePost } from "../actions/posts";
import ArrowIcon from "./ArrowIcon";

const DemotePostBtn = ({
  postId,
  postStatus,
}: {
  postId: number;
  postStatus: "planned" | "ongoing" | "finished" | null;
}) => {
  return (
    <button
      className="text-slate-800 py-2 px-3 shadow rounded cursor-pointer transition-colors hover:bg-red-200 font-semibold text-sm mt-4 flex items-center gap-2"
      onClick={async () => await movePost(postId, postStatus, "demotion")}>
      <ArrowIcon className="rotate-180" />
      Demote feedback
    </button>
  );
};

export default DemotePostBtn;
