"use client";

import { useActionState, useEffect } from "react";
import { deletePost } from "../actions/posts";
import TrashcanIcon from "./TrashcanIcon";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const DeletePostBtn = ({ postId }: { postId: number }) => {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(deletePost, {
    message: "",
    status: "",
    redirect: null,
  });

  useEffect(() => {
    if (!state) return;

    switch (state.status) {
      case "success":
        toast.success(state.message);
        break;
      case "error":
        toast.error(state.message);
        break;
      case "info":
        toast.info(state.message);
        break;
    }

    if (state.redirect) {
      router.push(state.redirect);
    }
  }, [state, router]);

  return (
    <form action={formAction}>
      <input
        type="hidden"
        value={postId}
        className="hidden"
        name="postId"
        id="postId"
        readOnly
      />
      <button
        className="inline-block bg-red-500 text-white p-2 rounded hover:bg-red-300 transition-colors font-semibold cursor-pointer self-start"
        disabled={isPending}>
        <TrashcanIcon width={16} height={16} />
      </button>
    </form>
  );
};

export default DeletePostBtn;
