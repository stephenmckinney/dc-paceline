import { MONTH_NAMES } from '../types/sanity'

/**
 * Check if a ride is currently in season.
 * Handles wrap-around seasons (e.g., November to March).
 *
 * @param seasonStart - Start month (1-12), undefined for year-round rides
 * @param seasonEnd - End month (1-12), undefined for year-round rides
 * @param currentMonth - Current month (1-12), defaults to today
 * @returns true if the ride is in season
 */
export function isInSeason(
  seasonStart?: number,
  seasonEnd?: number,
  currentMonth: number = new Date().getMonth() + 1
): boolean {
  // No season defined = year-round
  if (!seasonStart || !seasonEnd) return true

  // Handle wrap-around seasons (e.g., November to March)
  if (seasonStart <= seasonEnd) {
    // Normal range (e.g., April to October)
    return currentMonth >= seasonStart && currentMonth <= seasonEnd
  } else {
    // Wrap-around range (e.g., November to March)
    return currentMonth >= seasonStart || currentMonth <= seasonEnd
  }
}

/**
 * Generate a human-readable season note.
 *
 * @param seasonStart - Start month (1-12)
 * @param seasonEnd - End month (1-12)
 * @returns Season note string or null if year-round
 */
export function getSeasonNote(
  seasonStart?: number,
  seasonEnd?: number
): string | null {
  if (!seasonStart || !seasonEnd) return null
  return `Runs ${MONTH_NAMES[seasonStart]}–${MONTH_NAMES[seasonEnd]}`
}

/**
 * Format 24-hour time to 12-hour format.
 *
 * @param time - Time in "HH:MM" format (e.g., "17:30")
 * @returns Time in 12-hour format (e.g., "5:30 PM")
 * @throws Error if time format is invalid (catches bad data at build time)
 */
export function formatTime(time: string): string {
  // Validate "HH:MM" 24-hour format and capture hour and minute
  const match = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(time)
  if (!match) {
    throw new Error(`Invalid time format: "${time}". Expected "HH:MM".`)
  }

  const hours = Number(match[1])
  const minutes = Number(match[2])

  const period = hours >= 12 ? 'PM' : 'AM'
  const displayHours = hours % 12 || 12
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`
}
