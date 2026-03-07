import { Resend } from 'resend'
import twilio from 'twilio'
import { NextResponse } from 'next/server'

const copy = {
  fr: {
    clientSubject: `Demande reçue — On vous appelle dans les 24h`,
    clientGreeting: (name: string) => `Bonjour ${name} ✓`,
    clientBody: (phone: string) => `Votre demande de soumission a bien été reçue. Un technicien Garage Express vous appellera dans les <strong>24 heures</strong> au <strong>${phone}</strong> pour confirmer les détails de votre projet.`,
    clientRecap: 'Récapitulatif :',
    clientCity: (city: string) => `📍 Ville : ${city}`,
    clientGarage: (size: string) => `🏠 Garage : ${size}`,
    clientWaiting: `En attendant notre appel, vous pouvez nous rejoindre directement :`,
    clientCta: `📞 514-824-8618`,
    clientSms: `Garage Express: Demande reçue ✓ Un technicien vous appelle dans les 24h. Questions? 514-824-8618`,
  },
  en: {
    clientSubject: `Request received — We'll call you within 24h`,
    clientGreeting: (name: string) => `Hello ${name} ✓`,
    clientBody: (phone: string) => `Your quote request has been received. A Garage Express technician will call you within <strong>24 hours</strong> at <strong>${phone}</strong> to confirm your project details.`,
    clientRecap: 'Summary:',
    clientCity: (city: string) => `📍 City: ${city}`,
    clientGarage: (size: string) => `🏠 Garage: ${size}`,
    clientWaiting: `While you wait for our call, you can reach us directly:`,
    clientCta: `📞 514-824-8618`,
    clientSms: `Garage Express: Request received ✓ A technician will call you within 24h. Questions? 514-824-8618`,
  },
}

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const sms = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  const data = await req.json()
  const { name, email, phone, garageSize, city, cracks, message, locale, colorName, colorFile } = data
  const t = locale === 'en' ? copy.en : copy.fr

  // GoHighLevel CRM — create contact then opportunity in "Nouveau Lead"
  const ghlHeaders = {
    Authorization: `Bearer ${process.env.GHL_API_KEY}`,
    'Content-Type': 'application/json',
    Version: '2021-07-28',
  }
  let ghlDebug: any = null
  try {
    const contactRes = await fetch('https://services.leadconnectorhq.com/contacts/', {
      method: 'POST',
      headers: ghlHeaders,
      body: JSON.stringify({
        locationId: process.env.GHL_LOCATION_ID,
        firstName: name.split(' ')[0],
        lastName: name.split(' ').slice(1).join(' ') || '',
        email,
        phone: `+1${phone.replace(/\D/g, '')}`,
        city,
        source: 'garagexpress.ca',
        tags: ['lead-site', locale === 'en' ? 'en' : 'fr'],
        customFields: [
          { id: 'LfxOSUhHkF717C4S1H7d', value: garageSize },
          { id: 'k262N1Qyf818poepQ17d', value: message || '' },
        ],
      }),
    })
    const contact = await contactRes.json()
    ghlDebug = contact
    const contactId = contact?.contact?.id
    if (contactId) {
      await fetch('https://services.leadconnectorhq.com/opportunities/', {
        method: 'POST',
        headers: ghlHeaders,
        body: JSON.stringify({
          locationId: process.env.GHL_LOCATION_ID,
          pipelineId: 'NwqgBVo8HctRW7RpiOhr',
          pipelineStageId: '2ab9c92a-e51a-43dd-9b25-efea34da0d6c',
          contactId,
          name: `${name} — ${city} (${garageSize}${colorName ? ` · ${colorName}` : ''})`,
          status: 'open',
          source: 'garagexpress.ca',
        }),
      })
    }
  } catch (e) {
    ghlDebug = String(e)
    console.error('GHL failed:', e)
  }

  const results = await Promise.allSettled([
    // Email à toi
    resend.emails.send({
      from: 'Garage Express <info@garagexpress.ca>',
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
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Langue</td><td style="padding: 10px 0; border-bottom: 1px solid #eee;">${locale === 'en' ? '🇬🇧 EN' : '🇫🇷 FR'}</td></tr>
              ${colorName ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">🎨 Couleur</td><td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #DC2626;">${colorName}</td></tr>` : ''}
              ${message ? `<tr><td style="padding: 10px 0; font-weight: bold;">Notes</td><td style="padding: 10px 0;">${message}</td></tr>` : ''}
            </table>
            <div style="margin-top: 24px; text-align: center;">
              <a href="tel:${phone}" style="background: #DC2626; color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">📞 Appeler ${name}</a>
            </div>
          </div>
        </div>
      `,
    }),

    // Email de confirmation au client (FR ou EN)
    resend.emails.send({
      from: 'Garage Express <info@garagexpress.ca>',
      replyTo: 'tahabensadek@gmail.com',
      to: email,
      subject: t.clientSubject,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #111; padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 22px;">Garage Express</h1>
          </div>
          <div style="background: #f9f9f9; padding: 32px; border-radius: 0 0 8px 8px; border: 1px solid #e5e5e5;">
            <h2 style="color: #111; margin: 0 0 16px;">${t.clientGreeting(name)}</h2>
            <p style="color: #444; line-height: 1.6;">${t.clientBody(phone)}</p>
            <div style="background: white; border: 1px solid #eee; border-radius: 8px; padding: 20px; margin: 24px 0;">
              <p style="margin: 0 0 8px; color: #666; font-size: 14px;"><strong>${t.clientRecap}</strong></p>
              <p style="margin: 4px 0; color: #444; font-size: 14px;">${t.clientCity(city)}</p>
              <p style="margin: 4px 0; color: #444; font-size: 14px;">${t.clientGarage(garageSize)}</p>
              ${colorName ? `<p style="margin: 4px 0; color: #444; font-size: 14px;">🎨 ${locale === 'en' ? 'Color' : 'Couleur'} : <strong>${colorName}</strong></p>` : ''}
            </div>
            <p style="color: #444; line-height: 1.6;">${t.clientWaiting}</p>
            <div style="text-align: center; margin-top: 24px;">
              <a href="tel:5148248618" style="background: #DC2626; color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">${t.clientCta}</a>
            </div>
            <p style="color: #999; font-size: 12px; margin-top: 32px; text-align: center;">Garage Express — Rive-Sud & Montréal</p>
          </div>
        </div>
      `,
    }),

    // SMS à toi
    sms.messages.create({
      from: process.env.TWILIO_FROM!,
      to: process.env.TWILIO_TO!,
      body: `🔥 Nouveau lead Garage Express\n${name} — ${city} — ${garageSize}${colorName ? ` — 🎨 ${colorName}` : ''}\n📞 ${phone}`,
    }),

    // SMS de confirmation au client (FR ou EN)
    sms.messages.create({
      from: process.env.TWILIO_FROM!,
      to: `+1${phone.replace(/\D/g, '')}`,
      body: t.clientSms,
    }),
  ])

  results.forEach((r, i) => {
    if (r.status === 'rejected') console.error(`Notification ${i} failed:`, r.reason)
  })

  return NextResponse.json({ ok: true, ghl: ghlDebug })
}
