"use client";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import SpinnerIcon from "@/app/components/SpinnerIcon";
import { signUp } from "@/app/actions/user";

export default function SignUp() {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(signUp, {
    inputErrors: {
      name: null,
      email: null,
      password: null,
    },
    authError: null,
    shouldRedirect: false,
  });

  useEffect(() => {
    if (state.shouldRedirect) {
      router.push("/dashboard");
    }
  }, [state.shouldRedirect, router]);

  return (
    <>
      {session ? (
        <>
          <p>You&apos;re already signed in as {session.user.name}</p>
          <Link href="/dashboard">Go to dashboard</Link>
        </>
      ) : (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Create an account
          </h2>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action={formAction} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm/6 font-medium text-gray-900">
                  Full name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="name"
                    defaultValue={state.inputData?.name}
                    autoComplete="name"
                    className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 sm:text-sm/6 ${
                      state.inputErrors?.name
                        ? "outline-1 outline-red-500"
                        : "outline-none"
                    }`}
                  />
                </div>
                {state.inputErrors?.name && (
                  <p className="text-red-500 mt-2 font-semibold">
                    {state.inputErrors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={state.inputData?.email}
                    autoComplete="email"
                    className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 sm:text-sm/6 ${
                      state.inputErrors?.email
                        ? "outline-1 outline-red-500"
                        : "outline-none"
                    }`}
                  />
                </div>
                {state.inputErrors?.email && (
                  <p className="text-red-500 mt-2 font-semibold">
                    {state.inputErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>

                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 sm:text-sm/6 ${
                      state.inputErrors?.password
                        ? "outline-1 outline-red-500"
                        : "outline-none"
                    }`}
                  />
                </div>
                {state.inputErrors?.password && (
                  <p className="text-red-500 mt-2 font-semibold">
                    {state.inputErrors.password}
                  </p>
                )}
              </div>
              {state.authError && (
                <p className="text-red-500 mt-2 font-semibold">
                  {state.authError}
                </p>
              )}
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-violet-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-violet-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 cursor-pointer">
                  {isPending ? (
                    <SpinnerIcon className="size-6 inline-block center" />
                  ) : (
                    "Sign up"
                  )}
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm/6 text-gray-500">
              Already have an account?{" "}
              <Link
                href="sign-in"
                className="font-semibold text-violet-600 hover:text-violet-500">
                Login here.
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
