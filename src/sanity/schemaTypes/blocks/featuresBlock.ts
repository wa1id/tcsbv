import { defineType, defineField } from 'sanity'

export const featuresBlock = defineType({
  name: 'featuresBlock',
  title: 'Features Section',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Text',
      type: 'string',
      description: 'Small text above the main title (e.g., "WHY CHOOSE US")',
    }),
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Excellence in Every Service',
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'text',
      rows: 2,
      initialValue: 'Wij combineren expertise, innovatie en toewijding voor al uw verwarmings- en domotica oplossingen',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'title',
              title: 'Feature Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Feature Description',
              type: 'text',
              rows: 2,
            }),
          ],
          preview: {
            select: {
              title: 'title',
              media: 'icon',
            },
          },
        },
      ],
      initialValue: [
        {
          title: 'Vakkundige Technici',
          description: 'Gecertificeerde professionals met jarenlange ervaring in verwarming en domotica',
        },
        {
          title: 'Fast Service',
          description: 'Quick turnaround times without compromising on quality',
        },
        {
          title: 'Quality Guarantee',
          description: '100% satisfaction guarantee on all our services',
        },
        {
          title: 'Fair Pricing',
          description: 'Transparent pricing with no hidden costs',
        },
        {
          title: 'Modern Equipment',
          description: 'State-of-the-art tools and technology for best results',
        },
        {
          title: 'Trusted Service',
          description: 'Thousands of satisfied customers trust us with their vehicles',
        },
      ],
    }),
    defineField({
      name: 'ctaButton',
      title: 'Call to Action Button',
      type: 'object',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Show CTA Button',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'text',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Get Started Today',
        }),
        defineField({
          name: 'linkType',
          title: 'Link Type',
          type: 'string',
          options: {
            list: [
              { title: 'Internal Page', value: 'internal' },
              { title: 'External URL', value: 'external' },
            ],
          },
          initialValue: 'internal',
        }),
        defineField({
          name: 'internalLink',
          title: 'Internal Page',
          type: 'reference',
          to: [{ type: 'page' }],
          hidden: ({ parent }) => parent?.linkType !== 'internal',
        }),
        defineField({
          name: 'externalUrl',
          title: 'External URL',
          type: 'url',
          hidden: ({ parent }) => parent?.linkType !== 'external',
        }),
      ],
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'Dark (Charcoal)', value: 'dark' },
          { title: 'Light (Cream)', value: 'light' },
          { title: 'White', value: 'white' },
        ],
      },
      initialValue: 'dark',
    }),
    defineField({
      name: 'layout',
      title: 'Layout Style',
      type: 'string',
      options: {
        list: [
          { title: '2 Columns (3 items each)', value: '2x3' },
          { title: '3 Columns (2 rows)', value: '3x2' },
          { title: '1 Column (6 items)', value: '1x6' },
        ],
      },
      initialValue: '2x3',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      eyebrow: 'eyebrow',
    },
    prepare({ title, eyebrow }) {
      return {
        title: `Features: ${title}`,
        subtitle: eyebrow || 'No eyebrow text',
      }
    },
  },
})