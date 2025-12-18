import { defineType, defineField } from 'sanity'

export const heroBlock = defineType({
  name: 'heroBlock',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'style',
      title: 'Hero Style',
      type: 'string',
      options: {
        list: [
          { title: 'Default (Full-width overlay)', value: 'default' },
          { title: 'Home (Split card layout)', value: 'home' },
        ],
        layout: 'radio',
      },
      initialValue: 'default',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    // Default style fields
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      hidden: ({ parent }) => parent?.style === 'home',
      validation: (Rule) => Rule.custom((value, context) => {
        const style = (context.parent as any)?.style
        if (style !== 'home' && !value) return 'Title is required'
        return true
      }),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
      hidden: ({ parent }) => parent?.style === 'home',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      hidden: ({ parent }) => parent?.style === 'home',
    }),
    defineField({
      name: 'ctaButtons',
      title: 'Call to Action Buttons',
      type: 'array',
      hidden: ({ parent }) => parent?.style === 'home',
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
              name: 'buttonStyle',
              title: 'Button Style',
              type: 'string',
              options: {
                list: [
                  { title: 'Primary', value: 'primary' },
                  { title: 'Secondary', value: 'secondary' },
                  { title: 'Outline', value: 'outline' },
                ],
              },
              initialValue: 'primary',
            }),
          ],
        },
      ],
    }),
    // Home style fields
    defineField({
      name: 'welcomeText',
      title: 'Welcome Text',
      type: 'string',
      hidden: ({ parent }) => parent?.style !== 'home',
      initialValue: 'Welcome to TCSBV',
    }),
    defineField({
      name: 'mainHeadline',
      title: 'Main Headline',
      type: 'string',
      hidden: ({ parent }) => parent?.style !== 'home',
      validation: (Rule) => Rule.custom((value, context) => {
        const style = (context.parent as any)?.style
        if (style === 'home' && !value) return 'Main headline is required'
        return true
      }),
      initialValue: 'Uw specialist in verwarming & domotica',
    }),
    defineField({
      name: 'ctaButton',
      title: 'Call to Action Button',
      type: 'object',
      hidden: ({ parent }) => parent?.style !== 'home',
      fields: [
        defineField({
          name: 'text',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Vraag een offerte aan',
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
      name: 'contactForm',
      title: 'Contact Form Settings',
      type: 'object',
      hidden: ({ parent }) => parent?.style !== 'home',
      fields: [
        defineField({
          name: 'showForm',
          title: 'Show Contact Form',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'formTitle',
          title: 'Form Button Text',
          type: 'string',
          initialValue: 'Book appointment',
        }),
      ],
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      hidden: ({ parent }) => parent?.style !== 'home',
      fields: [
        defineField({
          name: 'questionText',
          title: 'Question Text',
          type: 'string',
          initialValue: 'Got a question about our services?',
        }),
        defineField({
          name: 'phoneText',
          title: 'Phone Call Text',
          type: 'string',
          initialValue: 'Call us',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      mainHeadline: 'mainHeadline',
      style: 'style',
      media: 'backgroundImage',
    },
    prepare({ title, mainHeadline, style, media }) {
      const displayTitle = style === 'home' ? mainHeadline : title
      return {
        title: `Hero: ${displayTitle || 'Untitled'}`,
        subtitle: style === 'home' ? 'Home style' : 'Default style',
        media,
      }
    },
  },
})
