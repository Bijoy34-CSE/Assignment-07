import { headers } from "next/headers";
import { redirect } from "next/navigation";
import UpdateForm from "@/components/UpdateForm";
import { auth } from "@/lib/auth";

export const metadata = { title: "তথ্য আপডেট | বাজার দর" };

export default async function UpdateProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/signin?callbackURL=/profile/update&reason=protected");
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold">তথ্য আপডেট করুন</h1>
      <p className="text-sm text-gray-500">আপনার নাম পরিবর্তন করুন।</p>

      <div className="mt-5 rounded-2xl border border-gray-200 bg-white p-5">
        <h2 className="font-semibold">তথ্য</h2>
        <UpdateForm currentName={session.user.name} />
      </div>
    </div>
  );
}