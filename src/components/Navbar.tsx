import Link from "next/link";
import CategoryLinks from "./CategoryLinks";
import UserMenu from "./UserMenu";
import { getCategories } from "@/lib/api";
import { getBanglaDate } from "@/lib/format";

const Navbar = async () => {
  const categories = await getCategories();

  return (
    <header className="bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-green-700 text-xl">
            🛒
          </span>
          <span>
            <span className="block text-lg font-bold leading-tight">
              বাজার দর
            </span>
            <span className="block text-xs text-gray-500">{getBanglaDate()}</span>
          </span>
        </Link>

        <UserMenu />
      </div>

      <CategoryLinks categories={categories} />
    </header>
  );
};

export default Navbar;