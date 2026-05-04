import { defineType, defineField } from 'sanity';

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroLine1',
      title: 'Hero Line 1',
      type: 'string',
      initialValue: 'We Engineer',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroLine2',
      title: 'Hero Line 2',
      type: 'string',
      initialValue: 'Reality.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 3,
      initialValue: 'AI-powered product photography and brand visuals that convert browsers into buyers. Based in Bangladesh, serving brands worldwide.',
    }),
    defineField({
      name: 'socialProof',
      title: 'Social Proof Text',
      type: 'string',
      initialValue: 'Trusted by 200+ brands across 15 countries',
    }),
    defineField({
      name: 'cta1Text',
      title: 'CTA Button 1 Text',
      type: 'string',
      initialValue: 'See Our Work',
    }),
    defineField({
      name: 'cta2Text',
      title: 'CTA Button 2 Text',
      type: 'string',
      initialValue: 'Book a Free Call',
    }),
    defineField({
      name: 'heroImages',
      title: 'Hero Images (max 6)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: 'marqueeText',
      title: 'Marquee Text',
      type: 'string',
      initialValue: 'AI Product Photography ✦ Brand Identity ✦ E-commerce Visuals ✦ Lifestyle Shoots ✦ Video Content ✦ Creative Direction ✦',
    }),
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'stat',
          fields: [
            defineField({ name: 'value', title: 'Value', type: 'number', validation: (rule) => rule.required() }),
            defineField({ name: 'label', title: 'Label', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'suffix', title: 'Suffix', type: 'string', initialValue: '+' }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'value' },
          },
        },
      ],
    }),
    defineField({
      name: 'ctaBannerHeading',
      title: 'CTA Banner Heading',
      type: 'string',
      initialValue: 'Ready to make your product irresistible?',
    }),
    defineField({
      name: 'ctaBannerSubtext',
      title: 'CTA Banner Subtext',
      type: 'string',
      initialValue: "Let's create visuals that don't just look good — they sell.",
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Home Page' };
    },
  },
});
