import Image from "next/image";
import hero_image from "@/assets/bazar-hero.png";

const HeroSection = () => {
  const date = new Date().toLocaleString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <div className="container mx-auto px-4 mt-6">
      <div className="bg-gray-100 rounded-2xl px-6 sm:px-10 py-6 sm:py-8 grid grid-cols-1 md:grid-cols-2 items-center gap-6">
        {/* Left side */}
        <div className="col-span-1 py-2">
          <span className="inline-block bg-gray-200 px-3 py-1.5 text-xs sm:text-sm text-teal-800 font-medium rounded-full">
            {date}
          </span>
          <h1 className="pt-5 font-bold text-3xl sm:text-4xl lg:text-5xl pb-4 sm:pb-6 leading-tight text-gray-900">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 pb-6">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন, সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a
            href="#সব-পণ্য"
            className="btn bg-teal-700 hover:bg-teal-800 text-white border-none px-6"
          >
            সব পণ্য দেখুন
          </a>
        </div>

        {/* Right Side */}
        <div className="col-span-1 flex justify-center md:justify-end">
          <Image
            src={hero_image}
            alt="Hero Image"
            width={420}
            height={420}
            priority
            className="w-64 sm:w-80 md:w-96 h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
