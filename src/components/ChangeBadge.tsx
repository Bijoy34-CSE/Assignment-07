import { formatPercent } from "@/lib/format";
import { Product } from "@/lib/types";

const ChangeBadge = ({ change }: { change: Product["change"] }) => {
  const isFlat = change.pct === 0 || (change.dir !== "up" && change.dir !== "down");

  if (isFlat) {
    return (
      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-500">
        — ০.০%
      </span>
    );
  }

  const isUp = change.dir === "up";

  return (
    <span
      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
        isUp ? "bg-red-50 text-red-600" : "bg-green-50 text-green-700"
      }`}
    >
      {isUp ? "▲" : "▼"} {formatPercent(change.pct)}%
    </span>
  );
};

export default ChangeBadge;