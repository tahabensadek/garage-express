import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { name, email, garageSize, city, locale } = await req.json()
    if (!name || !email) return NextResponse.json({ ok: false })

    await fetch('https://services.leadconnectorhq.com/contacts/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GHL_API_KEY}`,
        'Content-Type': 'application/json',
        Version: '2021-07-28',
      },
      body: JSON.stringify({
        locationId: process.env.GHL_LOCATION_ID,
        firstName: name.split(' ')[0],
        lastName: name.split(' ').slice(1).join(' ') || '',
        email,
        city: city || '',
        source: 'garagexpress.ca',
        tags: ['partial-lead', locale === 'en' ? 'en' : 'fr'],
        customFields: garageSize ? [{ id: 'LfxOSUhHkF717C4S1H7d', value: garageSize }] : [],
      }),
    })
  } catch { /* silent — non-blocking */ }

  return NextResponse.json({ ok: true })
}
