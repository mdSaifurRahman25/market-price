const ProductDetailsLoading = () => {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="skeleton h-4 w-48"></div>

      <div className="bg-gray-100 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="skeleton w-20 h-20 rounded-2xl"></div>
          <div className="space-y-3">
            <div className="skeleton h-5 w-32 rounded-full"></div>
            <div className="skeleton h-8 w-52"></div>
            <div className="skeleton h-4 w-64"></div>
          </div>
        </div>
        <div className="skeleton h-24 w-44 rounded-2xl"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="skeleton h-28 rounded-2xl"></div>
        <div className="skeleton h-28 rounded-2xl"></div>
        <div className="skeleton h-28 rounded-2xl"></div>
      </div>

      <div className="skeleton h-80 rounded-2xl"></div>
    </div>
  );
};

export default ProductDetailsLoading;
