import Link from "next/link";
import Marquee from "react-fast-marquee";

interface IMarquee {
  id: number;
  image: string;
  nameBn: string;
  today: number;
  unit: string;
  change: {
    dir: string;
    pct: number;
  };
}

const MarqueePage = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products"
  );
  const allProduct: IMarquee[] = await res.json();

  return (
    <Marquee pauseOnHover speed={40}>
      <div className="flex gap-8 py-2.5 border-b border-gray-200 bg-gray-50 px-4">
        {allProduct.map((p) => {
          const isUp = p?.change?.dir === "up" || p?.change?.dir === "▲";
          const isDown = p?.change?.dir === "down" || p?.change?.dir === "▼";

          return (
            <div key={p.id} className="mx-3">
              <Link
                href={`/product/${p.id}`}
                className="flex items-center gap-2 text-sm sm:text-base font-medium text-gray-800 hover:text-teal-700"
              >
                <span>{p?.image}</span>
                <span className="font-semibold">{p?.nameBn}</span>
                <span>
                  {p.today.toLocaleString("bn-BD")} টাকা/{p.unit}
                </span>
                <span
                  className={`text-xs sm:text-sm font-semibold ${
                    isUp
                      ? "text-green-600"
                      : isDown
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                >
                  {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                  {p?.change?.pct?.toLocaleString("bn-BD")}%
                </span>
              </Link>
            </div>
          );
        })}
      </div>
    </Marquee>
  );
};

export default MarqueePage;
