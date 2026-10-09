"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const UserMenu = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const closeMenu = () => {
    (document.activeElement as HTMLElement | null)?.blur();
  };

  const handleSignOut = async () => {
    closeMenu();
    await authClient.signOut();
    toast.success("সাইন আউট করা হয়েছে");
    router.push("/");
    router.refresh();
  };

  if (isPending) {
    return <div className="skeleton h-10 w-28"></div>;
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md">
          সাইন ইন
        </Link>
        <Link
          href="/signup"
          className="btn btn-sm sm:btn-md border-none bg-green-700 text-white hover:bg-green-800"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="flex items-center gap-2">
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.image}
            alt={user.name}
            className="size-9 rounded-full object-cover"
          />
        ) : (
          <div className="grid size-9 place-items-center rounded-full bg-green-700 font-semibold text-white">
            {user.name.charAt(0)}
          </div>
        )}
        <span className="hidden text-sm font-medium sm:block">
          {user.name.split(" ")[0]}
        </span>
      </div>

      <div
        tabIndex={0}
        className="dropdown-content z-10 mt-2 w-64 rounded-2xl border border-gray-200 bg-white p-4 shadow-lg"
      >
        <p className="font-semibold">{user.name}</p>
        <p className="truncate text-xs text-gray-500">{user.email}</p>

        <div className="mt-3 flex flex-col gap-1 text-sm">
          <Link
            href="/profile"
            onClick={closeMenu}
            className="rounded-lg px-2 py-1.5 hover:bg-gray-100"
          >
            আমার প্রোফাইল
          </Link>
          <button
            onClick={handleSignOut}
            className="rounded-lg px-2 py-1.5 text-left text-red-600 hover:bg-red-50"
          >
            সাইন আউট
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;