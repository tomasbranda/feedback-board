"use server";

import { auth } from "@/lib/auth";
import { z } from "zod/v4";

type SignState = {
  inputErrors?: {
    email?: string | null;
    password?: string | null;
    name?: string | null;
  };
  authError?: string | null;
  shouldRedirect?: boolean;
  inputData?: {
    email: string;
    password: string;
    name: string;
  };
};

export const signIn = async (
  prevState: SignState,
  formData: FormData
): Promise<SignState> => {
  try {
    const inputData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    await auth.api.signInEmail({
      body: {
        email: inputData.email,
        password: inputData.password,
      },
    });

    return { shouldRedirect: true };
  } catch (error) {
    const e = error as Error;
    return {
      authError: e.message || "Something went wrong.",
      shouldRedirect: false,
    };
  }
};

export const signUp = async (
  prevState: SignState,
  formData: FormData
): Promise<SignState> => {
  const inputData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    name: formData.get("name") as string,
  };

  const formSchema = z.object({
    email: z
      .email("Invalid email address.")
      .nonempty("Email is required.")
      .max(256, "Please use a shorter email."),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters.")
      .nonempty("Password is required"),
    name: z
      .string()
      .min(3, "Name must be at least 3 characters.")
      .nonempty("Name is required")
      .max(32, "Name must be at most 32 characters."),
  });

  const parse = formSchema.safeParse(inputData);

  if (!parse.success) {
    const flattened = z.flattenError(parse.error);
    return {
      inputErrors: {
        email: flattened.fieldErrors.email?.[0] ?? null,
        password: flattened.fieldErrors.password?.[0] ?? null,
        name: flattened.fieldErrors.name?.[0] ?? null,
      },
      inputData,
    };
  }

  try {
    await auth.api.signUpEmail({
      body: {
        email: inputData.email,
        password: inputData.password,
        name: inputData.name,
      },
    });

    return { shouldRedirect: true };
  } catch (error) {
    const e = error as Error;
    return {
      authError: e.message || "Something went wrong.",
      shouldRedirect: false,
    };
  }
};
