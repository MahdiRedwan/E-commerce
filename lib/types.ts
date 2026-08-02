export interface Category {
  slug: string;
  label: string;
  /** Short blurb shown on the category landing page. Fill in per category later. */
  description?: string;
  subcategories?: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  categorySlug: string;
  subcategory?: string;  // ← ADDED for filtering
  price: number;
  compareAtPrice?: number;
  currency?: string;
  image: string;
  rating?: number;
  reviewCount?: number;
  inStock: boolean;
  badge?: "New" | "Sale" | "Best Seller" | "Deal";
  specs?: { label: string; value: string }[];
}