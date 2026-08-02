import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const usersFilePath = path.join(process.cwd(), 'users.json')

function loadUsers(): any[] {
  try {
    if (fs.existsSync(usersFilePath)) {
      const data = fs.readFileSync(usersFilePath, 'utf-8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Error loading users:', error)
  }
  return []
}

function saveUsers(users: any[]) {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2))
  } catch (error) {
    console.error('Error saving users:', error)
  }
}

// GET /api/users/:id - Get user by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const users = loadUsers()
    const user = users.find((u: any) => u.id === params.id)
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }
    
    const { password, ...userWithoutPassword } = user
    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    )
  }
}

// PUT /api/users/:id - Update user
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const users = loadUsers()
    const index = users.findIndex((u: any) => u.id === params.id)
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }
    
    // Update only allowed fields
    users[index].name = body.name || users[index].name
    users[index].email = body.email || users[index].email
    
    saveUsers(users)
    
    const { password, ...userWithoutPassword } = users[index]
    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    )
  }
}