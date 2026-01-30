import { describe, it, expect } from 'vitest'
import { isInSeason, getSeasonNote, formatTime } from './rides'

describe('isInSeason', () => {
  it('returns true when no season is defined (year-round)', () => {
    expect(isInSeason(undefined, undefined, 6)).toBe(true)
    expect(isInSeason(undefined, 10, 6)).toBe(true)
    expect(isInSeason(4, undefined, 6)).toBe(true)
  })

  describe('normal range (start <= end)', () => {
    // April (4) to October (10)
    it('returns true when current month is within range', () => {
      expect(isInSeason(4, 10, 4)).toBe(true)  // start month
      expect(isInSeason(4, 10, 7)).toBe(true)  // middle
      expect(isInSeason(4, 10, 10)).toBe(true) // end month
    })

    it('returns false when current month is outside range', () => {
      expect(isInSeason(4, 10, 1)).toBe(false)  // January
      expect(isInSeason(4, 10, 3)).toBe(false)  // March (just before)
      expect(isInSeason(4, 10, 11)).toBe(false) // November (just after)
      expect(isInSeason(4, 10, 12)).toBe(false) // December
    })
  })

  describe('wrap-around range (start > end)', () => {
    // November (11) to March (3) - winter season
    it('returns true when current month is within wrap-around range', () => {
      expect(isInSeason(11, 3, 11)).toBe(true) // November (start)
      expect(isInSeason(11, 3, 12)).toBe(true) // December
      expect(isInSeason(11, 3, 1)).toBe(true)  // January
      expect(isInSeason(11, 3, 2)).toBe(true)  // February
      expect(isInSeason(11, 3, 3)).toBe(true)  // March (end)
    })

    it('returns false when current month is outside wrap-around range', () => {
      expect(isInSeason(11, 3, 4)).toBe(false)  // April
      expect(isInSeason(11, 3, 7)).toBe(false)  // July
      expect(isInSeason(11, 3, 10)).toBe(false) // October (just before)
    })
  })

  describe('edge cases', () => {
    // Single month season
    it('handles single month season (start equals end)', () => {
      expect(isInSeason(6, 6, 6)).toBe(true)
      expect(isInSeason(6, 6, 5)).toBe(false)
      expect(isInSeason(6, 6, 7)).toBe(false)
    })
  })
})

describe('getSeasonNote', () => {
  it('returns null when no season is defined', () => {
    expect(getSeasonNote(undefined, undefined)).toBe(null)
    expect(getSeasonNote(4, undefined)).toBe(null)
    expect(getSeasonNote(undefined, 10)).toBe(null)
  })

  it('returns formatted season note for normal range', () => {
    expect(getSeasonNote(4, 10)).toBe('Runs April–October')
    expect(getSeasonNote(1, 12)).toBe('Runs January–December')
  })

  it('returns formatted season note for wrap-around range', () => {
    expect(getSeasonNote(11, 3)).toBe('Runs November–March')
  })
})

describe('formatTime', () => {
  describe('AM times', () => {
    it('formats midnight', () => {
      expect(formatTime('00:00')).toBe('12:00 AM')
    })

    it('formats early morning', () => {
      expect(formatTime('05:30')).toBe('5:30 AM')
      expect(formatTime('08:00')).toBe('8:00 AM')
      expect(formatTime('09:15')).toBe('9:15 AM')
    })

    it('formats late morning', () => {
      expect(formatTime('11:59')).toBe('11:59 AM')
    })
  })

  describe('PM times', () => {
    it('formats noon', () => {
      expect(formatTime('12:00')).toBe('12:00 PM')
    })

    it('formats afternoon', () => {
      expect(formatTime('13:00')).toBe('1:00 PM')
      expect(formatTime('17:30')).toBe('5:30 PM')
    })

    it('formats evening', () => {
      expect(formatTime('18:00')).toBe('6:00 PM')
      expect(formatTime('20:45')).toBe('8:45 PM')
      expect(formatTime('23:59')).toBe('11:59 PM')
    })
  })

  describe('edge cases', () => {
    it('pads single-digit minutes', () => {
      expect(formatTime('08:05')).toBe('8:05 AM')
      expect(formatTime('14:01')).toBe('2:01 PM')
    })
  })
})
