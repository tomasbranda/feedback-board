"use client";
import { useOptimistic, useTransition } from "react";
import { upvotePost } from "../actions/posts";
import ArrowIcon from "./ArrowIcon";
import { toast } from "react-toastify";

const PostUpvotes = ({
  postId,
  upvoteCount,
  isUpvoted,
}: {
  postId: number;
  upvoteCount: number;
  isUpvoted: boolean;
}) => {
  const [optimisticState, setOptimisticState] = useOptimistic(
    { upvoteCount, isUpvoted },
    (state, newUpvoteStatus: boolean) => ({
      upvoteCount: state.upvoteCount + (newUpvoteStatus ? 1 : -1),
      isUpvoted: newUpvoteStatus,
    })
  );
  const [isPending, startTransition] = useTransition();

  const handleClick = async () => {
    const newUpvoteStatus = !optimisticState.isUpvoted;

    startTransition(() => {
      setOptimisticState(newUpvoteStatus);
    });

    const res = await upvotePost(postId);
    if (!res.success) {
      toast.error(res.error || "Something went wrong.");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button onClick={handleClick} className="cursor-pointer">
        <ArrowIcon
          stroke={optimisticState.isUpvoted ? "#8e51ff" : "currentColor"}
          className="size-8 hover:opacity-30 transition-opacity"
        />
      </button>
      <p className="font-semibold">{optimisticState.upvoteCount}</p>
    </div>
  );
};

export default PostUpvotes;
