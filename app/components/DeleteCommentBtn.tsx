"use client";

import { deleteComment } from "../actions/comments";
import TrashcanIcon from "./TrashcanIcon";

const DeleteCommentBtn = ({ commentId }: { commentId: number }) => {
  const handleClick = async () => {
    const confirmation = confirm(
      "Are you sure you want to delete this comment?"
    );
    if (confirmation) await deleteComment(commentId);
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
