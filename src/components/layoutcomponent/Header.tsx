"use client";

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

  const date = new Date().toLocaleString("bn-BD", {
    dateStyle: "full",
  });

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("সফলভাবে সাইন আউট হয়েছে!");
      router.push("/signin");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করতে সমস্যা হয়েছে।");
    }
  };

  return (
    <header className="pt-3">
      <div className="container mx-auto px-4 pb-3">
        <div className="flex items-center justify-between gap-2">
          {/* Left Logo Section */}
          <div className="flex items-center gap-2.5">
            <Link href={"/"}>
              <Image
                src={Logo}
                width={40}
                height={40}
                className="bg-teal-700 p-1.5 rounded-xl"
                alt="Bazar Dor"
              />
            </Link>

            <div>
              <Link href={"/"}>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">
                  বাজার দর
                </p>
              </Link>
              <p className="text-xs sm:text-sm text-gray-500">{date}</p>
            </div>
          </div>

          {/* Right signup and user info section */}
          <div className="flex items-center gap-2">
            {isPending ? (
              <div className="skeleton h-9 w-36 rounded-xl"></div>
            ) : session?.user ? (
              <>
                <Link
                  href="/profile"
                  className="btn btn-sm sm:btn-md btn-ghost border border-gray-300"
                >
                  👤 {session.user.name || "আমার প্রোফাইল"}
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-sm sm:btn-md bg-red-600 hover:bg-red-700 text-white border-none"
                >
                  সাইন আউট
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="btn btn-sm sm:btn-md btn-ghost border border-gray-300"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className="btn btn-sm sm:btn-md bg-teal-700 hover:bg-teal-800 text-white border-none"
                >
                  সাইন আপ
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Navbar Component */}
      <Navbar />

      {/* Marquee */}
      <MarqueePage />
    </header>
  );
};

export default Header;
