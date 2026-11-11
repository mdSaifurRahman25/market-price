import Link from "next/link";

export interface IProduct {
  id: number;
  image: string;
  nameBn: string;
  today: number;
  unit: string;
  category?: string;
  change: {
    dir: string;
    pct: number;
  };
}

const ProductCard = ({ product }: { product: IProduct }) => {
  const isUp = product?.change?.dir === "up" || product?.change?.dir === "▲";
  const isDown =
    product?.change?.dir === "down" || product?.change?.dir === "▼";

  const unitMap: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
  };
  const unitText = `প্রতি ${unitMap[product?.unit] || product?.unit}`;

  return (
    <Link
      href={`/product/${product.id}`}
      className="card bg-white border border-gray-200 hover:border-teal-600 hover:shadow-md transition rounded-2xl p-4 flex flex-col justify-between gap-4"
    >
      {/* Top: Emoji + Name + Unit */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-2xl shrink-0">
          {product?.image}
        </div>
        <div>
          <h3 className="font-bold text-base sm:text-lg text-gray-900">
            {product?.nameBn}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500">{unitText}</p>
        </div>
      </div>

      {/* Bottom: Price + Change Badge */}
      <div className="flex items-end justify-between border-t border-gray-100 pt-3">
        <div>
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="text-lg sm:text-xl font-bold text-gray-900">
            {product?.today?.toLocaleString("bn-BD")} টাকা
          </p>
        </div>

        <span
          className={`px-2.5 py-1 rounded-full text-xs sm:text-sm font-semibold ${
            isUp
              ? "bg-green-100 text-green-700"
              : isDown
              ? "bg-red-100 text-red-600"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
          {Math.abs(product?.change?.pct || 0).toLocaleString("bn-BD")}%
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;
