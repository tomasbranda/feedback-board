import ArrowIcon from "@/app/components/ArrowIcon";
import NewPostForm from "@/app/components/NewPostForm";
import { db } from "@/db/drizzle";
import { tag } from "@/db/schema";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "New post | Feedback Board",
};

const NewPost = async () => {
  const tags = await db.select().from(tag);
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-4 py-6 bg-white rounded overflow-hidden max-w-lg mx-auto">
      <Link
        href="/dashboard"
        className="font-bold flex items-center self-start">
        <ArrowIcon className="-rotate-90" />
        Go back
      </Link>
      <h2 className="text-xl font-bold text-gray-900 mt-4 text-center">
        Create a new feedback
      </h2>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <NewPostForm tags={tags} />
      </div>
    </div>
  );
};

export default NewPost;
