"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import SocialButtons from "./SocialButtons";
import { authClient } from "@/lib/auth-client";

const SignUpForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = (form.get("name") as string).trim();
    const email = form.get("email") as string;
    const password = form.get("password") as string;
    const confirm = form.get("confirm") as string;

    if (!name) {
      toast.error("আপনার নাম লিখুন");
      return;
    }
    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }
    if (password !== confirm) {
      toast.error("দুটি পাসওয়ার্ড মিলছে না");
      return;
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({ name, email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
      return;
    }

    toast.success("অ্যাকাউন্ট তৈরি হয়েছে, এবার সাইন ইন করুন");
    router.push("/signin");
  };

  return (
    <div className="mx-auto max-w-md">
      <div className="text-center">
        <h1 className="text-3xl font-bold">অ্যাকাউন্ট তৈরি করুন</h1>
        <p className="mt-2 text-sm text-gray-500">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium">
              নাম
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="যেমন: রহিম উদ্দিন"
              className="input w-full"
            />
          </div>

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
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="input w-full"
            />
          </div>

          <div>
            <label htmlFor="confirm" className="mb-1 block text-sm font-medium">
              পাসওয়ার্ড নিশ্চিত করুন
            </label>
            <input
              id="confirm"
              name="confirm"
              type="password"
              required
              placeholder="আবার লিখুন"
              className="input w-full"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn w-full border-none bg-green-700 text-white hover:bg-green-800"
          >
            {loading && <span className="loading loading-spinner loading-sm"></span>}
            অ্যাকাউন্ট তৈরি করুন
          </button>
        </form>

        <div className="divider my-4 text-xs text-gray-500">অথবা</div>

        <SocialButtons callbackURL="/" />

        <p className="mt-5 text-center text-sm">
          অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="font-medium text-green-700">
            সাইন ইন করুন
          </Link>
        </p>
      </div>

      <p className="mt-6 text-center text-sm text-gray-500">
        <Link href="/">← হোম পেজে ফিরে যান</Link>
      </p>
    </div>
  );
};

export default SignUpForm;