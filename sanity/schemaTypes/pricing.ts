import { defineType, defineField } from 'sanity';

export const pricing = defineType({
  name: 'pricing',
  title: 'Pricing',
  type: 'document',
  fields: [
    defineField({
      name: 'tierName',
      title: 'Tier Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price (0 = Custom)',
      type: 'number',
      description: 'Set to 0 to display as "Custom"',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'period',
      title: 'Period',
      type: 'string',
      initialValue: 'per project',
    }),
    defineField({
      name: 'highlighted',
      title: 'Highlighted (POPULAR)',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      initialValue: 'Get Started',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'tierName',
      subtitle: 'price',
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle === 0 ? 'Custom Pricing' : `$${subtitle}`,
      };
    },
  },
});
