import { defineType, defineField } from 'sanity'

export const faqBlock = defineType({
  name: 'faqBlock',
  title: 'FAQ Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'faqs',
      title: 'Select FAQs',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'faq' }],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      faqs: 'faqs',
    },
    prepare({ title, faqs }) {
      return {
        title: `FAQ: ${title || 'Untitled'}`,
        subtitle: `${faqs?.length || 0} FAQs selected`,
      }
    },
  },
})