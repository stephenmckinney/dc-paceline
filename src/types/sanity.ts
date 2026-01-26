// Shared types for Sanity documents

export const PACE_GRADES = ['A', 'BB', 'B', 'C', 'D'] as const
export type PaceGrade = (typeof PACE_GRADES)[number]

export interface Ride {
  _id: string
  name: string
  dayOfWeek: string
  time: string
  location: string
  pace: PaceGrade
  description?: string
  mapUrl?: string
  url?: string
  urlLabel?: string
}
