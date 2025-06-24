import { db } from "@/db/drizzle";
import { comment, user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import DeleteCommentBtn from "./DeleteCommentBtn";

const CommentList = async ({ postId }: { postId: number }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const comments = await db
    .select({
      id: comment.id,
      content: comment.content,
      userId: comment.userId,
      userName: user.name,
    })
    .from(comment)
    .where(eq(comment.postId, postId))
    .leftJoin(user, eq(user.id, comment.userId));

  return (
    <>
      <p className="font-extrabold text-xl mb-4">
        {comments.length} {comments.length === 1 ? "comment:" : "comments:"}
      </p>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b border-slate-200 pb-4">
            <div className="flex justify-between items-center">
              <p className="font-semibold">{comment.userName}</p>
              {session?.user.id === comment.userId && (
                <DeleteCommentBtn commentId={comment.id} />
              )}
            </div>
            <p className="mt-2 text-slate-600">{comment.content}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default CommentList;
