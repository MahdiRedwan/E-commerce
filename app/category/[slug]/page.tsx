import { notFound } from "next/navigation";
import Link from "next/link";
import { categories, getCategory, getProductsByCategory } from "@/lib/data";
import ProductGrid from "@/components/ProductGrid";
import SectionHeader from "@/components/SectionHeader";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: Props) {
  const category = getCategory(params.slug);
  return {
    title: category ? `${category.label} — CircuitForge` : "Category — CircuitForge",
  };
}

export default function CategoryPage({ params }: Props) {
  const category = getCategory(params.slug);
  if (!category) notFound();

  const products = getProductsByCategory(params.slug);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <nav className="mb-6 font-mono text-xs uppercase tracking-wide text-muted">
        <Link href="/" className="hover:text-trace">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{category.label}</span>
      </nav>

      <SectionHeader
        eyebrow={`${products.length} product${products.length === 1 ? "" : "s"}`}
        title={category.label}
        description={category.description ?? `Browse the ${category.label.toLowerCase()} range. Add real copy and filters here as the catalogue grows.`}
      />

      {category.subcategories && (
        <div className="mb-8 flex flex-wrap gap-2">
          {category.subcategories.map((sub) => (
            <span
              key={sub}
              className="border border-line px-3 py-1.5 font-mono text-xs text-muted hover:border-trace hover:text-trace"
            >
              {sub}
            </span>
          ))}
        </div>
      )}

      <ProductGrid products={products} />
    </div>
  );
}
