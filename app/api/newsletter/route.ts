import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const subscribersFilePath = path.join(process.cwd(), 'subscribers.json')

function loadSubscribers(): any[] {
  try {
    if (fs.existsSync(subscribersFilePath)) {
      const data = fs.readFileSync(subscribersFilePath, 'utf-8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Error loading subscribers:', error)
  }
  return []
}

function saveSubscribers(subscribers: any[]) {
  try {
    fs.writeFileSync(subscribersFilePath, JSON.stringify(subscribers, null, 2))
  } catch (error) {
    console.error('Error saving subscribers:', error)
  }
}

// GET /api/newsletter - Get all subscribers (admin only)
export async function GET(request: Request) {
  try {
    // Check for admin token (simple check)
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const subscribers = loadSubscribers()
    return NextResponse.json(subscribers)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch subscribers' },
      { status: 500 }
    )
  }
}

// POST /api/newsletter - Subscribe to newsletter
export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }
    
    const subscribers = loadSubscribers()
    
    // Check if email already exists
    const existing = subscribers.find((s: any) => s.email === email)
    if (existing) {
      return NextResponse.json(
        { error: 'Email already subscribed' },
        { status: 400 }
      )
    }
    
    const newSubscriber = {
      id: String(Date.now()),
      email,
      subscribedAt: new Date().toISOString(),
      status: 'active'
    }
    
    subscribers.push(newSubscriber)
    saveSubscribers(subscribers)
    
    return NextResponse.json({
      success: true,
      message: 'Subscribed successfully!'
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    )
  }
}

// DELETE /api/newsletter - Unsubscribe
export async function DELETE(request: Request) {
  try {
    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }
    
    const subscribers = loadSubscribers()
    const filtered = subscribers.filter((s: any) => s.email !== email)
    
    if (filtered.length === subscribers.length) {
      return NextResponse.json(
        { error: 'Email not found' },
        { status: 404 }
      )
    }
    
    saveSubscribers(filtered)
    
    return NextResponse.json({
      success: true,
      message: 'Unsubscribed successfully!'
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to unsubscribe' },
      { status: 500 }
    )
  }
}