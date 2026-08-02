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

// Get cart from localStorage (client-side only)
// Server-side cart is stored in memory (will reset on server restart)
let cart: any[] = []

export async function GET() {
  return NextResponse.json({
    items: cart,
    totalItems: cart.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: cart.reduce((sum, item) => sum + (item.price || item.product?.price || 0) * item.quantity, 0)
  })
}

export async function POST(request: Request) {
  try {
    const { productId, quantity, customBuild, buildName, parts, total } = await request.json()
    
    const products = loadProducts()
    let product = products.find((p: any) => p.id === productId)
    
    // Handle custom build
    if (customBuild) {
      const existing = cart.find((item: any) => item.productId === productId)
      if (existing) {
        existing.quantity += quantity || 1
      } else {
        cart.push({
          productId,
          quantity: quantity || 1,
          customBuild: true,
          name: buildName || 'Custom Build',
          price: total || 0,
          parts: parts || [],
          image: 'https://placehold.co/600x600/121722/E3A24C?text=Custom+Build'
        })
      }
      return NextResponse.json(cart)
    }
    
    // Handle regular product
    if (!product) {
      // Try to find by slug
      product = products.find((p: any) => p.slug === productId)
      if (!product) {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        )
      }
    }
    
    const existing = cart.find((item: any) => item.productId === product.id)
    if (existing) {
      existing.quantity += quantity || 1
    } else {
      cart.push({
        productId: product.id,
        quantity: quantity || 1,
        product: product,
        price: product.price,
        name: product.name,
        image: product.image
      })
    }
    
    return NextResponse.json(cart)
  } catch (error: any) {
    console.error('Cart error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to add to cart' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { productId } = await request.json()
    cart = cart.filter((item: any) => item.productId !== productId)
    return NextResponse.json(cart)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to remove from cart' },
      { status: 500 }
    )
  }
}