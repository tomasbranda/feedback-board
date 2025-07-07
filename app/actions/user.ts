"use server";

import { auth } from "@/lib/auth";

type SignState = {
  error?: string | null;
  shouldRedirect?: boolean;
};

export const signIn = async (
  prevState: SignState,
  formData: FormData
): Promise<SignState> => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    return { shouldRedirect: true };
  } catch (error) {
    const e = error as Error;
    return {
      error: e.message || "Something went wrong.",
      shouldRedirect: false,
    };
  }
};

export const signUp = async (
  prevState: SignState,
  formData: FormData
): Promise<SignState> => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;

    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });

    return { shouldRedirect: true };
  } catch (error) {
    const e = error as Error;
    return {
      error: e.message || "Something went wrong.",
      shouldRedirect: false,
    };
  }
};
