"use client";

import { toast } from "react-toastify";
import { movePost } from "../actions/posts";
import ArrowIcon from "./ArrowIcon";

const PromotePostBtn = ({
  postId,
  postStatus,
}: {
  postId: number;
  postStatus: "planned" | "ongoing" | "finished" | null;
}) => {
  const handleClick = async () => {
    const res = await movePost(postId, postStatus, "promotion");
    if (res.success) {
      toast.success(`Sucessfully promoted post to ${res.status}`);
    } else {
      toast.error(res.error || "Something went wrong.");
    }
  };
  return (
    <>
      <button
        className="text-slate-800 py-2 px-3 shadow rounded cursor-pointer transition-colors hover:bg-green-200 font-semibold text-sm mt-4 flex items-center gap-2"
        onClick={handleClick}>
        <ArrowIcon />
        Promote feedback
      </button>
    </>
  );
};

export default PromotePostBtn;
