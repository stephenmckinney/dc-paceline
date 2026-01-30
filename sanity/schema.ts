import { defineType, defineField } from 'sanity'

const DAYS_OF_WEEK = [
  { title: 'Monday', value: 'monday' },
  { title: 'Tuesday', value: 'tuesday' },
  { title: 'Wednesday', value: 'wednesday' },
  { title: 'Thursday', value: 'thursday' },
  { title: 'Friday', value: 'friday' },
  { title: 'Saturday', value: 'saturday' },
  { title: 'Sunday', value: 'sunday' },
]

const PACE_GRADES = [
  { title: 'A - Race pace, hammerfest', value: 'A' },
  { title: 'BB - Fast group, drops happen', value: 'BB' },
  { title: 'B - Moderate, regroups', value: 'B' },
  { title: 'C - Social pace, no-drop', value: 'C' },
  { title: 'D - Beginner-friendly, very chill', value: 'D' },
]

// ============================================
// City
// ============================================
const city = defineType({
  name: 'city',
  title: 'City',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
})

// ============================================
// Group Type
// ============================================
const groupType = defineType({
  name: 'groupType',
  title: 'Group Type',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'e.g., "Club", "Shop", "Informal"',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
})

// ============================================
// Group
// ============================================
const group = defineType({
  name: 'group',
  title: 'Group',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'groupType',
      title: 'Group Type',
      type: 'reference',
      to: [{ type: 'groupType' }],
    }),
    defineField({
      name: 'url',
      title: 'Website URL',
      type: 'url',
      description: 'Main website or homepage for the group',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ridesUrl',
      title: 'Rides URL',
      type: 'url',
      description: 'Direct link to the group\'s ride calendar or schedule',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      groupType: 'groupType.name',
    },
    prepare({ title, groupType }) {
      return {
        title,
        subtitle: groupType,
      }
    },
  },
})

// ============================================
// Ride
// ============================================
const ride = defineType({
  name: 'ride',
  title: 'Ride',
  type: 'document',
  fieldsets: [
    {
      name: 'startLocation',
      title: 'Start Location',
      options: { collapsible: false },
    },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Ride Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'reference',
      to: [{ type: 'city' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'group',
      title: 'Group',
      type: 'reference',
      to: [{ type: 'group' }],
      description: 'Optional - the club or group that organizes this ride',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      fieldset: 'startLocation',
      description: 'e.g., "BicycleSpace, H St NE"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
      fieldset: 'startLocation',
      description: 'Full street address (optional)',
    }),
    defineField({
      name: 'mapUrl',
      title: 'Map URL',
      type: 'url',
      fieldset: 'startLocation',
      description: 'Google Maps link',
    }),
    defineField({
      name: 'dayOfWeek',
      title: 'Day of Week',
      type: 'string',
      options: {
        list: DAYS_OF_WEEK,
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'time',
      title: 'Start Time',
      type: 'string',
      description: 'e.g., "5:30 PM" or "8:00 AM"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pace',
      title: 'Pace Grade',
      type: 'string',
      options: {
        list: PACE_GRADES,
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'Brief description of the ride, what to expect, etc.',
    }),
    defineField({
      name: 'url',
      title: 'Ride URL',
      type: 'url',
      description: 'Link to ride details, Strava club, or organizer page',
    }),
    defineField({
      name: 'urlLabel',
      title: 'URL Button Label',
      type: 'string',
      description: 'e.g., "Strava", "Details", "DCMTB" (defaults to "Details")',
    }),
    defineField({
      name: 'inSeason',
      title: 'Currently Running',
      type: 'boolean',
      description: 'Uncheck if this ride is not currently running (seasonal or on hiatus)',
      initialValue: true,
    }),
    defineField({
      name: 'outOfSeasonNote',
      title: 'Not Running Note',
      type: 'string',
      description: 'e.g., "Runs April–September" or "On hiatus"',
      hidden: ({ parent }) => parent?.inSeason !== false,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      day: 'dayOfWeek',
      time: 'time',
      city: 'city.name',
    },
    prepare({ title, day, time, city }) {
      const dayLabel = day ? day.charAt(0).toUpperCase() + day.slice(1) : ''
      return {
        title,
        subtitle: `${dayLabel} ${time}${city ? ` • ${city}` : ''}`,
      }
    },
  },
  orderings: [
    {
      title: 'Day of Week',
      name: 'dayOfWeekAsc',
      by: [{ field: 'dayOfWeek', direction: 'asc' }],
    },
  ],
})

export const schemaTypes = [city, groupType, group, ride]
