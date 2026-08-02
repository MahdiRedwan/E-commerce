import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const categoriesFilePath = path.join(process.cwd(), 'categories.json')

function loadCategories(): any[] {
  try {
    if (fs.existsSync(categoriesFilePath)) {
      const data = fs.readFileSync(categoriesFilePath, 'utf-8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Error loading categories:', error)
  }
  return []
}

function saveCategories(categories: any[]) {
  try {
    fs.writeFileSync(categoriesFilePath, JSON.stringify(categories, null, 2))
  } catch (error) {
    console.error('Error saving categories:', error)
  }
}

// DELETE /api/categories/:slug - Delete a category
export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const categories = loadCategories()
    const filtered = categories.filter(c => c.slug !== params.slug)
    
    if (filtered.length === categories.length) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      )
    }
    
    saveCategories(filtered)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    )
  }
}