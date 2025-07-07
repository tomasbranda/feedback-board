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
  success?: boolean | null;
  errors: {
    title?: string[];
    tagId?: string[];
    description?: string[];
  } | null;
};
export const addPost = async (
  prevState: PostFormState,
  formData: FormData
): Promise<PostFormState> => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) redirect("/sign-in");

    const userId = session.user.id;

    const formSchema = z.object({
      title: z.string().min(3, "Title must be at least 3 characters"),
      tagId: z
        .number()
        .min(1, "Select a valid tag")
        .max(5, "Select a valid tag"),
      description: z
        .string()
        .min(3, "Description must be at least 3 characters"),
    });

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
    };
  } catch (error) {
    return {
      success: false,
      errors: null,
    };
  }
};

export const upvotePost = async (postId: number) => {
  try {
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

      return { success: true };
    } else {
      // Otherwise, insert a new upvote
      await db.insert(upvote).values({
        postId,
        userId,
      });
      revalidatePath(`/dashboard/post/${postId}`);

      return { success: true };
    }
  } catch (error) {
    return {
      success: false,
      error: "An error occurred while toggling the upvote.",
    };
  }
};

export const movePost = async (
  postId: number,
  postStatus: string | null,
  action: "promotion" | "demotion"
) => {
  try {
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
      if (currentStatus === "finished")
        return {
          success: false,
          error: "You cannot promote a finished post.",
        };
      newStatus =
        currentStatus === null
          ? statusOrder[0]
          : statusOrder[statusOrder.indexOf(currentStatus) + 1];
    } else {
      if (currentStatus === null)
        return {
          success: false,
          error: "You cannot demote a post that hasn't been promoted.",
        };
      newStatus =
        currentStatus === statusOrder[0]
          ? null
          : statusOrder[statusOrder.indexOf(currentStatus) - 1];
    }

    await db.update(post).set({ status: newStatus }).where(eq(post.id, postId));
    revalidatePath(`/dashboard/post/${postId}`);
    revalidatePath(`/dashboard`);

    if (newStatus === null) {
      return { success: true, status: "backlog" };
    } else {
      return { success: true, status: newStatus };
    }
  } catch (error) {
    return {
      success: false,
      error: "An error occurred while changing the post status.",
    };
  }
};

type DeletePostState = {
  message: string;
  status: string;
  redirect?: string | null;
};

export const deletePost = async (
  prevState: DeletePostState,
  formData: FormData
): Promise<DeletePostState> => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      console.log("You must be signed in to delete a post.");
      return {
        message: "You must be signed in to delete a post.",
        status: "error",
        redirect: "/sign-in",
      };
    }

    const postId = Number(formData.get("postId")) as number;

    const userId = session.user.id;
    const [userPost] = await db
      .select()
      .from(post)
      .where(and(eq(post.id, postId), eq(post.userId, userId)))
      .limit(1);

    if (!userPost) {
      return {
        message: "You do not have permission to delete this post.",
        status: "error",
      };
    }

    await db.delete(post).where(eq(post.id, postId));
    return {
      message: "Post deleted successfully.",
      redirect: "/dashboard",
      status: "success",
    };
  } catch (error) {
    return {
      message: "An error occurred while deleting the post.",
      status: "error",
    };
  }
};
