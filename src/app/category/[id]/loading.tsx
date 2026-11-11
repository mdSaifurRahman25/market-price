const CategoryLoading = () => {
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
};

export default CategoryLoading;
