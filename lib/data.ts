import { supabase } from './supabase'
import { Category, Product } from './types'

// Categories
export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('label')
  
  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }
  
  return data || []
}

export async function getCategory(slug: string): Promise<Category | undefined> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()
  
  if (error) {
    console.error('Error fetching category:', error)
    return undefined
  }
  
  return data
}

// Products
export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('name')
  
  if (error) {
    console.error('Error fetching products:', error)
    return []
  }
  
  return data || []
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category_slug', categorySlug)
    .order('name')
  
  if (error) {
    console.error('Error fetching products by category:', error)
    return []
  }
  
  return data || []
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single()
  
  if (error) {
    console.error('Error fetching product:', error)
    return undefined
  }
  
  return data
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('in_stock', true)
    .limit(limit)
  
  if (error) {
    console.error('Error fetching featured products:', error)
    return []
  }
  
  return data || []
}

// Also keep the static data as fallback (for development)
export const categories: Category[] = [
  { slug: "desktop", label: "Desktop", subcategories: ["Prebuilt PCs", "Mini PCs", "Workstations"] },
  { slug: "laptop", label: "Laptop", subcategories: ["Gaming Laptops", "Ultrabooks", "Business Laptops"] },
  { slug: "component", label: "Component", subcategories: ["CPU", "GPU", "Motherboard", "RAM", "Storage", "PSU", "Case", "Cooling"] },
  { slug: "monitor", label: "Monitor", subcategories: ["Gaming Monitors", "4K Monitors", "Ultrawide"] },
  { slug: "power", label: "Power", subcategories: ["Power Supplies", "UPS", "Surge Protection"] },
  { slug: "phone", label: "Phone", subcategories: ["Smartphones", "Accessories"] },
  { slug: "tablet", label: "Tablet", subcategories: ["Tablets", "Styluses", "Keyboards"] },
  { slug: "office-equipment", label: "Office Equipment", subcategories: ["Printers", "Scanners", "Shredders"] },
  { slug: "camera", label: "Camera", subcategories: ["Webcams", "Security Cameras", "Action Cameras"] },
  { slug: "security", label: "Security", subcategories: ["Antivirus", "NVR/DVR", "Access Control"] },
  { slug: "networking", label: "Networking", subcategories: ["Routers", "Switches", "Wi-Fi Systems"] },
  { slug: "software", label: "Software", subcategories: ["Operating Systems", "Productivity", "Security"] },
  { slug: "server", label: "Server", subcategories: ["Rack Servers", "Tower Servers", "Storage Servers"] },
  { slug: "accessories", label: "Accessories", subcategories: ["Cables", "Mounts", "Peripherals"] },
];

export const products: Product[] = [
  {
    id: "p1",
    slug: "vertex-rtx-gpu",
    name: "Vertex RTX 5080 16GB Graphics Card",
    categorySlug: "component",
    subcategory: "GPU",
    price: 899.99,
    compareAtPrice: 999.99,
    image: "https://placehold.co/600x600/121722/E3A24C?text=GPU",
    rating: 4.8,
    reviewCount: 214,
    inStock: true,
    badge: "Sale",
    specs: [
      { label: "Memory", value: "16GB GDDR7" },
      { label: "Interface", value: "PCIe 5.0" },
    ],
  },
  // ... rest of your products
];