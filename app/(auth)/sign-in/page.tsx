"use client";
import { signIn } from "@/app/actions/user";
import SpinnerIcon from "@/app/components/SpinnerIcon";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

const SignIn = () => {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(signIn, {
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
            Sign in to your account
          </h2>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action={formAction}>
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
                    required
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="mt-4">
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
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 sm:text-sm/6"
                  />
                </div>
              </div>
              {state.authError && (
                <p className="text-red-500 mt-2 font-semibold">
                  {state.authError}
                </p>
              )}
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-violet-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-violet-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 cursor-pointer mt-8">
                  {isPending ? (
                    <SpinnerIcon className="size-6 inline-block center" />
                  ) : (
                    "Sign in"
                  )}
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm/6 text-gray-500">
              Don&apos;t have an account?{" "}
              <Link
                href="sign-up"
                className="font-semibold text-violet-600 hover:text-violet-500">
                Create a new one here.
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default SignIn;
