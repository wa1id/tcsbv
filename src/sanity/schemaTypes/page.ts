import { defineType, defineField } from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Pages',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      description: 'Use "home" for the home page',
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          validation: (Rule) => Rule.max(60),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.max(160),
        }),
      ],
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page Sections',
      type: 'array',
      description: 'Add and arrange sections for this page',
      of: [
        { type: 'heroBlock' },
        { type: 'homeCTABlock' },
        { type: 'servicesBlock' },
        { type: 'textBlock' },
        { type: 'contactBlock' },
        { type: 'testimonialsBlock' },
        { type: 'faqBlock' },
        { type: 'featuresBlock' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare({ title, slug }) {
      const isHome = slug === 'home'
      return {
        title: `${title}${isHome ? ' (Home)' : ''}`,
        subtitle: `/${slug || ''}`,
      }
    },
  },
})
