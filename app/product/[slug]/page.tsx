import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { products, getProduct } from "@/lib/data";
import { formatPrice } from "@/lib/format";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props) {
  const product = getProduct(params.slug);
  return {
    title: product ? `${product.name} — CircuitForge` : "Product — CircuitForge",
  };
}

export default function ProductPage({ params }: Props) {
  const product = getProduct(params.slug);
  if (!product) notFound();

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

      <div className="grid gap-10 md:grid-cols-2">
        <div className="chip-card relative aspect-square overflow-hidden">
          <Image src={product.image} alt={product.name} fill className="object-cover" />
        </div>

        <div>
          <h1 className="font-display text-3xl font-bold text-ink">{product.name}</h1>

          {product.rating && (
            <div className="mt-2 flex items-center gap-2 text-sm text-muted">
              <span className="text-trace">★ {product.rating.toFixed(1)}</span>
              <span>({product.reviewCount} reviews)</span>
            </div>
          )}

          <div className="mt-6 flex items-baseline gap-3 font-mono">
            <span className="text-3xl font-semibold text-ink">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-base text-muted line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          <p className="mt-2 font-mono text-xs uppercase tracking-wide text-circuit">
            {product.inStock ? "In stock — ships today" : "Currently out of stock"}
          </p>

          <button
            disabled={!product.inStock}
            className="mt-6 w-full border border-trace bg-trace py-3 text-sm font-semibold text-base hover:opacity-90 disabled:cursor-not-allowed disabled:border-line disabled:bg-line disabled:text-muted sm:w-auto sm:px-10"
          >
            Add to Cart
          </button>

          {product.specs && (
            <div className="mt-10 border-t border-line pt-6">
              <h2 className="font-mono text-xs uppercase tracking-wide text-ink">
                Specification
              </h2>
              <dl className="mt-4 divide-y divide-line font-mono text-sm">
                {product.specs.map((spec) => (
                  <div key={spec.label} className="flex justify-between py-2">
                    <dt className="text-muted">{spec.label}</dt>
                    <dd className="text-ink">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
