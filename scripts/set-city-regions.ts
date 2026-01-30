/**
 * Set region field on existing cities
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=xxx npx tsx scripts/set-city-regions.ts
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'q8bq1hip',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

// Map city names to regions
const cityRegions: Record<string, 'dc' | 'va' | 'md'> = {
  'Washington, DC': 'dc',
  'Northern Virginia': 'va',
  'Maryland': 'md',
}

async function setCityRegions() {
  if (!process.env.SANITY_WRITE_TOKEN) {
    console.error('Error: SANITY_WRITE_TOKEN environment variable is required')
    process.exit(1)
  }

  console.log('Fetching all cities...')
  const cities = await client.fetch<Array<{ _id: string; name: string; region?: string }>>(
    '*[_type == "city"]{_id, name, region}'
  )

  console.log(`Found ${cities.length} cities\n`)

  const tx = client.transaction()
  let updateCount = 0
  const unmapped: string[] = []

  for (const city of cities) {
    // Skip if already has region
    if (city.region) {
      console.log(`Already set: ${city.name} (${city.region})`)
      continue
    }

    const region = cityRegions[city.name]
    if (region) {
      console.log(`Setting: ${city.name} → ${region.toUpperCase()}`)
      tx.patch(city._id, (patch) => patch.set({ region }))
      updateCount++
    } else {
      unmapped.push(city.name)
    }
  }

  if (unmapped.length > 0) {
    console.log('\n⚠️  Cities without region mapping:')
    unmapped.forEach(name => console.log(`  - ${name}`))
    console.log('\nAdd these to the cityRegions map in the script and re-run.')
  }

  if (updateCount === 0) {
    console.log('\nNo cities need updates.')
    return
  }

  console.log(`\nCommitting ${updateCount} updates...`)
  await tx.commit()
  console.log('Done!')
}

setCityRegions().catch(console.error)
