import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const ordersFilePath = path.join(process.cwd(), 'orders.json')

function loadOrders(): any[] {
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

// GET /api/track-order?id=1&email=test@test.com
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get('id')
    const email = searchParams.get('email')
    
    if (!orderId || !email) {
      return NextResponse.json(
        { error: 'Order ID and email are required' },
        { status: 400 }
      )
    }
    
    const orders = loadOrders()
    const order = orders.find(o => o.id === orderId)
    
    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }
    
    // Get the user for this order
    const usersFilePath = path.join(process.cwd(), 'users.json')
    let users: any[] = []
    try {
      if (fs.existsSync(usersFilePath)) {
        const data = fs.readFileSync(usersFilePath, 'utf-8')
        users = JSON.parse(data)
      }
    } catch (error) {}
    
    const user = users.find((u: any) => u.id === order.userId)
    
    // Check if email matches
    if (!user || user.email !== email) {
      return NextResponse.json(
        { error: 'Order not found for this email' },
        { status: 404 }
      )
    }
    
    // Return order without sensitive info
    return NextResponse.json({
      id: order.id,
      status: order.status,
      total: order.total,
      items: order.items,
      shippingAddress: order.shippingAddress,
      paymentMethod: order.paymentMethod,
      createdAt: order.createdAt,
      userEmail: user.email,
      userName: user.name
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to track order' },
      { status: 500 }
    )
  }
}