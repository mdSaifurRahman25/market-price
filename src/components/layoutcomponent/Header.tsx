import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logo-icon.png";
import Navbar from "./Navbar";
import MarqueePage from "./Marquee";

const Header = () => {
  const date = new Date().toLocaleString("bn-BD", {
    dateStyle: "full",
  });

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
            <Link href="/signin" className="btn btn-sm sm:btn-md btn-ghost border border-gray-300">
              সাইন ইন
            </Link>
            <Link href="/signup" className="btn btn-sm sm:btn-md bg-teal-700 hover:bg-teal-800 text-white border-none">
              সাইন আপ
            </Link>
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
