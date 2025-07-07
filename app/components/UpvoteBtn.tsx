"use client";
import { upvotePost } from "../actions/posts";
import ArrowIcon from "./ArrowIcon";
import { toast } from "react-toastify";

const UpvoteBtn = ({
  postId,
  hasUpvoted,
}: {
  postId: number;
  hasUpvoted: boolean;
}) => {
  const handleClick = async () => {
    const res = await upvotePost(postId);
    if (!res.success) {
      toast.error(res.error || "Something went wrong.");
    }
  };

  return (
    <>
      <button onClick={handleClick} className="cursor-pointer">
        {hasUpvoted ? (
          <ArrowIcon
            stroke="#8e51ff"
            className="size-8 hover:opacity-30 transition-opacity"
          />
        ) : (
          <ArrowIcon className="size-8 hover:opacity-30 transition-opacity" />
        )}
      </button>
    </>
  );
};

export default UpvoteBtn;
