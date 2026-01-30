/**
 * Remove old inSeason field from all rides
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=xxx npx tsx scripts/update-seasons.ts
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'q8bq1hip',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

async function cleanup() {
  if (!process.env.SANITY_WRITE_TOKEN) {
    console.error('Error: SANITY_WRITE_TOKEN environment variable is required')
    process.exit(1)
  }

  console.log('Fetching rides with inSeason field...')
  const rides = await client.fetch<Array<{ _id: string; name: string }>>(
    '*[_type == "ride" && defined(inSeason)]{_id, name}'
  )

  if (rides.length === 0) {
    console.log('No rides have the old inSeason field. Nothing to clean up.')
    return
  }

  console.log(`Found ${rides.length} rides with inSeason field\n`)

  const tx = client.transaction()

  for (const ride of rides) {
    console.log(`Removing inSeason from: ${ride.name}`)
    tx.patch(ride._id, (patch) => patch.unset(['inSeason']))
  }

  console.log('\nCommitting changes...')
  await tx.commit()
  console.log('Done!')
}

cleanup().catch(console.error)
