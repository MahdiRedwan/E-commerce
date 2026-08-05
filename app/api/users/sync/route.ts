import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    console.log('🔍 Sync request body:', body)
    
    if (!body.id || !body.email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if user exists
    const { data: existing, error: checkError } = await supabase
      .from('users')
      .select('id')
      .eq('id', body.id)
      .single()

    console.log('🔍 Existing user:', existing)
    console.log('🔍 Check error:', checkError)

    if (existing) {
      return NextResponse.json({ message: 'User already exists' })
    }

    // Insert user
    const { data, error } = await supabase
      .from('users')
      .insert({
        id: body.id,
        email: body.email,
        password: 'supabase_auth',
        name: body.name || body.email,
        role: body.role || 'customer'
      })
      .select()

    console.log('🔍 Insert result:', data)
    console.log('🔍 Insert error:', error)

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json(
        { error: error.message || 'Failed to create user' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Sync error:', error)
    return NextResponse.json(
      { error: 'Failed to sync user' },
      { status: 500 }
    )
  }
}