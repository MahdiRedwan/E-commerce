"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ProductGrid from "@/components/ProductGrid";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query || query.length < 2) {
      setProducts([]);
      setLoading(false);
      return;
    }

    fetch(`/api/search?q=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [query]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="font-display text-3xl font-bold text-ink">
        Search Results
      </h1>
      <p className="text-muted mt-2">
        {query ? `Showing results for "${query}"` : 'Enter a search term'}
      </p>

      {loading ? (
        <p className="text-muted mt-8">Searching...</p>
      ) : products.length === 0 ? (
        <div className="mt-8 text-center">
          <p className="text-muted">No products found for &quot;{query}&quot;</p>
          <Link
            href="/"
            className="mt-4 inline-block bg-trace px-6 py-2 text-base font-semibold hover:opacity-80"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="mt-6">
          <p className="text-sm text-muted mb-4">{products.length} results found</p>
          <ProductGrid products={products} />
        </div>
      )}
    </div>
  );
}