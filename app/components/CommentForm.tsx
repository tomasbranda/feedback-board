"use client";
import { useRouter } from "next/navigation";
import { addComment } from "../actions/comments";
import { useActionState, useEffect, useState } from "react";
import SpinnerIcon from "./SpinnerIcon";

const CommentForm = ({ postId }: { postId: number }) => {
  const router = useRouter();
  const [comment, setComment] = useState("");
  const [state, formAction, isPending] = useActionState(addComment, {
    error: null,
    shouldReload: false,
  });

  useEffect(() => {
    if (state.shouldReload) {
      setComment("");
      router.refresh();
    }
  }, [state, router]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newComment = e.target.value;
    if (newComment.length > 512) {
      return;
    } else {
      setComment(newComment);
    }
  };

  return (
    <>
      <h2 className="font-semibold text-xl mt-8">Add a comment</h2>
      <form className="flex flex-col" action={formAction}>
        {state.error && (
          <p className="text-red-500 mt-2 font-semibold">{state.error}</p>
        )}
        <input type="hidden" name="postId" value={postId} />
        <textarea
          name="content"
          id="content"
          className={`shadow p-4 mt-2 bg-stone-50 rounded ${
            state.error ? "outline-1 outline-red-500" : "outline-none"
          }`}
          placeholder="Type your comment here…"
          onChange={(e) => handleChange(e)}
          value={comment}
          rows={5}></textarea>
        <p className="mt-2 text-right text-slate-600">{comment.length} / 512</p>
        <button
          type="submit"
          className="bg-violet-500 p-2 text-white mt-4 cursor-pointer transition-colors hover:bg-violet-400 rounded"
          disabled={isPending}>
          {isPending ? (
            <SpinnerIcon className="size-4 inline-block center" />
          ) : (
            "Add comment"
          )}
        </button>
      </form>
    </>
  );
};

export default CommentForm;
