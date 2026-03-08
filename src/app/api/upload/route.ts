import { put } from '@vercel/blob'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const form = await req.formData()
  const files = form.getAll('photos') as File[]

  if (!files.length) return NextResponse.json({ urls: [] })

  const uploads = await Promise.all(
    files.map(file =>
      put(`leads/${Date.now()}-${file.name}`, file, { access: 'public' })
    )
  )

  return NextResponse.json({ urls: uploads.map(u => u.url) })
}
