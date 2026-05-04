import { defineType, defineField } from 'sanity';

export const availableDates = defineType({
  name: 'availableDates',
  title: 'Available Dates',
  type: 'document',
  fields: [
    defineField({
      name: 'dates',
      title: 'Available Dates',
      type: 'array',
      of: [{ type: 'date' }],
      description: 'Add dates when the team is available for calls',
    }),
    defineField({
      name: 'timeSlots',
      title: 'Available Time Slots',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g. "10:00 AM", "2:00 PM", "4:00 PM"',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Available Dates & Time Slots' };
    },
  },
});
