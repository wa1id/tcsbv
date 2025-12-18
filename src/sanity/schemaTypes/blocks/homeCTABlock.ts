import { defineType, defineField } from 'sanity'

export const homeCTABlock = defineType({
  name: 'homeCTABlock',
  title: 'Home CTA Section',
  type: 'object',
  fields: [
    defineField({
      name: 'featureCards',
      title: 'Feature Cards',
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
              title: 'Card Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Card Description',
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
          title: 'Engine performance',
          description: 'Tempus tincidunt neque.',
        },
        {
          title: 'Detailed diagnostic',
          description: 'Tempus tincidunt neque.',
        },
        {
          title: 'Reasonable price',
          description: 'Tempus tincidunt neque.',
        },
      ],
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'mainHeadline',
      title: 'Main Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'We strive for excellence in everything we do.',
    }),
    defineField({
      name: 'subtext',
      title: 'Subtext',
      type: 'text',
      rows: 2,
      initialValue: 'Massa euismod laoreet faucibus cras non amet.',
    }),
    defineField({
      name: 'ctaButtons',
      title: 'Call to Action Buttons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Button Text',
              type: 'string',
            }),
            defineField({
              name: 'linkType',
              title: 'Link Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Internal Page', value: 'internal' },
                  { title: 'External URL', value: 'external' },
                  { title: 'Anchor Link', value: 'anchor' },
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
            defineField({
              name: 'anchorLink',
              title: 'Anchor Link (e.g., #faq)',
              type: 'string',
              hidden: ({ parent }) => parent?.linkType !== 'anchor',
            }),
            defineField({
              name: 'style',
              title: 'Button Style',
              type: 'string',
              options: {
                list: [
                  { title: 'Primary (Solid)', value: 'primary' },
                  { title: 'Secondary (Link)', value: 'secondary' },
                ],
              },
              initialValue: 'primary',
            }),
          ],
          preview: {
            select: {
              title: 'text',
              subtitle: 'style',
            },
          },
        },
      ],
      initialValue: [
        {
          text: 'Vraag een offerte aan',
          url: '/contact',
          style: 'primary',
        },
        {
          text: 'Frequently asked questions',
          url: '#faq',
          style: 'secondary',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'mainHeadline',
      media: 'backgroundImage',
    },
    prepare({ title, media }) {
      return {
        title: `Home CTA: ${title}`,
        media,
      }
    },
  },
})