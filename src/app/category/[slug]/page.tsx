import { notFound } from "next/navigation";
import ProductList from "@/components/ProductList";
import { getCategory, getProducts } from "@/lib/api";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [category, products] = await Promise.all([
    getCategory(slug),
    getProducts(slug),
  ]);

  if (!category || !category.nameBn) {
    notFound();
  }

  return (
    <div>
      <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5">
        <div className="grid size-14 place-items-center rounded-xl bg-gray-100 text-3xl">
          {category.icon}
        </div>
        <div>
          <h1 className="text-2xl font-bold">{category.nameBn}</h1>
          <p className="text-sm text-gray-500">
            {products.length.toLocaleString("bn-BD")}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      <ProductList products={products} />
    </div>
  );
}