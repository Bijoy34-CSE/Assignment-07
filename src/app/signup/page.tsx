import Link from "next/link";
import SignUpForm from "@/components/SignUpForm";

const SignUpPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ callbackURL?: string }>;
}) => {
  const { callbackURL } = await searchParams;
  const redirectTo = callbackURL?.startsWith("/") ? callbackURL : "/";

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold">অ্যাকাউন্ট তৈরি করুন</h1>
        <p className="mt-1 text-sm text-gray-500">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>
      <SignUpForm callbackURL={redirectTo} />
      <p className="mt-6 text-center text-sm text-gray-500">
        <Link href="/">← হোম পেজে ফিরে যান</Link>
      </p>
    </div>
  );
};

export default SignUpPage;