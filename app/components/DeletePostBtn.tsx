"use client";

import { deletePost } from "../actions/posts";
import TrashcanIcon from "./TrashcanIcon";

const DeletePostBtn = ({ postId }: { postId: number }) => {
  const handleClick = async () => {
    const confirmation = confirm("Are you sure you want to delete this post?");
    if (confirmation) await deletePost(postId);
  };

  return (
    <button
      className="inline-block bg-red-500 text-white py-2 px-4 rounded hover:bg-red-300 transition-colors font-semibold cursor-pointer"
      onClick={handleClick}>
      <TrashcanIcon />
    </button>
  );
};

export default DeletePostBtn;
