import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    if (!body.id || !body.email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const { data: existing } = await supabase
      .from('users')
      .select('id')
      .eq('id', body.id)
      .single()

    if (existing) {
      return NextResponse.json({ message: 'User already exists' })
    }

    const { error } = await supabase
      .from('users')
      .insert({
        id: body.id,
        email: body.email,
        password: 'supabase_auth',
        name: body.name || body.email,
        role: body.role || 'customer'
      })

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Sync error:', error)
    return NextResponse.json(
      { error: 'Failed to sync user' },
      { status: 500 }
    )
  }
}