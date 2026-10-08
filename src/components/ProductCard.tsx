import Link from "next/link";
import ChangeBadge from "./ChangeBadge";
import { formatPrice, unitBn } from "@/lib/format";
import { Product } from "@/lib/types";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="block rounded-2xl border border-gray-200 bg-white p-4 transition hover:border-green-300 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <div className="grid size-11 place-items-center rounded-xl bg-gray-100 text-2xl">
          {product.image}
        </div>
        <div>
          <h3 className="font-semibold">{product.nameBn}</h3>
          <p className="text-xs text-gray-500">প্রতি {unitBn(product.unit)}</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-gray-500">আজকের দাম</p>
      <div className="flex items-end justify-between">
        <p className="text-xl font-bold">
          {formatPrice(product.today)}{" "}
          <span className="text-sm font-normal">টাকা</span>
        </p>
        <ChangeBadge change={product.change} />
      </div>
    </Link>
  );
};

export default ProductCard;