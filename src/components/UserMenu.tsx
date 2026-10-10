"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiChevronDown, FiLogOut, FiUser } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

const UserMenu = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    setOpen(false);
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
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-gray-100"
      >
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.image}
            alt={user.name}
            className="size-8 rounded-full object-cover"
          />
        ) : (
          <span className="grid size-8 place-items-center rounded-full bg-green-700 text-sm font-semibold text-white">
            {user.name.charAt(0)}
          </span>
        )}
        <span className="hidden max-w-32 truncate text-sm font-medium sm:block">
          {user.name}
        </span>
        <FiChevronDown className="size-3.5 text-gray-500" />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-20 w-64 pt-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-3 shadow-lg">
            <div className="px-2 pb-2">
              <p className="font-semibold">{user.name}</p>
              <p className="truncate text-xs text-gray-500">{user.email}</p>
            </div>

            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-gray-100"
            >
              <FiUser /> আমার প্রোফাইল
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              <FiLogOut /> সাইন আউট
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;