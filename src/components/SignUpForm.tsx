"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "./SocialButtons";

const SignUpForm = ({ callbackURL }: { callbackURL: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const password = form.get("password") as string;
    const confirm = form.get("confirm") as string;

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }
    if (password !== confirm) {
      toast.error("পাসওয়ার্ড দুটি মিলছে না");
      return;
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({
      name: form.get("name") as string,
      email: form.get("email") as string,
      password,
    });

    setLoading(false);
    if (error) {
      toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
      return;
    }
    toast.success("অ্যাকাউন্ট তৈরি হয়েছে");
    router.push(callbackURL);
    router.refresh();
  };

  return (
    <div className="rounded-2xl border bg-white p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm">নাম</label>
          <input
            type="text"
            name="name"
            required
            placeholder="যেমন: রহিম উদ্দিন"
            className="input input-bordered w-full bg-white"
          />
        </div>
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
        <div>
          <label className="mb-1 block text-sm">পাসওয়ার্ড নিশ্চিত করুন</label>
          <input
            type="password"
            name="confirm"
            required
            placeholder="আবার লিখুন"
            className="input input-bordered w-full bg-white"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="btn w-full border-0 bg-green-700 text-white shadow hover:bg-green-800"
        >
          {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
        </button>
      </form>

      <div className="divider my-4 text-xs text-gray-500">অথবা</div>
      <SocialButtons callbackURL={callbackURL} />

      <p className="mt-4 text-center text-sm">
        অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin" className="text-green-700 hover:underline">
          সাইন ইন করুন
        </Link>
      </p>
    </div>
  );
};

export default SignUpForm;