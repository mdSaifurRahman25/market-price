import Link from "next/link";
import { notFound } from "next/navigation";

interface IMarket {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface IProductDetails {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek?: number;
  lastMonth?: number;
  change: {
    dir: string;
    pct: number;
  };
  markets: IMarket[];
}

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products/${id}`
  );

  if (!res.ok) {
    notFound();
  }

  const product: IProductDetails = await res.json();

  if (!product || !product.id) {
    notFound();
  }

  const isUp = product?.change?.dir === "up" || product?.change?.dir === "▲";
  const isDown =
    product?.change?.dir === "down" || product?.change?.dir === "▼";

  // একক বাংলায় রূপান্তর
  const unitMap: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
  };
  const unitBn = unitMap[product.unit] || product.unit;

  // গতকালের সাথে আজকের দামের তুলনা
  const priceDiff = Math.abs(product.today - product.yesterday);
  const comparisonText =
    product.today > product.yesterday
      ? `গতকালের তুলনায় আজ দাম বেড়েছে · ${priceDiff.toLocaleString("bn-BD")} টাকা`
      : product.today < product.yesterday
      ? `গতকালের তুলনায় আজ দাম কমেছে · ${priceDiff.toLocaleString("bn-BD")} টাকা`
      : "গতকালের তুলনায় আজ দাম অপরিবর্তিত রয়েছে";

  // সর্বনিম্ন, সর্বাধিক ও গড় দাম হিসাব করা
  const markets = product.markets || [];
  const lowestMarket =
    markets.length > 0
      ? markets.reduce((prev, curr) => (curr.min < prev.min ? curr : prev))
      : null;
  const highestMarket =
    markets.length > 0
      ? markets.reduce((prev, curr) => (curr.max > prev.max ? curr : prev))
      : null;

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-teal-700">
          হোম
        </Link>
        <span>›</span>
        <Link
          href={`/category/${product.category}`}
          className="hover:text-teal-700"
        >
          {product.categoryNameBn}
        </Link>
        <span>›</span>
        <span className="text-gray-800 font-medium">{product.nameBn}</span>
      </div>

      {/* Top — Product Summary Card */}
      <div className="bg-gray-100 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white flex items-center justify-center text-4xl sm:text-5xl shadow-xs shrink-0">
            {product.image}
          </div>

          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/category/${product.category}`}
                className="bg-teal-700 text-white text-xs font-medium px-3 py-1 rounded-full"
              >
                {product.categoryIcon} {product.categoryNameBn}
              </Link>
              <span className="bg-white text-gray-700 text-xs font-medium px-3 py-1 rounded-full border border-gray-200">
                প্রতি {unitBn}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {product.nameBn}
            </h1>

            <p className="text-sm text-gray-600">
              {comparisonText} (গতকাল:{" "}
              {product.yesterday?.toLocaleString("bn-BD")} টাকা)
            </p>
          </div>
        </div>

        {/* Right Side Today Price */}
        <div className="bg-white rounded-2xl p-4 sm:px-6 sm:py-4 border border-gray-200 flex md:flex-col items-center md:items-end justify-between gap-2">
          <div>
            <p className="text-xs text-gray-500 md:text-right">আজকের দাম</p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">
              {product.today?.toLocaleString("bn-BD")}{" "}
              <span className="text-base font-normal text-gray-600">
                টাকা / {unitBn}
              </span>
            </p>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${
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
      </div>

      {/* Price Summary Section (দামের সারসংক্ষেপ) */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">দামের সারসংক্ষেপ</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Minimum Price */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-1">
            <p className="text-sm text-gray-500">সর্বনিম্ন দাম</p>
            <p className="text-2xl sm:text-3xl font-bold text-green-700">
              {lowestMarket
                ? `${lowestMarket.min.toLocaleString("bn-BD")} টাকা`
                : `${product.today.toLocaleString("bn-BD")} টাকা`}
            </p>
            {lowestMarket && (
              <p className="text-xs text-gray-500 pt-1">
                সবচেয়ে কম দামের বাজার: {lowestMarket.market} (
                {lowestMarket.division})
              </p>
            )}
          </div>

          {/* Maximum Price */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-1">
            <p className="text-sm text-gray-500">সর্বাধিক দাম</p>
            <p className="text-2xl sm:text-3xl font-bold text-red-600">
              {highestMarket
                ? `${highestMarket.max.toLocaleString("bn-BD")} টাকা`
                : `${product.today.toLocaleString("bn-BD")} টাকা`}
            </p>
            {highestMarket && (
              <p className="text-xs text-gray-500 pt-1">
                সবচেয়ে বেশি দামের বাজার: {highestMarket.market} (
                {highestMarket.division})
              </p>
            )}
          </div>

          {/* Average Price */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-1">
            <p className="text-sm text-gray-500">গড় দাম</p>
            <p className="text-2xl sm:text-3xl font-bold text-teal-700">
              {product.today?.toLocaleString("bn-BD")} টাকা
            </p>
            <p className="text-xs text-gray-500 pt-1">
              প্রতি {unitBn}-এর হিসাবে
            </p>
          </div>
        </div>
      </section>

      {/* Market-wise Price Table (বাজারভিত্তিক আজকের দাম) */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">
          বাজারভিত্তিক আজকের দাম
        </h2>

        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table w-full text-sm sm:text-base">
              <thead className="bg-gray-100 text-gray-700 text-xs sm:text-sm">
                <tr>
                  <th className="py-3.5 px-4 text-left font-semibold">বাজার</th>
                  <th className="py-3.5 px-4 text-left font-semibold">বিভাগ</th>
                  <th className="py-3.5 px-4 text-right font-semibold">
                    সর্বনিম্ন
                  </th>
                  <th className="py-3.5 px-4 text-right font-semibold">
                    সর্বাধিক
                  </th>
                  <th className="py-3.5 px-4 text-right font-semibold">গড়</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {markets.map((m, index) => {
                  const avg = (m.min + m.max) / 2;
                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-3.5 px-4 font-medium text-gray-900">
                        {m.market}
                      </td>
                      <td className="py-3.5 px-4 text-gray-600">
                        <span className="bg-gray-100 px-2.5 py-0.5 rounded-full text-xs">
                          {m.division}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right text-green-700 font-medium">
                        {m.min.toLocaleString("bn-BD")} টাকা
                      </td>
                      <td className="py-3.5 px-4 text-right text-red-600 font-medium">
                        {m.max.toLocaleString("bn-BD")} টাকা
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-gray-900">
                        {avg.toLocaleString("bn-BD")} টাকা
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetailsPage;
