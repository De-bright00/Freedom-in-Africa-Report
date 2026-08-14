import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: Request) {
  try {
    const { image } = await request.json()
    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 })
    }
    
    // Remove the prefix (e.g., "data:image/png;base64,")
    const base64Data = image.replace(/^data:image\/png;base64,/, '')
    const buffer = Buffer.from(base64Data, 'base64')
    
    const outputPath = path.resolve('public/finar-2025-cover.png')
    fs.writeFileSync(outputPath, buffer)
    console.log('Successfully saved cover to:', outputPath)
    
    return NextResponse.json({ success: true, path: outputPath })
  } catch (error: any) {
    console.error('Error saving image:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
