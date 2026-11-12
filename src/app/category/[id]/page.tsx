"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ProductCard, { IProduct } from "@/components/home/ProductCard";

interface ICategory {
  id: string;
  nameBn: string;
  icon: string;
}


const getPriceNumber = (price: number | string) => {
  if (typeof price === "number") return price;
  const banglaDigits = "০১২৩৪৫৬৭৮৯";
  const englishStr = String(price)
    .split("")
    .map((ch) => {
      const index = banglaDigits.indexOf(ch);
      return index !== -1 ? index : ch;
    })
    .join("")
    .replace(/[^0-9.]/g, "");
  return Number(englishStr) || 0;
};

const CategoryPage = () => {
  const params = useParams();
  const id = params?.id as string;

  const [category, setCategory] = useState<ICategory | null>(null);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [sortBy, setSortBy] = useState<string>("default");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;
    fetch(`https://openapi.programming-hero.com/api/bazardor/categories/${id}`)
      .then((res) => res.json())
      .then((data) => setCategory(data))
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    if (!id) return;
    fetch(
      `https://openapi.programming-hero.com/api/bazardor/products?category=${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "low-to-high") {
      return getPriceNumber(a.today) - getPriceNumber(b.today);
    }
    if (sortBy === "high-to-low") {
      return getPriceNumber(b.today) - getPriceNumber(a.today);
    }
    return 0;
  });

  // Loading state (Skeleton)
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-100 p-5 rounded-2xl">
          <div className="space-y-2">
            <div className="skeleton h-8 w-44"></div>
            <div className="skeleton h-4 w-64"></div>
          </div>
          <div className="skeleton h-10 w-52"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div
              key={item}
              className="border border-gray-200 rounded-2xl p-4 space-y-4 bg-white"
            >
              <div className="flex items-center gap-3">
                <div className="skeleton w-12 h-12 rounded-xl"></div>
                <div className="space-y-2 flex-1">
                  <div className="skeleton h-5 w-3/4"></div>
                  <div className="skeleton h-3 w-1/2"></div>
                </div>
              </div>
              <div className="flex justify-between items-end pt-3 border-t border-gray-100">
                <div className="space-y-2">
                  <div className="skeleton h-3 w-16"></div>
                  <div className="skeleton h-6 w-24"></div>
                </div>
                <div className="skeleton h-6 w-16 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Empty State / Invalid Category (404-style message)
  if (!category || products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto bg-gray-50 border border-gray-200 rounded-2xl p-8 space-y-4">
          <p className="text-5xl">🛒</p>
          <h2 className="text-2xl font-bold text-gray-900">
            ৪০৪ — কোনো পণ্য পাওয়া যায়নি
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            দুঃখিত, এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই অথবা ক্যাটাগরিটি সঠিক
            নয়।
          </p>
          <Link
            href="/"
            className="btn bg-teal-700 hover:bg-teal-800 text-white border-none mt-2"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Top Category Header */}
      <div className="bg-gray-100 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl sm:text-4xl bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-xs">
            {category.icon}
          </span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {category.nameBn}
            </h1>
            <p className="text-sm text-gray-600 mt-0.5">
              {products.length.toLocaleString("bn-BD")}টি পণ্যের আজকের দাম ও
              পরিবর্তন
            </p>
          </div>
        </div>

        {/* Sort Control (C1) */}
        <div className="flex items-center gap-2">
          <label
            htmlFor="sort-select"
            className="text-sm font-medium text-gray-700 whitespace-nowrap"
          >
            সাজান:
          </label>
          <div className="relative">
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-xl pl-3.5 pr-9 py-2 text-sm font-medium text-gray-800 focus:outline-none focus:border-teal-700 cursor-pointer"
            >
              <option value="default">ডিফল্ট</option>
              <option value="low-to-high">দাম: কম থেকে বেশি</option>
              <option value="high-to-low">দাম: বেশি থেকে কম</option>
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500 text-xs">
              ▼
            </span>
          </div>
        </div>
      </div>

      {/* Count Subtitle */}
      <div className="flex items-center justify-between text-sm text-gray-500 px-1">
        <p>
          মোট {sortedProducts.length.toLocaleString("bn-BD")}টি পণ্য দেখানো
          হচ্ছে
        </p>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
