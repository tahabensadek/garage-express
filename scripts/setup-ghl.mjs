const API_KEY = 'pit-8714405b-fd33-4b98-aee0-d659c3d96c9c'
const LOCATION_ID = '1ZUKiWhBOrI5cA6qUSNz'
const BASE = 'https://services.leadconnectorhq.com'
const headers = {
  Authorization: `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
  Version: '2021-07-28',
}

async function api(method, path, body) {
  const res = await fetch(`${BASE}${path}`, { method, headers, body: body ? JSON.stringify(body) : undefined })
  const text = await res.text()
  try {
    const json = JSON.parse(text)
    if (!res.ok) console.error(`❌ ${method} ${path} [${res.status}]:`, JSON.stringify(json))
    return json
  } catch {
    console.error(`❌ ${method} ${path} [${res.status}]:`, text)
    return null
  }
}

// 1. Create pipeline
console.log('\n📊 Creating pipeline...')
const pipelineRes = await api('POST', '/opportunities/pipelines', {
  locationId: LOCATION_ID,
  name: 'GarageExpress — Ventes',
  stages: [
    { name: 'Nouveau Lead' },
    { name: 'Tenté de contacter' },
    { name: 'Estimé bookée' },
    { name: 'Estimé complétée' },
    { name: 'Soumission envoyée' },
    { name: 'Job signé — Deposit reçu' },
    { name: 'Chantier planifié' },
    { name: 'Chantier complété' },
    { name: 'Review demandée' },
    { name: 'Review reçue' },
  ],
})
console.log('Pipeline result:', JSON.stringify(pipelineRes, null, 2))

// 2. Fix SINGLE_OPTIONS fields (correct format)
console.log('\n🏷️  Creating remaining custom fields...')
const selectFields = [
  { name: 'Type de garage', dataType: 'SINGLE_OPTIONS', options: ['Simple', 'Double'] },
  { name: 'Deposit reçu', dataType: 'SINGLE_OPTIONS', options: ['Oui', 'Non'] },
  { name: 'Source lead', dataType: 'SINGLE_OPTIONS', options: ['Google Ads', 'Référence', 'Organique'] },
]

for (const field of selectFields) {
  const res = await api('POST', `/locations/${LOCATION_ID}/customFields`, field)
  if (res?.customField?.id) {
    console.log(`  ✅ ${field.name}: ${res.customField.id}`)
  } else {
    console.log(`  ❌ ${field.name}:`, JSON.stringify(res))
  }
}

console.log('\n✅ Done!')
