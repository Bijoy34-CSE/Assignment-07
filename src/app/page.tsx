import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api";
import { getBanglaDate } from "@/lib/format";
export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await getProducts();

  const risers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
  .filter((p) => p.change.dir === "down")
  .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
  .slice(0, 6);

  return (
    <div>
      {/* hero */}
      <section className="grid items-center gap-6 rounded-3xl border border-gray-200 bg-white p-6 md:grid-cols-2 md:p-8">
        <div>
          <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
            {getBanglaDate()}
          </span>
          <h1 className="mt-4 text-3xl font-bold md:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="mt-3 text-gray-600">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত,
            গড়, সর্বনিম্ন, সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a
            href="#সব-পণ্য"
            className="btn mt-6 border-none bg-green-700 text-white hover:bg-green-800"
          >
            সব পণ্য দেখুন
          </a>
        </div>

        <div className="flex justify-center">
          <Image
            src="/bazar-hero.png"
            alt="তাজা বাজারের ঝুড়ি"
            width={380}
            height={260}
            priority
            className="h-auto w-64 md:w-96"
          />
        </div>
      </section>

      {/* risers */}
      <section className="mt-10">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <span className="text-sm text-red-600">▲</span> আজ দাম বেড়েছে
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {risers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* fallers */}
      <section className="mt-10">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <span className="text-sm text-green-700">▼</span> আজ দাম কমেছে
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {fallers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* all products */}
      <section id="সব-পণ্য" className="mt-10 scroll-mt-4">
        <h2 className="text-xl font-bold">সব পণ্য</h2>
        <p className="mt-1 text-sm text-gray-500">
          মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}