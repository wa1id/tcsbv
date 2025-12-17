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
              name: 'url',
              title: 'Button URL',
              type: 'string',
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
          text: 'Need a car inspection?',
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