"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Logo from "@/assets/logo-icon.png";
import { signOut, useSession } from "@/lib/auth-client";
import Navbar from "./Navbar";
import MarqueePage from "./Marquee";

const Header = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const date = new Date().toLocaleString("bn-BD", {
    dateStyle: "full",
  });

  // ড্রপডাউনের বাইরে ক্লিক করলে মেনু বন্ধ করা
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      setUserMenuOpen(false);
      await signOut();
      toast.success("সফলভাবে সাইন আউট হয়েছে!");
      router.push("/signin");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করতে সমস্যা হয়েছে।");
    }
  };

  const firstName = session?.user?.name
    ? session.user.name.split(" ")[0]
    : "প্রোফাইল";

  return (
    <header className="bg-white pt-3">
      <div className="container mx-auto px-3 sm:px-4 pb-3">
        <div className="flex items-center justify-between gap-2">
          {/* Left Logo Section */}
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <Link href={"/"} className="shrink-0">
              <Image
                src={Logo}
                width={40}
                height={40}
                className="w-9 h-9 sm:w-10 sm:h-10 bg-teal-700 p-1.5 rounded-xl"
                alt="Bazar Dor"
              />
            </Link>

            <div className="min-w-0">
              <Link href={"/"}>
                <p className="text-lg sm:text-2xl font-bold text-gray-900 leading-tight truncate">
                  বাজার দর
                </p>
              </Link>
              <p className="text-[11px] sm:text-sm text-gray-500 truncate">
                {date}
              </p>
            </div>
          </div>

          {/* Right Auth / Profile Dropdown & Mobile Hamburger */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {isPending ? (
              <div className="skeleton h-9 w-24 sm:w-32 rounded-xl"></div>
            ) : session?.user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-2 py-1 sm:px-3 sm:py-1.5 rounded-xl hover:bg-gray-100 transition border border-transparent hover:border-gray-200 cursor-pointer"
                >
                  {session.user.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border border-gray-200"
                    />
                  ) : (
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-teal-700 text-white flex items-center justify-center text-sm font-bold shrink-0">
                      {session.user.name
                        ? session.user.name.charAt(0).toUpperCase()
                        : "U"}
                    </div>
                  )}
                  <span className="text-sm sm:text-base font-medium text-gray-800 max-w-[90px] sm:max-w-[140px] truncate">
                    {firstName}
                  </span>
                  <span className="text-xs text-gray-500">▾</span>
                </button>

                {/* Figma User Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-60 bg-white border border-gray-200 rounded-2xl shadow-lg p-4 z-50">
                    <div className="pb-3 border-b border-gray-100">
                      <p className="font-bold text-gray-900 text-sm sm:text-base truncate">
                        {session.user.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate mt-0.5">
                        {session.user.email}
                      </p>
                    </div>

                    <div className="pt-2 space-y-1">
                      <Link
                        href="/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
                      >
                        <span className="text-teal-700">👤</span>
                        <span>আমার প্রোফাইল</span>
                      </Link>

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition text-left cursor-pointer"
                      >
                        <span>↪</span>
                        <span>সাইন আউট</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Link
                  href="/signin"
                  className="btn btn-xs sm:btn-md btn-ghost border border-gray-300 rounded-xl px-2.5 sm:px-4"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className="btn btn-xs sm:btn-md bg-teal-700 hover:bg-teal-800 text-white border-none rounded-xl px-2.5 sm:px-4"
                >
                  সাইন আপ
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              className="md:hidden btn btn-sm btn-ghost border border-gray-200 rounded-xl px-2.5"
            >
              {mobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Navbar Component */}
      <Navbar
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Marquee */}
      <MarqueePage />
    </header>
  );
};

export default Header;
