import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'q8bq1hip',
  dataset: 'production',
  apiVersion: '2024-01-19',
  useCdn: true, // Use CDN for faster reads in production
})
