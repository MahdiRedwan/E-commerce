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

function saveProducts(products: any[]) {
  try {
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2))
  } catch (error) {
    console.error('Error saving products:', error)
  }
}

// GET /api/products/:slug - Get a single product
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const products = loadProducts()
    const product = products.find(p => p.slug === params.slug)
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}

// PUT /api/products/:slug - Update a product
export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await request.json()
    const products = loadProducts()
    const index = products.findIndex(p => p.slug === params.slug)
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }
    
    // Keep the existing id and slug
    const updatedProduct = {
      ...products[index],
      ...body,
      id: products[index].id,
      slug: params.slug,
      price: body.price ? parseFloat(body.price) : products[index].price,
      compareAtPrice: body.compareAtPrice ? parseFloat(body.compareAtPrice) : products[index].compareAtPrice,
      rating: body.rating ? parseFloat(body.rating) : products[index].rating,
      reviewCount: body.reviewCount ? parseInt(body.reviewCount) : products[index].reviewCount,
      inStock: body.inStock !== undefined ? body.inStock : products[index].inStock,
      specs: body.specs || products[index].specs
    }
    
    products[index] = updatedProduct
    saveProducts(products)
    
    return NextResponse.json(updatedProduct)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

// DELETE /api/products/:slug - Delete a product
export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const products = loadProducts()
    const filtered = products.filter(p => p.slug !== params.slug)
    
    if (filtered.length === products.length) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }
    
    saveProducts(filtered)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}