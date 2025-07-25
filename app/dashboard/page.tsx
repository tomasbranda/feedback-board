import Link from "next/link";
import PostList from "../components/PostList";
import SortMenu from "../components/SortMenu";
import DashboardHeader from "../components/DashboardHeader";
import SignOutBtn from "../components/SignOutBtn";
import { db } from "@/db/drizzle";
import { comment, post, tag, upvote, user } from "@/db/schema";
import { countDistinct, desc, eq, sql } from "drizzle-orm";
import TopButton from "../components/TopButton";
import { Metadata } from "next";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard | Feedback Board",
};

const Dashboard = async ({
  searchParams,
}: {
  searchParams: Promise<{
    sort: "newest" | "oldest" | "upvotes" | "comments";
    tag?: string;
  }>;
}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const currentUserId = session.user.id;

  const sortParam = (await searchParams).sort ?? "newest";
  const tagParam = (await searchParams).tag ?? "";
  let orderByClause;
  switch (sortParam) {
    case "newest":
      orderByClause = desc(post.createdAt);
      break;
    case "oldest":
      orderByClause = post.createdAt;
      break;
    case "upvotes":
      orderByClause = desc(countDistinct(upvote.id));
      break;
    case "comments":
      orderByClause = desc(countDistinct(comment.id));
      break;
    default:
      orderByClause = desc(post.createdAt);
      break;
  }

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
      isUpvoted: sql<boolean>`
      BOOL_OR(${upvote.userId} = ${session.user.id})
    `,
    })
    .from(post)
    .leftJoin(user, eq(post.userId, user.id))
    .leftJoin(tag, eq(post.tagId, tag.id))
    .leftJoin(upvote, eq(post.id, upvote.postId))
    .leftJoin(comment, eq(post.id, comment.postId))
    .groupBy(post.id, user.id, tag.id)
    .orderBy(orderByClause);

  return (
    <>
      <div className="min-h-screen lg:flex lg:gap-8 max-w-7xl mx-auto">
        <DashboardHeader posts={posts} />
        <div className="lg:flex-1">
          <div className="py-4 px-6 bg-slate-800 flex items-center justify-between text-white mt-8 lg:mt-0 flex-wrap gap-y-4">
            <SortMenu />
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard/post/new"
                className="inline-block bg-violet-600 py-2 px-3 text-sm rounded hover:bg-violet-500 transition-colors font-bold">
                + New post
              </Link>
              <div className="hidden md:block">
                <SignOutBtn />
              </div>
            </div>
          </div>
          <ul className="space-y-4">
            <PostList posts={posts} tagParam={tagParam} />
          </ul>
        </div>
        <TopButton />
      </div>
    </>
  );
};

export default Dashboard;
