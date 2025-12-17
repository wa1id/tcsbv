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
      name: 'layout',
      title: 'Layout Style',
      type: 'string',
      options: {
        list: [
          { title: 'Grid', value: 'grid' },
          { title: 'Carousel', value: 'carousel' },
          { title: 'List', value: 'list' },
        ],
      },
      initialValue: 'grid',
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