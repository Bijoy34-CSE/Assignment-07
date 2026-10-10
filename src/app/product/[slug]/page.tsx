import Link from "next/link";
import { notFound } from "next/navigation";
import ChangeBadge from "@/components/ChangeBadge";
import { getProductBySlug } from "@/lib/api";
import { formatPrice, unitBn } from "@/lib/format";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return { title: product ? `${product.nameBn} | বাজার দর` : "বাজার দর" };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const diff = Math.abs(product.today - product.yesterday);

  let changeText = "গতকালের মতোই আছে";
  if (product.change.dir === "up") changeText = "বেড়েছে";
  if (product.change.dir === "down") changeText = "কমেছে";

  // bazar gulo gor dam onujayi kom theke beshi sajano
  const markets = (product.markets ?? [])
    .map((m) => ({ ...m, avg: (m.min + m.max) / 2 }))
    .sort((a, b) => a.avg - b.avg);

  const minPrice = markets.length
    ? Math.min(...markets.map((m) => m.min))
    : product.today;
  const maxPrice = markets.length
    ? Math.max(...markets.map((m) => m.max))
    : product.today;

  return (
    <div>
      {/* breadcrumb */}
      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
        <Link href="/" className="hover:text-green-700">
          হোম
        </Link>
        <span>›</span>
        <Link
          href={`/category/${product.category}`}
          className="hover:text-green-700"
        >
          {product.categoryNameBn}
        </Link>
        <span>›</span>
        <span className="text-gray-900">{product.nameBn}</span>
      </div>

      {/* summary */}
      <section className="mt-6 flex flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="flex items-center gap-5">
          <div className="grid size-16 shrink-0 place-items-center rounded-2xl bg-gray-100 text-4xl sm:size-20 sm:text-5xl">
            {product.image}
          </div>
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">{product.nameBn}</h1>
            <p className="text-sm text-gray-500">
              প্রতি {unitBn(product.unit)}
            </p>

            <div className="mt-2 flex flex-wrap gap-2">
              <Link
                href={`/category/${product.category}`}
                className="rounded-full bg-green-50 px-3 py-0.5 text-xs font-medium text-green-700 hover:bg-green-100"
              >
                {product.categoryIcon} {product.categoryNameBn}
              </Link>
            </div>

            <p className="mt-3 text-sm">
              গতকালের তুলনায় আজ দাম <b>{changeText}</b>
              {diff > 0 && <> · {formatPrice(diff)} টাকা</>}
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-gray-100 px-8 py-4 text-center">
          <p className="text-sm text-gray-500">আজকের দাম</p>
          <p className="text-4xl font-bold">{formatPrice(product.today)}</p>
          <p className="text-sm text-gray-500">
            টাকা / {unitBn(product.unit)}
          </p>
          <div className="mt-1">
            <ChangeBadge change={product.change} />
          </div>
        </div>
      </section>

      {/* price summary + market table */}
      <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 sm:p-8">
        <h2 className="text-lg font-bold">দামের সারসংক্ষেপ</h2>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500">সর্বনিম্ন দাম</p>
            <p className="mt-1 text-2xl font-bold text-green-700">
              {formatPrice(minPrice)}{" "}
              <span className="text-sm font-medium">টাকা</span>
            </p>
            <p className="mt-1 text-xs text-gray-500">সবচেয়ে কম দামের বাজার</p>
          </div>

          <div className="rounded-2xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500">সর্বাধিক দাম</p>
            <p className="mt-1 text-2xl font-bold text-red-600">
              {formatPrice(maxPrice)}{" "}
              <span className="text-sm font-medium">টাকা</span>
            </p>
            <p className="mt-1 text-xs text-gray-500">সবচেয়ে বেশি দামের বাজার</p>
          </div>

          <div className="rounded-2xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500">গড় দাম</p>
            <p className="mt-1 text-2xl font-bold text-green-700">
              {formatPrice(product.today)}{" "}
              <span className="text-sm font-medium">টাকা</span>
            </p>
            <p className="mt-1 text-xs text-gray-500">
              প্রতি {unitBn(product.unit)}-এর হিসাবে
            </p>
          </div>
        </div>

        <h2 className="mt-8 text-lg font-bold">বাজারভিত্তিক আজকের দাম</h2>

        {markets.length === 0 ? (
          <p className="mt-4 text-sm text-gray-500">
            এই পণ্যের বাজারভিত্তিক দাম এখনো পাওয়া যায়নি।
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto rounded-2xl border border-gray-200">
            <table className="table">
              <thead>
                <tr className="text-gray-500">
                  <th>বাজার</th>
                  <th>বিভাগ</th>
                  <th className="text-right">সর্বনিম্ন</th>
                  <th className="text-right">সর্বাধিক</th>
                  <th className="text-right">গড়</th>
                </tr>
              </thead>
              <tbody>
                {markets.map((m) => (
                  <tr key={m.market} className="even:bg-gray-50">
                    <td>{m.market}</td>
                    <td>{m.division}</td>
                    <td className="text-right">{formatPrice(m.min)} টাকা</td>
                    <td className="text-right">{formatPrice(m.max)} টাকা</td>
                    <td className="text-right font-bold">
                      {formatPrice(m.avg)} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}