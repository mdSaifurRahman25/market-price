import Link from "next/link";

const NotFound = () => {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <div className="max-w-md mx-auto bg-gray-50 border border-gray-200 rounded-2xl p-8 space-y-4">
        <p className="text-6xl font-bold text-teal-700">৪০৪</p>
        <h1 className="text-2xl font-bold text-gray-900">
          পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          দুঃখিত, আপনি যে পেজটি খুঁজছেন তা পাওয়া যায়নি অথবা লিংকটি সঠিক নয়।
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
};

export default NotFound;
