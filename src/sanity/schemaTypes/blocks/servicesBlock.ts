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
    defineField({
      name: 'allServicesLink',
      title: 'All Services Link',
      type: 'object',
      description: 'Link to the page showing all services',
      fields: [
        defineField({
          name: 'text',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Bekijk alle diensten',
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