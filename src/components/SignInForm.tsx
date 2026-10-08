"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "./SocialButtons";

const SignInForm = ({ callbackURL }: { callbackURL: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setLoading(true);

    const { error } = await authClient.signIn.email({
      email: form.get("email") as string,
      password: form.get("password") as string,
    });

    setLoading(false);
    if (error) {
      toast.error(error.message || "সাইন ইন করা যায়নি");
      return;
    }
    toast.success("সাইন ইন সফল হয়েছে");
    router.push(callbackURL);
    router.refresh();
  };

  return (
    <div className="rounded-2xl border bg-white p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm">ইমেইল</label>
          <input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            className="input input-bordered w-full bg-white"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm">পাসওয়ার্ড</label>
          <input
            type="password"
            name="password"
            required
            placeholder="কমপক্ষে ৮ অক্ষর"
            className="input input-bordered w-full bg-white"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="btn w-full border-0 bg-green-700 text-white shadow hover:bg-green-800"
        >
          {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
        </button>
      </form>

      <div className="divider my-4 text-xs text-gray-500">অথবা</div>
      <SocialButtons callbackURL={callbackURL} />

      <p className="mt-4 text-center text-sm">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/signup" className="text-green-700 hover:underline">
          সাইন আপ করুন
        </Link>
      </p>
    </div>
  );
};

export default SignInForm;