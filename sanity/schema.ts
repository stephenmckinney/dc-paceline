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

const ride = defineType({
  name: 'ride',
  title: 'Ride',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Ride Name',
      type: 'string',
      validation: (rule) => rule.required(),
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
      name: 'location',
      title: 'Start Location',
      type: 'string',
      description: 'e.g., "BicycleSpace, H St NE"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mapUrl',
      title: 'Map URL',
      type: 'url',
      description: 'Google Maps or similar link to start location',
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
      name: 'published',
      title: 'Published',
      type: 'boolean',
      description: 'Only published rides appear on the site',
      initialValue: true,
    }),
    defineField({
      name: 'inSeason',
      title: 'In Season',
      type: 'boolean',
      description: 'Uncheck for rides that only run part of the year',
      initialValue: true,
    }),
    defineField({
      name: 'outOfSeasonNote',
      title: 'Out of Season Note',
      type: 'string',
      description: 'e.g., "Runs April–September"',
      hidden: ({ parent }) => parent?.inSeason !== false,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      day: 'dayOfWeek',
      time: 'time',
      published: 'published',
    },
    prepare({ title, day, time, published }) {
      const dayLabel = day ? day.charAt(0).toUpperCase() + day.slice(1) : ''
      return {
        title,
        subtitle: `${dayLabel} ${time}${published ? '' : ' (draft)'}`,
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

export const schemaTypes = [ride]
