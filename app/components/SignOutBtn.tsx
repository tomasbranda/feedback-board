"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import LogoutIcon from "./LogoutIcon";

const SignOutBtn = () => {
  const router = useRouter();
  const handleSubmit = async () => {
    await authClient.signOut();
    router.push("/");
  };

  return (
    <button
      onClick={handleSubmit}
      className="bg-red-500 py-2 px-3 text-white rounded cursor-pointer transition-colors hover:bg-red-400">
      <LogoutIcon />
    </button>
  );
};

export default SignOutBtn;
