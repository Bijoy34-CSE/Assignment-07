"use client";

import { useState } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { Product } from "@/lib/types";

const ProductList = ({ products }: { products: Product[] }) => {
  const [sort, setSort] = useState("default");

  const sorted = [...products];
  if (sort === "low") sorted.sort((a, b) => a.today - b.today);
  if (sort === "high") sorted.sort((a, b) => b.today - a.today);

  return (
    <div>
      <div className="mt-6 flex items-center justify-end gap-3 rounded-2xl border border-gray-200 bg-white p-4">
        <label htmlFor="sort" className="text-sm text-gray-500">
          সাজান
        </label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="select select-sm"
        >
          <option value="default">ডিফল্ট</option>
          <option value="low">দাম: কম থেকে বেশি</option>
          <option value="high">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      {sorted.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-lg font-semibold">এই ক্যাটাগরিতে এখন কোনো পণ্য নেই</p>
          <Link
            href="/"
            className="btn mt-4 border-none bg-green-700 text-white hover:bg-green-800"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      ) : (
        <>
          <p className="mt-4 text-sm text-gray-500">
            মোট {sorted.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
          </p>
          <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;