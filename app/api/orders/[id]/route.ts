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

function saveOrders(orders: any[]) {
  try {
    fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2))
  } catch (error) {
    console.error('Error saving orders:', error)
  }
}

// GET /api/orders/:id - Get a specific order
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const orders = loadOrders()
    const order = orders.find(o => o.id === params.id)
    
    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(order)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    )
  }
}

// PUT /api/orders/:id - Update order status
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { status } = body
    
    if (!status) {
      return NextResponse.json(
        { error: 'Status is required' },
        { status: 400 }
      )
    }
    
    const orders = loadOrders()
    const orderIndex = orders.findIndex(o => o.id === params.id)
    
    if (orderIndex === -1) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }
    
    orders[orderIndex].status = status
    saveOrders(orders)
    
    return NextResponse.json(orders[orderIndex])
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    )
  }
}