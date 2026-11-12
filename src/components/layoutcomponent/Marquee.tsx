"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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

const MarqueePage = () => {
  const [allProduct, setAllProduct] = useState<IMarquee[]>([]);

  useEffect(() => {
    fetch("https://openapi.programming-hero.com/api/bazardor/products")
      .then((res) => res.json())
      .then((data) => setAllProduct(Array.isArray(data) ? data : []))
      .catch((err) => console.error(err));
  }, []);

  if (allProduct.length === 0) {
    return null;
  }

  return (
    <Marquee pauseOnHover speed={40}>
      <div className="flex gap-8 py-2.5 border-b border-gray-200 bg-gray-50 px-4">
        {allProduct.map((p) => {
          const isUp = p?.change?.dir === "up" || p?.change?.dir === "▲";
          const isDown = p?.change?.dir === "down" || p?.change?.dir === "▼";
          const unitMap: Record<string, string> = {
            kg: "কেজি",
            litre: "লিটার",
            dozen: "ডজন",
            piece: "পিস",
          };
          const unitBn = unitMap[p.unit] || p.unit;

          return (
            <div key={p.id} className="mx-3">
              <Link
                href={`/product/${p.id}`}
                className="flex items-center gap-2 text-sm sm:text-base font-medium text-gray-800 hover:text-teal-700"
              >
                <span>{p?.image}</span>
                <span className="font-semibold">{p?.nameBn}</span>
                <span>
                  {p.today.toLocaleString("bn-BD")} টাকা/{unitBn}
                </span>
                <span
                  className={`text-xs sm:text-sm font-semibold ${
                    isUp
                      ? "text-red-600"
                      : isDown
                      ? "text-emerald-600"
                      : "text-gray-500"
                  }`}
                >
                  {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                  {Math.abs(p?.change?.pct || 0).toLocaleString("bn-BD")}%
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
