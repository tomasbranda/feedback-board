"use server";

import { db } from "@/db/drizzle";
import { post, upvote } from "@/db/schema";
import { auth } from "@/lib/auth";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod/v4";

type PostFormState = {
  success?: boolean;
  errors: {
    title?: string[];
    tagId?: string[];
    description?: string[];
  } | null;
  shouldRedirect?: boolean;
};
export const addPost = async (
  prevState: PostFormState,
  formData: FormData
): Promise<PostFormState> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/sign-in");

  const userId = session.user.id;

  const formSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    tagId: z.number().min(1, "Select a valid tag").max(5, "Select a valid tag"),
    description: z.string().min(3, "Description must be at least 3 characters"),
  });

  try {
    const parse = formSchema.safeParse({
      title: formData.get("title"),
      tagId: Number(formData.get("tagId")),
      description: formData.get("description"),
    });

    if (!parse.success) {
      return {
        errors: parse.error.flatten().fieldErrors,
      };
    }

    const { title, tagId, description } = parse.data;

    await db
      .insert(post)
      .values({ title, content: description, userId, tagId });
    revalidatePath("/dashboard");

    return {
      success: true,
      errors: null,
      shouldRedirect: true,
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      errors: null,
    };
  }
};

export const upvotePost = async (postId: number) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const userId = session.user.id;

  // Check if the upvote already exists
  const existingUpvote = await db
    .select()
    .from(upvote)
    .where(and(eq(upvote.postId, postId), eq(upvote.userId, userId)))
    .limit(1);

  if (existingUpvote.length > 0) {
    // If upvote exists, delete it (unupvote)
    await db
      .delete(upvote)
      .where(and(eq(upvote.postId, postId), eq(upvote.userId, userId)));
    revalidatePath(`/dashboard/post/${postId}`);
    return { status: "unupvoted" };
  } else {
    // Otherwise, insert a new upvote
    await db.insert(upvote).values({
      postId,
      userId,
    });

    revalidatePath(`/dashboard/post/${postId}`);
    return { status: "upvoted" };
  }
};

export const movePost = async (
  postId: number,
  postStatus: string | null,
  action: "promotion" | "demotion"
) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  type Status = null | "planned" | "ongoing" | "finished";
  const statusOrder: Status[] = ["planned", "ongoing", "finished"];

  const currentStatus = postStatus as Status | null;

  let newStatus: Status | null;

  if (action === "promotion") {
    if (currentStatus === "finished") return;
    newStatus =
      currentStatus === null
        ? statusOrder[0]
        : statusOrder[statusOrder.indexOf(currentStatus) + 1];
  } else {
    if (currentStatus === null) return;
    newStatus =
      currentStatus === statusOrder[0]
        ? null
        : statusOrder[statusOrder.indexOf(currentStatus) - 1];
  }

  await db.update(post).set({ status: newStatus }).where(eq(post.id, postId));
  revalidatePath(`/dashboard/post/${postId}`);
  revalidatePath(`/dashboard`);
};

export const deletePost = async (postId: number) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/sign-in");

  const userId = session.user.id;

  const [userPost] = await db
    .select()
    .from(post)
    .where(and(eq(post.id, postId), eq(post.userId, userId)))
    .limit(1);

  console.log(userPost);

  if (!userPost) {
    // TODO: Come up with better solution
    alert("Unauthorized: You do not have permission to delete this post.");
    return;
  }

  await db.delete(post).where(eq(post.id, postId));
  revalidatePath(`/dashboard/post/${postId}`);
  revalidatePath(`/dashboard`);
  redirect("/dashboard");
};
