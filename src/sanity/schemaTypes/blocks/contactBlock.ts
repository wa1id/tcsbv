import { defineType, defineField } from 'sanity'

export const contactBlock = defineType({
  name: 'contactBlock',
  title: 'Contact Form',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Form Title',
      type: 'string',
      initialValue: 'Contact Us',
    }),
    defineField({
      name: 'subtitle',
      title: 'Form Subtitle',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'recipientEmail',
      title: 'Recipient Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
      description: 'Email address where form submissions will be sent',
    }),
    defineField({
      name: 'showContactInfo',
      title: 'Show Contact Information',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Cream', value: 'cream' },
          { title: 'Light Gray', value: 'gray' },
        ],
      },
      initialValue: 'cream',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: `Contact Form: ${title}`,
      }
    },
  },
})