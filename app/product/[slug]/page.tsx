"use client";

import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProduct } from "@/lib/data";
import { addToCart } from "@/lib/cart";
import { Product } from "@/lib/types";

interface Props {
  params: { slug: string };
}

export default function ProductPage({ params }: Props) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    getProduct(params.slug).then((data) => {
      if (data) {
        setProduct(data);
      }
      setLoading(false);
    });
  }, [params.slug]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product.id, quantity);
      alert(`Added ${quantity} x ${product.name} to cart!`);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-12">
        <p className="text-muted">Loading...</p>
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <nav className="mb-6 font-mono text-xs uppercase tracking-wide text-muted">
        <Link href="/" className="hover:text-trace">Home</Link>
        <span className="mx-2">/</span>
        <Link href={`/category/${product.categorySlug}`} className="hover:text-trace">
          {product.categorySlug}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="relative aspect-square border border-line bg-surface">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain p-4"
          />
        </div>

        <div>
          <h1 className="font-display text-3xl font-bold text-ink">{product.name}</h1>
          
          {product.badge && (
            <span className="inline-block bg-trace px-3 py-1 text-xs font-semibold text-base uppercase tracking-wider mt-2">
              {product.badge}
            </span>
          )}

          <div className="mt-4 flex items-center gap-4">
            <span className="text-2xl font-bold text-ink">?{product.price}</span>
            {product.compareAtPrice && (
              <span className="text-muted line-through">?{product.compareAtPrice}</span>
            )}
          </div>

          {product.rating && (
            <div className="mt-2 flex items-center gap-2 text-sm text-muted">
              <span>? {product.rating}</span>
              <span>({product.reviewCount} reviews)</span>
            </div>
          )}

          <div className="mt-4">
            <span className={product.inStock ? "text-green-500" : "text-red-500"}>
              {product.inStock ? "? In Stock" : "? Out of Stock"}
            </span>
          </div>

          {product.specs && product.specs.length > 0 && (
            <div className="mt-6 border border-line bg-surface p-4">
              <h2 className="font-mono text-xs uppercase tracking-wider text-muted">Specifications</h2>
              <dl className="mt-2 grid grid-cols-2 gap-2">
                {product.specs.map((spec, i) => (
                  <div key={i} className="col-span-2 flex border-b border-line py-2 text-sm">
                    <dt className="text-muted w-1/2">{spec.label}</dt>
                    <dd className="text-ink w-1/2 font-medium">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center border border-line">
              <button
                className="px-3 py-2 text-ink hover:bg-surface"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span className="w-10 text-center text-ink">{quantity}</span>
              <button
                className="px-3 py-2 text-ink hover:bg-surface"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            <button
              className="flex-1 bg-trace px-6 py-3 text-base font-semibold hover:opacity-80 disabled:opacity-50"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}