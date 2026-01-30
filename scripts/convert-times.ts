/**
 * Convert ride times from 12-hour format to 24-hour format
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=xxx npx tsx scripts/convert-times.ts
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'q8bq1hip',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

// Convert "6:00 AM" or "6:30 PM" to "06:00" or "18:30"
function to24Hour(time12: string): string {
  const match = time12.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
  if (!match) {
    console.warn(`  Could not parse time: "${time12}"`)
    return time12
  }

  let [, hoursStr, minutes, period] = match
  let hours = parseInt(hoursStr, 10)

  if (period.toUpperCase() === 'PM' && hours !== 12) {
    hours += 12
  } else if (period.toUpperCase() === 'AM' && hours === 12) {
    hours = 0
  }

  return `${hours.toString().padStart(2, '0')}:${minutes}`
}

async function convertTimes() {
  if (!process.env.SANITY_WRITE_TOKEN) {
    console.error('Error: SANITY_WRITE_TOKEN environment variable is required')
    process.exit(1)
  }

  console.log('Fetching all rides...')
  const rides = await client.fetch<Array<{ _id: string; name: string; time: string }>>(
    '*[_type == "ride"]{_id, name, time}'
  )

  console.log(`Found ${rides.length} rides\n`)

  const tx = client.transaction()
  let updateCount = 0

  for (const ride of rides) {
    // Skip if already in 24-hour format
    if (/^([01]\d|2[0-3]):([0-5]\d)$/.test(ride.time)) {
      console.log(`Already 24-hour: ${ride.name} (${ride.time})`)
      continue
    }

    const newTime = to24Hour(ride.time)
    if (newTime !== ride.time) {
      console.log(`Converting: ${ride.name} "${ride.time}" → "${newTime}"`)
      tx.patch(ride._id, (patch) => patch.set({ time: newTime }))
      updateCount++
    }
  }

  if (updateCount === 0) {
    console.log('\nNo times need conversion.')
    return
  }

  console.log(`\nCommitting ${updateCount} updates...`)
  await tx.commit()
  console.log('Done!')
}

convertTimes().catch(console.error)
