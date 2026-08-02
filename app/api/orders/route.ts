import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export interface Order {
  id: string
  userId: string
  items: {
    productId: string
    name: string
    price: number
    quantity: number
  }[]
  total: number
  shippingAddress: {
    street: string
    city: string
    state: string
    zip: string
    country: string
  }
  paymentMethod: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  createdAt: string
}

const ordersFilePath = path.join(process.cwd(), 'orders.json')

function loadOrders(): Order[] {
  try {
    if (fs.existsSync(ordersFilePath)) {
      const data = fs.readFileSync(ordersFilePath, 'utf-8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Error loading orders:', error)
  }
  return []
}

function saveOrders(orders: Order[]) {
  try {
    fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2))
  } catch (error) {
    console.error('Error saving orders:', error)
  }
}

// GET /api/orders - Get all orders (admin) or user's orders
export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const userId = url.searchParams.get('userId')
    
    const orders = loadOrders()
    
    if (userId) {
      const userOrders = orders.filter(order => order.userId === userId)
      return NextResponse.json(userOrders)
    }
    
    return NextResponse.json(orders)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}

// POST /api/orders - Create a new order
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.userId || !body.items || !body.total) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    const orders = loadOrders()
    
    const newOrder: Order = {
      id: String(orders.length + 1),
      userId: body.userId,
      items: body.items,
      total: body.total,
      shippingAddress: body.shippingAddress,
      paymentMethod: body.paymentMethod,
      status: 'pending',
      createdAt: new Date().toISOString()
    }
    
    orders.push(newOrder)
    saveOrders(orders)
    
    return NextResponse.json(newOrder, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}