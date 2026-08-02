import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const productsFilePath = path.join(process.cwd(), 'products.json')

function loadProducts(): any[] {
  try {
    if (fs.existsSync(productsFilePath)) {
      const data = fs.readFileSync(productsFilePath, 'utf-8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Error loading products:', error)
  }
  // Seed default products if file doesn't exist
  const defaultProducts = [
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
      name: 'Nimbus 14" Ultrabook, 32GB RAM',
      categorySlug: "laptop",
      price: 1249.0,
      image: "https://placehold.co/600x600/121722/E3A24C?text=Laptop",
      rating: 4.6,
      reviewCount: 88,
      inStock: true,
      specs: [
        { label: "Display", value: '14" 2.8K OLED' },
        { label: "Battery", value: "Up to 18h" },
      ],
    },
    {
      id: "p4",
      slug: "aurora-32-oled-monitor",
      name: 'Aurora 32" 4K OLED Gaming Monitor',
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
  ]
  saveProducts(defaultProducts)
  return defaultProducts
}

function saveProducts(products: any[]) {
  try {
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2))
  } catch (error) {
    console.error('Error saving products:', error)
  }
}

// GET /api/products - Get all products
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const categorySlug = searchParams.get('category')
    const limit = parseInt(searchParams.get('limit') || '100')
    
    let products = loadProducts()
    
    if (categorySlug) {
      products = products.filter(p => p.categorySlug === categorySlug)
    }
    
    products = products.slice(0, limit)
    
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

// POST /api/products - Create a new product
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    if (!body.slug || !body.name || !body.price || !body.categorySlug) {
      return NextResponse.json(
        { error: 'Slug, name, price, and category are required' },
        { status: 400 }
      )
    }
    
    const products = loadProducts()
    const existing = products.find(p => p.slug === body.slug)
    
    if (existing) {
      return NextResponse.json(
        { error: 'Product with this slug already exists' },
        { status: 400 }
      )
    }
    
    const newProduct = {
      id: String(Date.now()),
      ...body,
      price: parseFloat(body.price),
      compareAtPrice: body.compareAtPrice ? parseFloat(body.compareAtPrice) : undefined,
      rating: body.rating ? parseFloat(body.rating) : undefined,
      reviewCount: body.reviewCount ? parseInt(body.reviewCount) : undefined,
      inStock: body.inStock ?? true,
      specs: body.specs || []
    }
    
    products.push(newProduct)
    saveProducts(products)
    
    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}