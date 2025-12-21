import { defineType, defineField } from 'sanity'

export const servicesBlock = defineType({
  name: 'servicesBlock',
  title: 'Services Section',
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
      name: 'services',
      title: 'Select Services',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'service' }],
        },
      ],
    }),
    defineField({
      name: 'numberOfServicesToShow',
      title: 'Number of Services to Show',
      type: 'number',
      description: 'How many services to display (leave empty to show all)',
      validation: (Rule) => Rule.min(1),
    }),
    ],
  preview: {
    select: {
      title: 'title',
      services: 'services',
    },
    prepare({ title, services }) {
      return {
        title: `Services: ${title || 'Untitled'}`,
        subtitle: `${services?.length || 0} services selected`,
      }
    },
  },
})