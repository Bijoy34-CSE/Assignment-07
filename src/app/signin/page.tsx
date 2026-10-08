import Link from "next/link";
import SignInForm from "@/components/SignInForm";

const SignInPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ callbackURL?: string }>;
}) => {
  const { callbackURL } = await searchParams;
  const redirectTo = callbackURL?.startsWith("/") ? callbackURL : "/";

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold">সাইন ইন</h1>
        <p className="mt-1 text-sm text-gray-500">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>
      <SignInForm callbackURL={redirectTo} />
      <p className="mt-6 text-center text-sm text-gray-500">
        <Link href="/">← হোম পেজে ফিরে যান</Link>
      </p>
    </div>
  );
};

export default SignInPage;