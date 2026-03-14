import { put } from '@vercel/blob'
import { readFileSync } from 'fs'

const token = process.env.BLOB_READ_WRITE_TOKEN
if (!token) {
  console.error('❌ BLOB_READ_WRITE_TOKEN manquant dans .env.local')
  process.exit(1)
}

const file = readFileSync('./public/guide-couleurs.pdf')
const blob = await put('guide-couleurs.pdf', file, {
  access: 'public',
  token,
  contentType: 'application/pdf',
})

console.log('✅ PDF uploadé avec succès')
console.log('🔗 URL:', blob.url)
console.log('\nRemplace la ligne dans LeadForm.tsx :')
console.log(`  href="/guide-couleurs.pdf"`)
console.log(`→  href="${blob.url}"`)
