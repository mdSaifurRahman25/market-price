"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface INavbar {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const Navbar = () => {
  const pathname = usePathname();
  const [navData, setNavData] = useState<INavbar[]>([]);

  useEffect(() => {
    fetch("https://openapi.programming-hero.com/api/bazardor/categories")
      .then((res) => res.json())
      .then((data) => setNavData(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <nav className="border-y border-gray-200 py-3">
      <div className="container mx-auto px-4 flex flex-wrap items-center gap-2 sm:gap-6">
        {navData.map((n) => {
          const isActive = pathname === `/category/${n.slug}`;
          return (
            <Link
              key={n.id}
              href={`/category/${n.slug}`}
              className={`px-3 py-1.5 rounded-lg text-sm sm:text-base transition ${
                isActive
                  ? "bg-teal-700 text-white font-semibold"
                  : "text-gray-700 hover:bg-gray-100 font-medium"
              }`}
            >
              <span>
                {n.icon} {n.nameBn}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
