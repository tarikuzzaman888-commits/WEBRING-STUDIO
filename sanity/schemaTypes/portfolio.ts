import { defineField, defineType } from 'sanity';

export const portfolio = defineType({
  name: 'portfolio',
  title: 'Portfolio',
  type: 'document',
  fields: [
    // Basic Info
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'AI Photography', value: 'AI Photography' },
          { title: 'Lifestyle', value: 'Lifestyle' },
          { title: 'E-commerce', value: 'E-commerce' },
          { title: 'Branding', value: 'Branding' },
          { title: 'Video', value: 'Video' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'clientIndustry',
      title: 'Client Industry',
      type: 'string',
      description: 'e.g. Fashion, Supplements, Electronics',
    }),
    defineField({
      name: 'projectDate',
      title: 'Project Date',
      type: 'date',
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),

    // Like Upwork — Multiple Images per project
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      description: 'Main thumbnail shown in grid (Square recommended)',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'projectImages',
      title: 'Project Images (Gallery)',
      type: 'array',
      description: 'Upload multiple images for this project gallery',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'image', type: 'image', options: { hotspot: true } },
            { name: 'caption', type: 'string' },
            { 
              name: 'isBeforeImage', 
              type: 'boolean', 
              title: 'Is this a BEFORE image?',
              initialValue: false 
            },
            { 
              name: 'isAfterImage', 
              type: 'boolean', 
              title: 'Is this an AFTER image?',
              initialValue: false 
            }
          ],
          preview: {
            select: { media: 'image', title: 'caption' }
          }
        }
      ]
    }),

    // Project Details
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'string',
      description: 'One line shown in grid card card (max 60 chars)',
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      type: 'text',
      description: 'Full project story shown in detail view',
    }),
    defineField({
      name: 'tools',
      title: 'Tools Used',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g. Photoshop, Midjourney, Gemini AI',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    
    // Results/Stats
    defineField({
      name: 'results',
      title: 'Project Results',
      type: 'array',
      description: 'Impact metrics like conversion lift',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'metric', type: 'string', description: 'e.g. Conversion Rate' },
            { name: 'value', type: 'string', description: 'e.g. +47%' },
            { name: 'description', type: 'string', description: 'e.g. increase after new images' }
          ]
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'coverImage',
    },
  },
});
