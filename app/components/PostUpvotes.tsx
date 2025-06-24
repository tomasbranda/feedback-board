import { db } from "@/db/drizzle";
import { upvote } from "@/db/schema";
import { auth } from "@/lib/auth";
import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import UpvoteBtn from "./UpvoteBtn";

const PostUpvotes = async ({
  postId,
  upvoteCount,
}: {
  postId: number;
  upvoteCount: number;
}) => {
  let hasUpvoted = false;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    const [userUpvote] = await db
      .select()
      .from(upvote)
      .where(
        and(eq(upvote.postId, postId), eq(upvote.userId, session.user.id))
      );
    hasUpvoted = !!userUpvote;
  }

  return (
    <div className="flex items-center gap-2">
      <UpvoteBtn postId={postId} hasUpvoted={hasUpvoted} />
      <p className="font-semibold">{upvoteCount}</p>
    </div>
  );
};

export default PostUpvotes;
