import { defineType, defineField } from 'sanity'

export const headerSettings = defineType({
  name: 'headerSettings',
  title: 'Header Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'navigation',
      title: 'Navigation Menu',
      type: 'array',
      description: 'Configure your main navigation links',
      of: [
        {
          type: 'object',
          name: 'navItem',
          title: 'Navigation Item',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'linkType',
              title: 'Link Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Internal Page', value: 'internal' },
                  { title: 'External URL', value: 'external' },
                  { title: 'Dropdown (no link)', value: 'dropdown' },
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
              name: 'children',
              title: 'Dropdown Items',
              type: 'array',
              hidden: ({ parent }) => parent?.linkType !== 'dropdown',
              of: [
                {
                  type: 'object',
                  name: 'childNavItem',
                  fields: [
                    defineField({
                      name: 'title',
                      title: 'Title',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
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
                  preview: {
                    select: {
                      title: 'title',
                    },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: {
              title: 'title',
              linkType: 'linkType',
              children: 'children',
            },
            prepare({ title, linkType, children }) {
              return {
                title,
                subtitle: linkType === 'dropdown' ? `Dropdown (${children?.length || 0} items)` : linkType,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'ctaButton',
      title: 'CTA Button',
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
          initialValue: 'Get in touch',
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
    prepare() {
      return {
        title: 'Header Settings',
      }
    },
  },
})

