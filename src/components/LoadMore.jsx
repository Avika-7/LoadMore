import { useEffect, useState } from "react";

export default function LoadMoreData() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState("");

  async function fetchProducts() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${products.length}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const result = await response.json();

      if (result.products?.length) {
        setProducts((prevProducts) => [
          ...prevProducts,
          ...result.products,
        ]);

        // DummyJSON currently has a finite number of products.
        setHasMore(products.length + result.products.length < 100);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong while loading products.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen m-3 px-4 py-10 rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Product Store
          </h1>

          <p className="mt-2 text-slate-500">
            Browse our collection of products
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((item) => (
            <div
              key={item.id}
              className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Image */}
              <div className="flex h-52 items-center justify-center overflow-hidden bg-slate-50">
                <img
                  className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                  src={item.thumbnail}
                  alt={item.title}
                />
              </div>

              {/* Details */}
              <div className="p-4">
                <h2 className="line-clamp-2 min-h-12 font-semibold text-slate-800">
                  {item.title}
                </h2>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-lg font-bold text-slate-900">
                    ${item.price}
                  </span>

                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                    ⭐ {item.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Error */}
        {error && (
          <p className="mt-8 text-center font-medium text-red-500">
            {error}
          </p>
        )}

        {/* Load More */}
        <div className="mt-10 flex flex-col items-center gap-3">
          {hasMore ? (
            <button
              onClick={fetchProducts}
              disabled={loading}
              className="rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white shadow-sm transition-all hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Loading..." : "Load More Products"}
            </button>
          ) : (
            <p className="text-sm font-medium text-slate-500">
              You've reached the end of the products.
            </p>
          )}

          {/* Product count */}
          <p className="text-sm text-slate-400">
            Showing {products.length} products
          </p>
        </div>
      </div>
    </div>
  );
}