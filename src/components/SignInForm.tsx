"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import SocialButtons from "./SocialButtons";
import { authClient } from "@/lib/auth-client";

const SignInForm = ({
  callbackURL,
  reason,
}: {
  callbackURL: string;
  reason?: string;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // protected page e login chhara gele ei toast dekhabe
  useEffect(() => {
    if (reason === "protected") {
      toast.error("এই পেজ দেখতে আগে সাইন ইন করুন", { id: "protected" });
    }
  }, [reason]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message || "ইমেইল বা পাসওয়ার্ড ভুল হয়েছে");
      return;
    }

    toast.success("সাইন ইন সফল হয়েছে");
    router.push(callbackURL);
    router.refresh();
  };

  return (
    <div className="mx-auto max-w-md">
      <div className="text-center">
        <h1 className="text-3xl font-bold">সাইন ইন</h1>
        <p className="mt-2 text-sm text-gray-500">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              ইমেইল
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="input w-full"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium">
              পাসওয়ার্ড
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="input w-full"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn w-full border-none bg-green-700 text-white hover:bg-green-800"
          >
            {loading && <span className="loading loading-spinner loading-sm"></span>}
            সাইন ইন
          </button>
        </form>

        <div className="divider my-4 text-xs text-gray-500">অথবা</div>

        <SocialButtons callbackURL={callbackURL} />

        <p className="mt-5 text-center text-sm">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="font-medium text-green-700">
            সাইন আপ করুন
          </Link>
        </p>
      </div>

      <p className="mt-6 text-center text-sm text-gray-500">
        <Link href="/">← হোম পেজে ফিরে যান</Link>
      </p>
    </div>
  );
};

export default SignInForm;