import ArrowIcon from "@/app/components/ArrowIcon";
import RoadmapPost from "@/app/components/RoadmapPost";
import { db } from "@/db/drizzle";
import { comment, post, tag, upvote, user } from "@/db/schema";
import { count, countDistinct, desc, eq, isNotNull } from "drizzle-orm";
import Link from "next/link";

const Roadmap = async () => {
  const posts = await db
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
      upvoteCount: countDistinct(upvote.id),
      commentCount: countDistinct(comment.id),
    })
    .from(post)
    .where(isNotNull(post.status))
    .leftJoin(user, eq(post.userId, user.id))
    .leftJoin(tag, eq(post.tagId, tag.id))
    .leftJoin(upvote, eq(post.id, upvote.postId))
    .leftJoin(comment, eq(post.id, comment.postId))
    .groupBy(post.id, user.id, tag.id)
    .orderBy(desc(count(upvote.id)));

  return (
    <>
      <div className="min-h-screen bg-stone-100 max-w-7xl mx-auto">
        <div className="p-6 bg-gray-800 text-white flex items-center justify-between rounded-lg">
          <div>
            <Link href="/dashboard" className="font-bold flex items-center">
              <ArrowIcon className="-rotate-90" />
              Go back
            </Link>
            <h1 className="text-xl font-bold mt-1">Roadmap</h1>
          </div>
          <Link
            href="/dashboard/post/new"
            className="inline-block bg-violet-600 py-2 px-4 rounded hover:bg-violet-500 transition-colors font-semibold">
            + New post
          </Link>
        </div>

        <div className="flex flex-col gap-4 mt-8 items-center md:flex-row md:items-start justify-center">
          <div className="w-full md:flex-1/3 max-w-md">
            <h2 className="font-bold text-lg before:content-['●'] before:text-orange-500 before:absolute relative before:left-0 pl-4">
              Planned (
              {posts.filter((post) => post.status === "planned").length})
            </h2>
            <ul className="space-y-4 mt-4">
              {posts
                .filter((post) => post.status === "planned")
                .map((post) => (
                  <RoadmapPost
                    key={post.id}
                    post={post}
                    color="bg-orange-300"
                  />
                ))}
            </ul>
          </div>

          <div className="w-full md:flex-1/3 max-w-md">
            <h2 className="font-bold text-lg before:content-['●'] before:text-blue-500 before:absolute relative before:left-0 pl-4">
              Ongoing (
              {posts.filter((post) => post.status === "ongoing").length})
            </h2>
            <ul className="space-y-4 mt-4">
              {posts
                .filter((post) => post.status === "ongoing")
                .map((post) => (
                  <RoadmapPost key={post.id} post={post} color="bg-blue-300" />
                ))}
            </ul>
          </div>

          <div className="w-full md:flex-1/3 max-w-md">
            <h2 className="font-bold text-lg before:content-['●'] before:text-green-500 before:absolute relative before:left-0 pl-4">
              Finished (
              {posts.filter((post) => post.status === "finished").length})
            </h2>
            <ul className="space-y-4 mt-4">
              {posts
                .filter((post) => post.status === "finished")
                .map((post) => (
                  <RoadmapPost key={post.id} post={post} color="bg-green-300" />
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Roadmap;
