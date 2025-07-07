"use client";
import { addPost } from "../actions/posts";
import { Suspense, useActionState, useEffect } from "react";
import NewPostSelect from "./NewPostSelect";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const NewPostForm = ({ tags }: { tags: { id: number; name: string }[] }) => {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(addPost, {
    errors: null,
    success: null,
  });

  useEffect(() => {
    if (state.success) {
      toast.success("Post added successfully");
      router.push("/dashboard");
    } else if (state.success === null && state.errors === null) {
      return;
    } else if (!state.success && !state.errors) {
      toast.error("Something went wrong!");
    }
  }, [state, router]);

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label
          htmlFor="title"
          className="block text-sm/6 font-medium text-gray-900">
          Feedback title
        </label>
        <p className="text-sm text-gray-500">
          Add a short, descriptive headline
        </p>
        <div className="mt-2">
          <input
            id="title"
            name="title"
            type="text"
            required
            className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${
              state.errors?.title
                ? "outline-1 outline-red-500"
                : "outline-gray-300"
            }`}
          />
          {state.errors?.title && (
            <p className="mt-1 text-sm text-red-600">{state.errors.title[0]}</p>
          )}
        </div>
      </div>
      <div>
        <label
          htmlFor="tagId"
          className="block text-sm/6 font-medium text-gray-900">
          Feedback Category
        </label>
        <p className="text-sm text-gray-500">
          Choose a category for your feedback
        </p>
        <div className="mt-2 grid grid-cols-1">
          <Suspense
            fallback={
              <select
                id="tagId"
                name="tagId"
                className={`col-start-1 row-start-1 w-full appearance-none rounded-md bg-red-500 py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 focus:outline-2 outline-red-500 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`}>
                <option>Loading…</option>
              </select>
            }>
            <NewPostSelect tags={tags} />
          </Suspense>
          <svg
            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
            data-slot="icon">
            <path
              fillRule="evenodd"
              d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {state.errors?.tagId && (
          <p className="mt-1 text-sm text-red-600">{state.errors.tagId[0]}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm/6 font-medium text-gray-900">
          Feedback detail
        </label>
        <p className="text-sm text-gray-500">
          Include any specific comments on what should be improved, added, etc.
        </p>
        <div className="mt-2">
          <textarea
            name="description"
            id="description"
            required
            cols={30}
            rows={10}
            className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${
              state.errors?.description
                ? "outline-1 outline-red-500"
                : "outline-gray-300"
            }`}></textarea>
        </div>
        {state.errors?.description && (
          <p className="mt-1 text-sm text-red-600">
            {state.errors.description[0]}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors cursor-pointer"
        disabled={isPending}>
        {isPending ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default NewPostForm;
