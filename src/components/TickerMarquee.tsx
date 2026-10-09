"use client";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import ChangeBadge from "./ChangeBadge";
import { formatPrice, unitBn } from "@/lib/format";
import type { Product } from "@/lib/types";

const TickerMarquee = ({ products }: { products: Product[] }) => {
  return (
    <MarqueeText duration={5} direction="right" className="py-2 text-sm">
      {products.map((p) => (
        <span key={p.id} className="mx-5 inline-flex items-center gap-2">
          <span>{p.image}</span>
          <span className="font-medium">{p.nameBn}</span>
          <span className="text-gray-500">
            {formatPrice(p.today)} টাকা/{unitBn(p.unit)}
          </span>
          <ChangeBadge change={p.change} />
        </span>
      ))}
    </MarqueeText>
  );
};

export default TickerMarquee;