"use client";

import { toast } from "react-toastify";
import { deleteComment } from "../actions/comments";
import TrashcanIcon from "./TrashcanIcon";

const DeleteCommentBtn = ({ commentId }: { commentId: number }) => {
  const handleClick = async () => {
    const res = await deleteComment(commentId);
    if (!res.success) {
      toast.error(res.error || "Something went wrong.");
    }
  };

  return (
    <button
      className="inline-block text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
      onClick={handleClick}>
      <TrashcanIcon width={18} height={18} />
    </button>
  );
};

export default DeleteCommentBtn;
