// Shared types for Sanity documents

export const PACE_GRADES = ['A', 'BB', 'B', 'C', 'D'] as const
export type PaceGrade = (typeof PACE_GRADES)[number]

export const DAYS_OF_WEEK = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
] as const
export type DayOfWeek = (typeof DAYS_OF_WEEK)[number]

// Base type for Sanity references
export interface SanityReference {
  _ref: string
  _type: 'reference'
}

// Sanity slug type
export interface SanitySlug {
  _type: 'slug'
  current: string
}

export interface City {
  _id: string
  _type: 'city'
  name: string
  slug: SanitySlug
}

export interface GroupType {
  _id: string
  _type: 'groupType'
  name: string
}

export interface Group {
  _id: string
  _type: 'group'
  name: string
  groupType?: SanityReference | GroupType
  url: string
  ridesUrl?: string
}

export interface Ride {
  _id: string
  _type: 'ride'
  name: string
  city: SanityReference | City
  location: string
  address?: string
  mapUrl?: string
  group?: SanityReference | Group
  daysOfWeek: DayOfWeek[]
  time: string
  pace: PaceGrade
  description?: string
  url?: string
  urlLabel?: string
  inSeason?: boolean
  outOfSeasonNote?: string
}

// Expanded ride type with resolved references (after GROQ query)
export interface RideExpanded extends Omit<Ride, 'city' | 'group'> {
  city: City
  group?: Group
}
