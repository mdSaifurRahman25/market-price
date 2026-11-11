const HomeLoading = () => {
  return (
    <div className="container mx-auto px-4 mt-6 space-y-12 pb-8">
      {/* Hero Skeleton */}
      <div className="bg-gray-100 rounded-2xl px-6 sm:px-10 py-8 grid grid-cols-1 md:grid-cols-2 items-center gap-6">
        <div className="space-y-4">
          <div className="skeleton h-6 w-40 rounded-full"></div>
          <div className="skeleton h-12 w-3/4"></div>
          <div className="skeleton h-5 w-full"></div>
          <div className="skeleton h-5 w-2/3"></div>
          <div className="skeleton h-10 w-36 rounded-xl"></div>
        </div>
        <div className="flex justify-center md:justify-end">
          <div className="skeleton w-64 h-64 rounded-2xl"></div>
        </div>
      </div>

      {/* Product Cards Section Skeleton */}
      <div className="space-y-5">
        <div className="skeleton h-8 w-48"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((item) => (
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
    </div>
  );
};

export default HomeLoading;
