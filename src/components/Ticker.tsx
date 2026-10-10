import { getProducts } from "@/lib/api";
import TickerMarquee from "./TickerMarquee";

const Ticker = async () => {
  const products = await getProducts();

  if (!products || products.length === 0) return null;

  return (
    <div className="border-y border-gray-200 bg-white">
      <TickerMarquee products={products} />
    </div>
  );
};

export default Ticker;