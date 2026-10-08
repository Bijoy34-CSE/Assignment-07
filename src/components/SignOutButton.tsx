"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const SignOutButton = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    toast.success("সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  };

  return (
    <button
      onClick={handleSignOut}
      className="btn btn-outline btn-sm border-red-500 text-red-600 hover:border-red-600 hover:bg-red-50"
    >
      ↩ সাইন আউট
    </button>
  );
};

export default SignOutButton;