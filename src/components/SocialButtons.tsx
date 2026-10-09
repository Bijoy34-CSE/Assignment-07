"use client";

import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

const SocialButtons = ({ callbackURL = "/" }: { callbackURL?: string }) => {
  const handleSocial = async (provider: "google" | "github") => {
    const { error } = await authClient.signIn.social({ provider, callbackURL });
    if (error) {
      toast.error("সোশ্যাল লগইন করা যায়নি, আবার চেষ্টা করুন");
    }
  };

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <button
        type="button"
        onClick={() => handleSocial("google")}
        className="btn btn-outline border-gray-300 bg-white font-medium"
      >
        <FcGoogle className="size-5" /> Google দিয়ে চালিয়ে যান
      </button>
      <button
        type="button"
        onClick={() => handleSocial("github")}
        className="btn btn-outline border-gray-300 bg-white font-medium"
      >
        <FaGithub className="size-5" /> GitHub দিয়ে চালিয়ে যান
      </button>
    </div>
  );
};

export default SocialButtons;