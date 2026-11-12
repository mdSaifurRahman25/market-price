"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface INavbar {
  id: string;
  nameBn: string;
  icon: string;
}

interface NavbarProps {
  mobileMenuOpen?: boolean;
  setMobileMenuOpen?: (open: boolean) => void;
}

const Navbar = ({ mobileMenuOpen = false, setMobileMenuOpen }: NavbarProps) => {
  const pathname = usePathname();
  const [navData, setNavData] = useState<INavbar[]>([]);

  useEffect(() => {
    fetch("https://openapi.programming-hero.com/api/bazardor/categories")
      .then((res) => res.json())
      .then((data) => setNavData(Array.isArray(data) ? data : []))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      {/* Desktop Category Navbar */}
      <nav className="hidden md:block border-y border-gray-200 bg-white py-2.5">
        <div className="container mx-auto px-4 flex flex-wrap items-center gap-4 lg:gap-6">
          {navData.map((n) => {
            const isActive = pathname === `/category/${n.id}`;
            return (
              <Link
                key={n.id}
                href={`/category/${n.id}`}
                className={`px-3 py-1.5 rounded-lg text-sm lg:text-base transition ${
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

      {/* Mobile Hamburger Category Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-y border-gray-200 bg-white px-4 py-3 shadow-sm">
          <p className="text-xs font-semibold text-gray-400 mb-2">
            ক্যাটাগরি সমূহ
          </p>
          <div className="grid grid-cols-2 gap-2">
            {navData.map((n) => {
              const isActive = pathname === `/category/${n.id}`;
              return (
                <Link
                  key={n.id}
                  href={`/category/${n.id}`}
                  onClick={() => setMobileMenuOpen && setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-xl text-sm flex items-center gap-2 transition ${
                    isActive
                      ? "bg-teal-700 text-white font-semibold"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100 font-medium"
                  }`}
                >
                  <span>{n.icon}</span>
                  <span>{n.nameBn}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
