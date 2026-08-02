import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const contactsFilePath = path.join(process.cwd(), 'contacts.json')

function loadContacts(): any[] {
  try {
    if (fs.existsSync(contactsFilePath)) {
      const data = fs.readFileSync(contactsFilePath, 'utf-8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Error loading contacts:', error)
  }
  return []
}

function saveContacts(contacts: any[]) {
  try {
    fs.writeFileSync(contactsFilePath, JSON.stringify(contacts, null, 2))
  } catch (error) {
    console.error('Error saving contacts:', error)
  }
}

// GET /api/help - Get all contact messages (admin only)
export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const contacts = loadContacts()
    return NextResponse.json(contacts)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}

// POST /api/help - Send a contact message
export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json()
    
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }
    
    const contacts = loadContacts()
    
    const newContact = {
      id: String(Date.now()),
      name,
      email,
      subject,
      message,
      status: 'pending',
      createdAt: new Date().toISOString()
    }
    
    contacts.push(newContact)
    saveContacts(contacts)
    
    // In production, send an email notification here
    
    return NextResponse.json({
      success: true,
      message: 'Your message has been sent! We will respond within 24 hours.'
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}