import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import ProfileForm from "@/components/ProfileForm";
import SignOutButton from "@/components/SignOutButton";

const ProfilePage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?callbackURL=/profile");

  const { user } = session;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
      <p className="mt-1 text-sm text-gray-500">
        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
      </p>

      <div className="mt-6 flex items-center justify-between rounded-2xl border bg-white p-6">
        <div className="flex items-center gap-4">
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.image}
              alt={user.name}
              className="h-20 w-20 rounded-xl object-cover"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-green-100 text-2xl font-bold text-green-700">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <p className="text-xl font-medium">{user.name}</p>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>
        <SignOutButton />
      </div>

      <div className="mt-6 rounded-2xl border bg-white">
        <h2 className="p-6 pb-4 font-medium">তথ্য</h2>
        <ProfileForm name={user.name} />
      </div>
    </div>
  );
};

export default ProfilePage;