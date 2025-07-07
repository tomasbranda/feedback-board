import Comments from "@/app/components/Comments";
import { db } from "@/db/drizzle";
import { post, tag, upvote, user } from "@/db/schema";
import { count, eq } from "drizzle-orm";
import Link from "next/link";
import ArrowIcon from "@/app/components/ArrowIcon";
import PostUpvotes from "@/app/components/PostUpvotes";
import { Suspense } from "react";
import PromotePostBtn from "@/app/components/PromotePostBtn";
import DemotePostBtn from "@/app/components/DemotePostBtn";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import DeletePostBtn from "@/app/components/DeletePostBtn";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Post | Feedback Board",
};

export default async function Post({
  params,
}: {
  params: Promise<{ postId: number }>;
}) {
  const { postId } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const [postData] = await db
    .select({
      id: post.id,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      status: post.status,
      author: {
        id: user.id,
        name: user.name,
      },
      tag: {
        name: tag.name,
      },
      upvoteCount: count(upvote.id),
    })
    .from(post)
    .leftJoin(user, eq(post.userId, user.id))
    .leftJoin(tag, eq(post.tagId, tag.id))
    .leftJoin(upvote, eq(post.id, upvote.postId))
    .where(eq(post.id, postId))
    .groupBy(post.id, user.id, tag.id);

  if (!postData) {
    return notFound();
  }

  let color: string;
  switch (postData.status) {
    case "planned":
      color = "bg-orange-300";
      break;
    case "ongoing":
      color = "bg-blue-300";
      break;
    case "finished":
      color = "bg-green-300";
      break;
    default:
      color = "";
      break;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Link
        href="/dashboard"
        className="mb-4 py-2 px-4 bg-white rounded flex items-center gap-2 cursor-pointer text-violet-500 font-semibold ">
        <ArrowIcon className="-rotate-90" />
        Back to dashboard
      </Link>
      <div className="bg-white shadow rounded-md mb-6 overflow-hidden">
        <div className={`h-2 ${color}`}></div>
        <div className="p-6">
          <div className="flex justify-between">
            <div>
              <h2 className="font-extrabold text-lg">{postData.title}</h2>
              <p className="text-sm">by {postData.author?.name}</p>
            </div>
            {session?.user && session?.user.id === postData.author?.id && (
              <DeletePostBtn postId={postData.id} />
            )}
          </div>
          <p className="text-slate-800 my-4">{postData.content}</p>
          <div className="bg-sky-100 text-blue-500 py-2 px-3 inline-block rounded-xl font-semibold text-sm mb-4">
            <Link
              href={{
                pathname: "/dashboard",
                query: { tag: postData.tag?.name },
              }}>
              {postData.tag?.name}
            </Link>
          </div>
          <Suspense fallback={<p>Loading...</p>}>
            <PostUpvotes
              postId={postData.id}
              upvoteCount={postData.upvoteCount}
            />
          </Suspense>
          <div className="flex items-center gap-4">
            {postData.status !== null && (
              <DemotePostBtn
                postId={postData.id}
                postStatus={postData.status}
              />
            )}
            {postData.status !== "finished" && (
              <PromotePostBtn
                postId={postData.id}
                postStatus={postData.status}
              />
            )}
          </div>
        </div>
      </div>
      <Comments postId={postData.id} />
    </div>
  );
}
