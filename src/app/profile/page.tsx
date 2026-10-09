import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import SignOutButton from "@/components/SignOutButton";
import { auth } from "@/lib/auth";

export const metadata = { title: "আমার প্রোফাইল | বাজার দর" };

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/signin?callbackURL=/profile&reason=protected");
  }

  const user = session.user;

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
      <p className="text-sm text-gray-500">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>

      <div className="mt-5 flex items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5">
        <div className="flex items-center gap-4">
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.image}
              alt={user.name}
              className="size-16 rounded-xl object-cover sm:size-20"
            />
          ) : (
            <div className="grid size-16 place-items-center rounded-xl bg-green-700 text-2xl font-bold text-white sm:size-20">
              {user.name.charAt(0)}
            </div>
          )}
          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="break-all text-gray-500">{user.email}</p>
          </div>
        </div>
        <SignOutButton />
      </div>

      <div className="mt-5 rounded-2xl border border-gray-200 bg-white p-5">
        <h2 className="font-semibold">তথ্য</h2>

        <div className="mt-4 space-y-3 text-sm">
          <div>
            <p className="text-gray-500">নাম</p>
            <p className="font-medium">{user.name}</p>
          </div>
          <div>
            <p className="text-gray-500">ইমেইল</p>
            <p className="font-medium">{user.email}</p>
          </div>
        </div>

        <Link
          href="/profile/update"
          className="btn mt-5 w-full border-none bg-green-700 text-white hover:bg-green-800"
        >
          তথ্য আপডেট করুন
        </Link>
      </div>
    </div>
  );
}