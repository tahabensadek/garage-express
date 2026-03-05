import { Resend } from 'resend'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const data = await req.json()
  const { name, email, phone, garageSize, city, cracks, message } = data

  try {
    await resend.emails.send({
      from: 'Garage Express <onboarding@resend.dev>',
      to: 'tahabensadek@gmail.com',
      subject: `🔥 Nouveau lead — ${name} (${city})`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #DC2626; padding: 24px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Nouveau lead — Garage Express</h1>
          </div>
          <div style="background: #f9f9f9; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e5e5e5;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; width: 40%;">Nom</td><td style="padding: 10px 0; border-bottom: 1px solid #eee;">${name}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Téléphone</td><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><a href="tel:${phone}" style="color: #DC2626; font-weight: bold; font-size: 18px;">${phone}</a></td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><a href="mailto:${email}" style="color: #DC2626;">${email}</a></td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Ville</td><td style="padding: 10px 0; border-bottom: 1px solid #eee;">${city}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Taille garage</td><td style="padding: 10px 0; border-bottom: 1px solid #eee;">${garageSize}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Fissures</td><td style="padding: 10px 0; border-bottom: 1px solid #eee;">${cracks}</td></tr>
              ${message ? `<tr><td style="padding: 10px 0; font-weight: bold;">Notes</td><td style="padding: 10px 0;">${message}</td></tr>` : ''}
            </table>
            <div style="margin-top: 24px; text-align: center;">
              <a href="tel:${phone}" style="background: #DC2626; color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">📞 Appeler ${name}</a>
            </div>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Resend error:', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
