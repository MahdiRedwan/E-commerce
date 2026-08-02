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
  return []
}

// GET /api/search?q=keyword
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')?.toLowerCase() || ''
    
    if (!query || query.length < 2) {
      return NextResponse.json([])
    }
    
    const products = loadProducts()
    
    const results = products.filter((product: any) => {
      const name = product.name?.toLowerCase() || ''
      const slug = product.slug?.toLowerCase() || ''
      const category = product.categorySlug?.toLowerCase() || ''
      
      return name.includes(query) || 
             slug.includes(query) || 
             category.includes(query)
    })
    
    // Limit results to 20
    return NextResponse.json(results.slice(0, 20))
  } catch (error) {
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    )
  }
}