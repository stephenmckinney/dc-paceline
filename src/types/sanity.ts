// Shared types for Sanity documents

export const PACE_GRADES = ['A', 'BB', 'B', 'C', 'D'] as const
export type PaceGrade = (typeof PACE_GRADES)[number]

export const PACE_DESCRIPTIONS: Record<PaceGrade, string> = {
  'A': 'Race pace, hammerfest',
  'BB': 'Fast group, drops happen',
  'B': 'Moderate, regroups',
  'C': 'Social pace, no-drop',
  'D': 'Beginner-friendly, very chill',
}

// Pace to dots mapping for visual display: A=5, BB=4, B=3, C=2, D=1
export const PACE_DOTS: Record<PaceGrade, number> = {
  'A': 5,
  'BB': 4,
  'B': 3,
  'C': 2,
  'D': 1,
}

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

export const REGIONS = ['dc', 'va', 'md'] as const
export type Region = (typeof REGIONS)[number]

// Month names for display (1-indexed to match seasonStart/seasonEnd values)
export const MONTH_NAMES: Record<number, string> = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
}

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
  region: Region
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
  seasonStart?: number
  seasonEnd?: number
}

// Expanded ride type with resolved references (after GROQ query)
export interface RideExpanded extends Omit<Ride, 'city' | 'group'> {
  city: City
  group?: Group
}
