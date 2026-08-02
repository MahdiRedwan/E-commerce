import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const businessFilePath = path.join(process.cwd(), 'business.json')

function loadBusiness(): any[] {
  try {
    if (fs.existsSync(businessFilePath)) {
      const data = fs.readFileSync(businessFilePath, 'utf-8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Error loading business:', error)
  }
  return []
}

function saveBusiness(business: any[]) {
  try {
    fs.writeFileSync(businessFilePath, JSON.stringify(business, null, 2))
  } catch (error) {
    console.error('Error saving business:', error)
  }
}

// GET /api/business?userId=1 - Get business account by user ID
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 400 }
      )
    }
    
    const businesses = loadBusiness()
    const business = businesses.find((b: any) => b.userId === userId)
    
    if (!business) {
      return NextResponse.json(null, { status: 404 })
    }
    
    return NextResponse.json(business)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch business' },
      { status: 500 }
    )
  }
}

// POST /api/business - Create a new business account
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    if (!body.userId || !body.companyName) {
      return NextResponse.json(
        { error: 'User ID and company name are required' },
        { status: 400 }
      )
    }
    
    const businesses = loadBusiness()
    
    // Check if user already has a business account
    const existing = businesses.find((b: any) => b.userId === body.userId)
    if (existing) {
      return NextResponse.json(
        { error: 'User already has a business account' },
        { status: 400 }
      )
    }
    
    const newBusiness = {
      id: String(Date.now()),
      userId: body.userId,
      companyName: body.companyName,
      taxId: body.taxId || '',
      vatNumber: body.vatNumber || '',
      address: body.address || '',
      phone: body.phone || '',
      website: body.website || '',
      businessType: body.businessType || 'retail',
      estimatedMonthlyOrder: body.estimatedMonthlyOrder || '0-1000',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    businesses.push(newBusiness)
    saveBusiness(businesses)
    
    return NextResponse.json(newBusiness, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create business account' },
      { status: 500 }
    )
  }
}