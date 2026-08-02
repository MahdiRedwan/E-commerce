import { notFound } from "next/navigation";
import Link from "next/link";
import { categories, getCategory } from "@/lib/data";
import ProductGrid from "@/components/ProductGrid";
import SectionHeader from "@/components/SectionHeader";

interface Props {
  params: { slug: string };
  searchParams?: { sub?: string };
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

export default async function CategoryPage({ params, searchParams }: Props) {
  const category = getCategory(params.slug);
  if (!category) notFound();

  // Get products from the static data
  const { products } = await import('@/lib/data');
  let allProducts = products.filter((p: any) => p.categorySlug === params.slug);
  
  // Filter by subcategory if provided
  const sub = searchParams?.sub;
  const filteredProducts = sub 
    ? allProducts.filter((p: any) => 
        p.subcategory && p.subcategory.toLowerCase() === sub.toLowerCase()
      )
    : allProducts;

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <nav className="mb-6 font-mono text-xs uppercase tracking-wide text-muted">
        <Link href="/" className="hover:text-trace">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{category.label}</span>
        {sub && (
          <>
            <span className="mx-2">/</span>
            <span className="text-trace">{sub}</span>
          </>
        )}
      </nav>

      <SectionHeader
        eyebrow={`${filteredProducts.length} product${filteredProducts.length === 1 ? "" : "s"}`}
        title={sub || category.label}
        description={category.description || `Browse the ${category.label} range.`}
      />

      {/* Subcategory filters */}
      {category.subcategories && category.subcategories.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          <Link
            href={`/category/${category.slug}`}
            className={`border px-3 py-1.5 font-mono text-xs ${
              !sub ? 'border-trace text-trace bg-trace/10' : 'border-line text-muted hover:border-trace hover:text-trace'
            }`}
          >
            All
          </Link>
          {category.subcategories.map((subCategory) => (
            <Link
              key={subCategory}
              href={`/category/${category.slug}?sub=${encodeURIComponent(subCategory)}`}
              className={`border px-3 py-1.5 font-mono text-xs ${
                sub === subCategory ? 'border-trace text-trace bg-trace/10' : 'border-line text-muted hover:border-trace hover:text-trace'
              }`}
            >
              {subCategory}
            </Link>
          ))}
        </div>
      )}

      <ProductGrid products={filteredProducts} />
    </div>
  );
}