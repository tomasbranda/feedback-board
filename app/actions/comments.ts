"use server";

import { db } from "@/db/drizzle";
import { comment } from "@/db/schema";
import { auth } from "@/lib/auth";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod/v4";

type AddCommentState = {
  error?: string | null;
  success?: boolean;
  shouldReload?: boolean;
};

export const addComment = async (
  prevState: AddCommentState,
  formData: FormData
): Promise<AddCommentState> => {
  const postId = Number(formData.get("postId"));

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/sign-in");

  const formSchema = z.object({
    content: z
      .string()
      .min(3, "Comment must be at least 3 characters.")
      .max(512, "Comment must be at most 512 characters."),
  });

  const formDataObj = {
    content: formData.get("content"),
  };

  const parse = formSchema.safeParse(formDataObj);

  try {
    if (!parse.success) {
      const flattened = z.flattenError(parse.error);
      const errorMessage =
        flattened.fieldErrors.content?.[0] ?? "Invalid input";
      return {
        success: false,
        error: errorMessage,
      };
    }

    const { content } = parse.data;

    await db.insert(comment).values({
      content,
      postId,
      userId: session.user.id,
    });
    revalidatePath(`/dashboard/post/${postId}`);

    return { success: true, shouldReload: true, error: null };
  } catch (error) {
    return {
      success: false,
      error: "An error occurred while adding the comment.",
    };
  }
};

export const deleteComment = async (commentId: number) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/sign-in");

  const userId = session.user.id;

  const [userComment] = await db
    .select()
    .from(comment)
    .where(and(eq(comment.id, commentId), eq(comment.userId, userId)))
    .limit(1);

  if (!userComment) {
    // TODO: Come up with better solution
    alert("Unauthorized: You do not have permission to delete this comment.");
    return;
  }

  await db.delete(comment).where(eq(comment.id, commentId));
  revalidatePath(`/dashboard/post/${userComment.postId}`);
};
