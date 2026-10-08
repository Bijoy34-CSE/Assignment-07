"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Category } from "@/lib/types";

const CategoryLinks = ({ categories }: { categories: Category[] }) => {
  const pathname = usePathname();

  return (
    <nav className="border-t">
      <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-2">
        {categories.map((c) => {
          const active = pathname === `/category/${c.slug}`;
          return (
            <Link
              key={c.id}
              href={`/category/${c.slug}`}
              className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium ${
                active
                  ? "bg-green-700 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span>{c.icon}</span>
              {c.nameBn}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default CategoryLinks;