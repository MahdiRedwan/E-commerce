import { Category, Product } from "./types";

/**
 * Top navigation categories.
 * Add a new entry here and it will automatically appear in the Navbar
 * and become routable at /category/[slug].
 */
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

/**
 * Placeholder catalogue. Swap `image` for real product photography and
 * extend `specs` per product as your catalogue grows.
 */
export const products: Product[] = [
  {
    id: "p1",
    slug: "vertex-rtx-gpu",
    name: "Vertex RTX 5080 16GB Graphics Card",
    categorySlug: "component",
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
  {
    id: "p2",
    slug: "forge-x9-cpu",
    name: "Forge X9-14900 Desktop Processor",
    categorySlug: "component",
    price: 549.0,
    image: "https://placehold.co/600x600/121722/E3A24C?text=CPU",
    rating: 4.7,
    reviewCount: 132,
    inStock: true,
    badge: "Best Seller",
    specs: [
      { label: "Cores", value: "24" },
      { label: "Base Clock", value: "3.2GHz" },
    ],
  },
  {
    id: "p3",
    slug: "nimbus-14-ultrabook",
    name: "Nimbus 14\" Ultrabook, 32GB RAM",
    categorySlug: "laptop",
    price: 1249.0,
    image: "https://placehold.co/600x600/121722/E3A24C?text=Laptop",
    rating: 4.6,
    reviewCount: 88,
    inStock: true,
    specs: [
      { label: "Display", value: "14\" 2.8K OLED" },
      { label: "Battery", value: "Up to 18h" },
    ],
  },
  {
    id: "p4",
    slug: "aurora-32-oled-monitor",
    name: "Aurora 32\" 4K OLED Gaming Monitor",
    categorySlug: "monitor",
    price: 799.0,
    image: "https://placehold.co/600x600/121722/E3A24C?text=Monitor",
    rating: 4.9,
    reviewCount: 176,
    inStock: true,
    badge: "New",
    specs: [
      { label: "Refresh Rate", value: "240Hz" },
      { label: "Panel", value: "4K OLED" },
    ],
  },
  {
    id: "p5",
    slug: "coreforge-r7-tower",
    name: "CoreForge R7 Prebuilt Gaming Tower",
    categorySlug: "desktop",
    price: 1899.0,
    image: "https://placehold.co/600x600/121722/E3A24C?text=Desktop",
    rating: 4.8,
    reviewCount: 61,
    inStock: true,
    specs: [
      { label: "GPU", value: "RTX 5080" },
      { label: "RAM", value: "32GB DDR5" },
    ],
  },
  {
    id: "p6",
    slug: "meshnet-ax6-router",
    name: "MeshNet AX6 Tri-Band Wi-Fi Router",
    categorySlug: "networking",
    price: 189.99,
    image: "https://placehold.co/600x600/121722/E3A24C?text=Router",
    rating: 4.5,
    reviewCount: 340,
    inStock: true,
    badge: "Deal",
    specs: [
      { label: "Standard", value: "Wi-Fi 6E" },
      { label: "Ports", value: "4x 2.5GbE" },
    ],
  },
  {
    id: "p7",
    slug: "rackline-2u-server",
    name: "RackLine 2U Storage Server, 8-Bay",
    categorySlug: "server",
    price: 3299.0,
    image: "https://placehold.co/600x600/121722/E3A24C?text=Server",
    rating: 4.7,
    reviewCount: 19,
    inStock: false,
    specs: [
      { label: "Bays", value: "8x Hot-Swap" },
      { label: "CPU", value: "Dual Xeon" },
    ],
  },
  {
    id: "p8",
    slug: "shieldcam-pro-nvr-kit",
    name: "ShieldCam Pro 4-Camera NVR Kit",
    categorySlug: "security",
    price: 429.0,
    image: "https://placehold.co/600x600/121722/E3A24C?text=Security",
    rating: 4.4,
    reviewCount: 97,
    inStock: true,
    specs: [
      { label: "Resolution", value: "4K per camera" },
      { label: "Storage", value: "2TB included" },
    ],
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProductsByCategory(slug: string): Product[] {
  return products.filter((p) => p.categorySlug === slug);
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(limit = 8): Product[] {
  return products.slice(0, limit);
}
