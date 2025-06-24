"use client";
import { useTransition } from "react";
import { upvotePost } from "../actions/posts";
import ArrowIcon from "./ArrowIcon";

const UpvoteBtn = ({
  postId,
  hasUpvoted,
}: {
  postId: number;
  hasUpvoted: boolean;
}) => {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await upvotePost(postId);
    });
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={isPending}
        className="cursor-pointer">
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
