import { defineType, defineField } from 'sanity';

export const booking = defineType({
  name: 'booking',
  title: 'Booking',
  type: 'document',
  fields: [
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      validation: (rule) => rule.required(),
      readOnly: true,
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'services',
      title: 'Services Requested',
      type: 'array',
      of: [{ type: 'string' }],
      readOnly: true,
    }),
    defineField({
      name: 'productCategory',
      title: 'Product Category',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'budget',
      title: 'Budget',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
      readOnly: true,
    }),
    defineField({
      name: 'selectedDate',
      title: 'Selected Date',
      type: 'date',
      readOnly: true,
    }),
    defineField({
      name: 'selectedTime',
      title: 'Selected Time',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'referral',
      title: 'Referral Source',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Confirmed', value: 'confirmed' },
          { title: 'Completed', value: 'completed' },
          { title: 'Cancelled', value: 'cancelled' },
        ],
      },
      initialValue: 'pending',
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      readOnly: true,
    }),
  ],
  orderings: [
    {
      title: 'Newest First',
      name: 'createdAtDesc',
      by: [{ field: 'createdAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'clientName',
      subtitle: 'selectedDate',
      status: 'status',
    },
    prepare({ title, subtitle, status }) {
      return {
        title: `${title}`,
        subtitle: `${subtitle} — ${status?.toUpperCase() || 'PENDING'}`,
      };
    },
  },
});
