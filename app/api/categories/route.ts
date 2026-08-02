import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const categoriesFilePath = path.join(process.cwd(), 'categories.json')

function loadCategories(): any[] {
  try {
    if (fs.existsSync(categoriesFilePath)) {
      const data = fs.readFileSync(categoriesFilePath, 'utf-8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Error loading categories:', error)
  }
  // Seed default categories if file doesn't exist
  const defaultCategories = [
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
  ]
  saveCategories(defaultCategories)
  return defaultCategories
}

function saveCategories(categories: any[]) {
  try {
    fs.writeFileSync(categoriesFilePath, JSON.stringify(categories, null, 2))
  } catch (error) {
    console.error('Error saving categories:', error)
  }
}

// GET /api/categories - Get all categories
export async function GET() {
  try {
    const categories = loadCategories()
    return NextResponse.json(categories)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}

// POST /api/categories - Create a new category
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    if (!body.slug || !body.label) {
      return NextResponse.json(
        { error: 'Slug and label are required' },
        { status: 400 }
      )
    }
    
    const categories = loadCategories()
    const existing = categories.find(c => c.slug === body.slug)
    
    if (existing) {
      return NextResponse.json(
        { error: 'Category with this slug already exists' },
        { status: 400 }
      )
    }
    
    const newCategory = {
      slug: body.slug,
      label: body.label,
      subcategories: body.subcategories || []
    }
    
    categories.push(newCategory)
    saveCategories(categories)
    
    return NextResponse.json(newCategory, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    )
  }
}