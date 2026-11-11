import HeroSection from "@/components/home/Hero";
import ProductCard, { IProduct } from "@/components/home/ProductCard";

export default async function Home() {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products"
  );
  const allProducts: IProduct[] = await res.json();

  // Section A: Top 6 Risers (আজ দাম বেড়েছে ▲)
  const topRisers = allProducts
    .filter((p) => p?.change?.dir === "up" || p?.change?.dir === "▲")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  // Section B: Top 6 Fallers (আজ দাম কমেছে ▼)
  const topFallers = allProducts
    .filter((p) => p?.change?.dir === "down" || p?.change?.dir === "▼")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <div className="space-y-12 pb-8">
      {/* Hero Banner */}
      <HeroSection />

      {/* Section A — আজ দাম বেড়েছে ▲ */}
      <section className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-5">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            আজ দাম বেড়েছে
          </h2>
          <span className="bg-green-100 text-green-700 text-sm font-bold px-2.5 py-0.5 rounded-full">
            ▲
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topRisers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Section B — আজ দাম কমেছে ▼ */}
      <section className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-5">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            আজ দাম কমেছে
          </h2>
          <span className="bg-red-100 text-red-600 text-sm font-bold px-2.5 py-0.5 rounded-full">
            ▼
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topFallers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Section C — সব পণ্য */}
      <section id="সব-পণ্য" className="container mx-auto px-4 scroll-mt-6">
        <div className="mb-5">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            সব পণ্য
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            মোট {allProducts.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {allProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
